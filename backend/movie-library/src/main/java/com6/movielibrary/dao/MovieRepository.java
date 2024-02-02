package com6.movielibrary.dao;

import com6.movielibrary.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


// creates REST routes
public interface MovieRepository extends JpaRepository<Movie, Long> {
    Page<Movie> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);
    Page<Movie> findByCategory(@RequestParam("category") String category, Pageable pageable);

    @Query("select o from Movie o where id in :movie_ids")
    List<Movie> findMoviesByMovieIds (@Param("movie_ids") List<Long> movieId);
}
