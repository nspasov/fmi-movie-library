package com6.movielibrary.controller;

import com6.movielibrary.entity.Movie;
import com6.movielibrary.service.MovieService;
import com6.movielibrary.utils.ExtractJWT;
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
    public int currentLoans(@RequestHeader(value = "Authorization") String token){
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return movieService.currentLoansCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutMovieByUser(@RequestHeader(value = "Authorization") String token,
                                       @RequestParam Long movieId){
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return movieService.checkoutMovieByUser(userEmail, movieId);
    }

    @PutMapping("/secure/checkout")
    public Movie checkoutMovie (@RequestHeader(value = "Authorization") String token,
                                @RequestParam Long movieId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return movieService.checkoutMovie(userEmail, movieId);
    }
}
