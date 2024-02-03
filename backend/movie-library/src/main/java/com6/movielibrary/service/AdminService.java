package com6.movielibrary.service;

import com6.movielibrary.dao.MovieRepository;
import com6.movielibrary.entity.Movie;
import com6.movielibrary.requestModels.AddMovieRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminService {

    private MovieRepository movieRepository;

    public AdminService(MovieRepository movieRepository){
        this.movieRepository = movieRepository;
    }

    public void postMovie(AddMovieRequest addMovieRequest){
        Movie movie = new Movie();

        movie.setTitle(addMovieRequest.getTitle());
        movie.setDirector(addMovieRequest.getDirector());
        movie.setDescription(addMovieRequest.getDescription());
        movie.setCopies(addMovieRequest.getCopies());
        movie.setCopiesAvailable(addMovieRequest.getCopiesAvailable());
        movie.setCategory(addMovieRequest.getCategory());
        movie.setImg(addMovieRequest.getImg());

        movieRepository.save(movie);
    }

}
