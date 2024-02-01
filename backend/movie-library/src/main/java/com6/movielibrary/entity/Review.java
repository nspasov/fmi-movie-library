package com6.movielibrary.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="review")
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "date")
    @CreationTimestamp
    private Date date;

    @Column(name = "rating")
    private double rating;

    @Column(name = "movie_id")
    private Long movieId;

    @Column(name = "review_description")
    private String reviewDescription;

    public void setMovieId(Long movieId){
        this.movieId = movieId;
    }

    public void setRating(double rating){
        this.rating = rating;
    }

    public void setUserEmail(String userEmail){
        this.userEmail = userEmail;
    }

    public void setReviewDescription(String reviewDescription){
        this.reviewDescription = reviewDescription;
    }

    public void setDate(Date date){
        this.date = date;
    }


}
