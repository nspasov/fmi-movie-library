package com6.movielibrary.service;

import com6.movielibrary.dao.CheckoutRepository;
import com6.movielibrary.dao.MovieRepository;
import com6.movielibrary.entity.Checkout;
import com6.movielibrary.entity.Movie;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Optional;

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






}
