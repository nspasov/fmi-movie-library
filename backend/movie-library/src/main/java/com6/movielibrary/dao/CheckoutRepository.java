package com6.movielibrary.dao;

import com6.movielibrary.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndMovieId(String userEmail, Long movieId);
    List<Checkout> findMoviesByUserEmail(String userEmail);

}
