package com6.movielibrary.responsemodels;

import com6.movielibrary.entity.Movie;
import lombok.Data;

@Data
public class ShelfCurrentLoansResponse {

    public ShelfCurrentLoansResponse(Movie movie, int daysLeft) {
        this.movie = movie;
        this.daysLeft = daysLeft;
    }

    private Movie movie;
    private int daysLeft;
}
