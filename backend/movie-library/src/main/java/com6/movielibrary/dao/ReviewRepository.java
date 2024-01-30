package com6.movielibrary.dao;

import com6.movielibrary.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByMovieId(@RequestParam("movie_id") Long movieId, Pageable pageable);
}
