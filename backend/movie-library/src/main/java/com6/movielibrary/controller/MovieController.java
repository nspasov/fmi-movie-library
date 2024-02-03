package com6.movielibrary.controller;

import com6.movielibrary.entity.Movie;
import com6.movielibrary.responsemodels.ShelfCurrentLoansResponse;
import com6.movielibrary.service.MovieService;
import com6.movielibrary.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private MovieService movieService;

    public MovieController(MovieService movieService){
        this.movieService = movieService;
    }

    @GetMapping("/secure/currentLoans")
    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value = "Authorization") String token) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        List<ShelfCurrentLoansResponse> test = movieService.currentLoans(userEmail);
        return movieService.currentLoans(userEmail);
    }

    @GetMapping("/secure/currentLoans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token){
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

    @PutMapping("/secure/return")
    public void returnMovie(@RequestHeader(value = "Authorization") String token,
                            @RequestParam Long movieId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        movieService.returnMovie(userEmail, movieId);
    }

    @PutMapping("secure/renew/loan")
    public void renewLoan(@RequestHeader(value = "Authorization") String token,
                          @RequestParam Long movieId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        movieService.renewLoan(userEmail, movieId);
    }
}
