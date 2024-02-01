package com6.movielibrary.controller;

import com6.movielibrary.entity.Movie;
import com6.movielibrary.service.MovieService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private MovieService movieService;

    public MovieController(MovieService movieService){
        this.movieService = movieService;
    }

    @GetMapping("/secure/currentLoans/count")
    public int currentLoans(){
        String userEmail = "testuser@email.com";
        return movieService.currentLoansCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutMovieByUser(@RequestParam Long movieId){
        String userEmail = "testuser@email.com";
        return movieService.checkoutMovieByUser(userEmail, movieId);
    }

    @PutMapping("/secure/checkout")
    public Movie checkoutMovie (@RequestParam Long movieId) throws Exception {
        String userEmail = "testuser@email.com";
        return movieService.checkoutMovie(userEmail, movieId);
    }
}
