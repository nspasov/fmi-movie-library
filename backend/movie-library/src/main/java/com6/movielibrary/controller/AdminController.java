package com6.movielibrary.controller;

import com6.movielibrary.requestModels.AddMovieRequest;
import com6.movielibrary.service.AdminService;
import com6.movielibrary.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController()
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    @PutMapping("/secure/increase/movie/quantity")
    public void increaseMovieQuantity(@RequestHeader(value="Authorization") String token,
                                      @RequestParam Long movieId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if(admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }

        adminService.increaseMovieQuantity(movieId);
    }

    @PutMapping("/secure/decrease/movie/quantity")
    public void decreaseMovieQuantity(@RequestHeader(value="Authorization") String token,
                                      @RequestParam Long movieId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if(admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }

        adminService.decreaseMovieQuantity(movieId);
    }

    @PostMapping("/secure/add/movie")
    public void postMovie(@RequestHeader(value="Authorization") String token,
                          @RequestBody AddMovieRequest addMovieRequest) throws Exception {

        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if(admin == null || !admin.equals("admin")){
            throw new Exception("Only admins allowed!");
        }

        adminService.postMovie(addMovieRequest);

    }

    @DeleteMapping("/secure/delete/movie")
    public void deleteMovie(@RequestHeader(value="Authorization") String token,
                            @RequestParam Long movieId) throws Exception {

        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if(admin == null || !admin.equals("admin")){
            throw new Exception("Only admins allowed!");
        }

        adminService.deleteMovie(movieId);

    }

}
