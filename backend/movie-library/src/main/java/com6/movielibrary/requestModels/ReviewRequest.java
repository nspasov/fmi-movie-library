package com6.movielibrary.requestModels;

import lombok.Data;

import java.util.Optional;

@Data
public class ReviewRequest {
    private double rating;
    private Long movieId;
    private Optional<String> reviewDescription;

    public Long getMovieId(){
        return movieId;
    }

    public double getRating(){
        return rating;
    }

    public Optional<String> getReviewDescription(){
        return reviewDescription;
    }
}
