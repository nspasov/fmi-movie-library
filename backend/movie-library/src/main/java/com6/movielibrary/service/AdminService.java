package com6.movielibrary.service;

import com6.movielibrary.dao.CheckoutRepository;
import com6.movielibrary.dao.MovieRepository;
import com6.movielibrary.dao.ReviewRepository;
import com6.movielibrary.entity.Movie;
import com6.movielibrary.requestModels.AddMovieRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminService {

    private MovieRepository movieRepository;
    private ReviewRepository reviewRepository;
    private CheckoutRepository checkoutRepository;

    public AdminService(MovieRepository movieRepository, ReviewRepository reviewRepository, CheckoutRepository checkoutRepository){
        this.movieRepository = movieRepository;
        this.reviewRepository = reviewRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public void increaseMovieQuantity(Long movieId) throws Exception {
        Optional<Movie> movie = movieRepository.findById(movieId);

        if(!movie.isPresent()){
            throw new Exception("Movie not found!");
        }

        movie.get().setCopiesAvailable(movie.get().getCopiesAvailable()+1);
        movie.get().setCopies(movie.get().getCopies()+1);

        movieRepository.save(movie.get());
    }

    public void decreaseMovieQuantity(Long movieId) throws Exception {
        Optional<Movie> movie = movieRepository.findById(movieId);

        if(!movie.isPresent()){
            throw new Exception("Movie not found!");
        }

        if(movie.get().getCopiesAvailable() <= 0 || movie.get().getCopies() <= 0){
            throw new Exception("Can not decrease further");
        }

        movie.get().setCopiesAvailable(movie.get().getCopiesAvailable()-1);
        movie.get().setCopies(movie.get().getCopies()-1);

        movieRepository.save(movie.get());
    }

    public void postMovie(AddMovieRequest addMovieRequest){
        Movie movie = new Movie();

        movie.setTitle(addMovieRequest.getTitle());
        movie.setDirector(addMovieRequest.getDirector());
        movie.setDescription(addMovieRequest.getDescription());
        movie.setCopies(addMovieRequest.getCopies());
        movie.setCopiesAvailable(addMovieRequest.getCopies());
        movie.setCategory(addMovieRequest.getCategory());
        movie.setImg(addMovieRequest.getImg());

        movieRepository.save(movie);
    }

    public void deleteMovie(Long movieId) throws Exception {

        Optional<Movie> movie = movieRepository.findById(movieId);

        if(!movie.isPresent()){
            throw new Exception("Movie not found!");
        }

        reviewRepository.deleteAllByMovieId(movieId);
        checkoutRepository.deleteAllByMovieId(movieId);
        movieRepository.delete(movie.get());
    }

}
