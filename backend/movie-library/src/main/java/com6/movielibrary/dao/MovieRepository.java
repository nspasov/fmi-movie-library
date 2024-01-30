package com6.movielibrary.dao;

import com6.movielibrary.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


// creates REST routes
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Page<Movie> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);
    Page<Movie> findByCategory(@RequestParam("category") String category, Pageable pageable);
}
