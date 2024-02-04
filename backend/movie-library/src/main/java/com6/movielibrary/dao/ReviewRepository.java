package com6.movielibrary.dao;

import com6.movielibrary.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByMovieId(@RequestParam("movie_id") Long movieId, Pageable pageable);

    Review findByUserEmailAndMovieId(String userEmail, Long movieId);

    @Modifying
    @Query("delete from Review where movie_id in :movie_id")
    void deleteAllByMovieId(@Param("movie_id") Long movieId);
}
