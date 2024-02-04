package com6.movielibrary.dao;

import com6.movielibrary.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndMovieId(String userEmail, Long movieId);
    List<Checkout> findMoviesByUserEmail(String userEmail);

    @Modifying
    @Query("delete from Checkout where movie_id in :movie_id")
    void deleteAllByMovieId(@Param("movie_id") Long movie_id);

}
