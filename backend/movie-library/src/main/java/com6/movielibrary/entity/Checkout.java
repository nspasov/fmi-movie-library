package com6.movielibrary.entity;

import lombok.Data;

import javax.persistence.*;
import javax.persistence.Table;

@Entity
@Table(name = "checkout")
@Data
public class Checkout {
    public Checkout(){}

    public Checkout(String userEmail, String checkoutDate, String returnDate, Long movieId) {
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.movieId = movieId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "checkout_date")
    private String checkoutDate;

    @Column(name = "return_date")
    private String returnDate;

    @Column(name = "movie_id")
    private Long movieId;

    public Long getMovieId (){
        return this.movieId;
    }

    public String getReturnDate(){
        return this.returnDate;
    }

    public void setReturnDate(String returnDate){
        this.returnDate = returnDate;
    }

    public String getCheckoutDate() {return this.checkoutDate;}

    public Long getId(){
        return this.id;
    }
}
