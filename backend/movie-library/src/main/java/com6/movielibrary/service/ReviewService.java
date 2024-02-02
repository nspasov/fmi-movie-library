package com6.movielibrary.service;

import com6.movielibrary.dao.MovieRepository;
import com6.movielibrary.dao.ReviewRepository;
import com6.movielibrary.requestModels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com6.movielibrary.entity.Review;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {


    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndMovieId(userEmail, reviewRequest.getMovieId());

        if(validateReview != null){
            throw new Exception("Review already exists");
        }

        Review review = new Review();
        review.setMovieId(reviewRequest.getMovieId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);

        if(reviewRequest.getReviewDescription().isPresent()){
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }

        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);

    }

    public Boolean userReviewListed(String userEmail, long movieId) {
        Review validateReview = reviewRepository.findByUserEmailAndMovieId(userEmail,movieId);

        if(validateReview != null){
            return true;
        }else{
            return false;
        }
    }

}
