package com6.movielibrary.dao;

import com6.movielibrary.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

// creates REST routes
public interface MovieRepository extends JpaRepository<Movie, Long> {

}
