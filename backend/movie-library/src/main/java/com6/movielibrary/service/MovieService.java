package com6.movielibrary.service;

import com6.movielibrary.dao.CheckoutRepository;
import com6.movielibrary.dao.MovieRepository;
import com6.movielibrary.entity.Checkout;
import com6.movielibrary.entity.Movie;
import com6.movielibrary.responsemodels.ShelfCurrentLoansResponse;
import org.hibernate.annotations.Check;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class MovieService {

    private MovieRepository movieRepository;
    private CheckoutRepository checkoutRepository;


    public MovieService(MovieRepository movieRepository, CheckoutRepository checkoutRepository){

        this.movieRepository = movieRepository;
        this.checkoutRepository = checkoutRepository;

    }

    public Movie checkoutMovie(String userEmail, Long movieId) throws Exception {

        Optional<Movie> movie = movieRepository.findById(movieId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndMovieId(userEmail, movieId);

        if(!movie.isPresent() || validateCheckout != null || movie.get().getCopiesAvailable() <= 0){
            throw new Exception("Movie does not exist or is checked out by user");
        }

        movie.get().setCopiesAvailable(movie.get().getCopiesAvailable() - 1);

        movieRepository.save(movie.get());

        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                movie.get().getId()
        );

        checkoutRepository.save(checkout);

        return movie.get();

    }


    public Boolean checkoutMovieByUser(String userEmail, Long movieId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndMovieId(userEmail, movieId);

        if(validateCheckout != null){
            return true;
        }else{
            return false;
        }
    }

    public int currentLoansCount(String userEmail){
        return checkoutRepository.findMoviesByUserEmail(userEmail).size();
    }

    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception {
        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<>();

        List<Checkout> checkoutList = checkoutRepository.findMoviesByUserEmail(userEmail);
        List<Long> movieIdList = new ArrayList<>();

        for(Checkout i: checkoutList){
            movieIdList.add(i.getMovieId());
        }

        List<Movie> movies = movieRepository.findMoviesByMovieIds(movieIdList);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        for (Movie movie : movies) {
            Optional<Checkout> checkout = checkoutList.stream()
                    .filter(x -> x.getMovieId() == movie.getId()).findFirst();

            if(checkout.isPresent()){
                Date d1 = sdf.parse(checkout.get().getReturnDate());
                Date d2 = sdf.parse(LocalDate.now().toString());

                TimeUnit time = TimeUnit.DAYS;

                long differenceInTime = time.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);

                shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(movie, (int) differenceInTime));
            }
        }

        return shelfCurrentLoansResponses;
    }


}
