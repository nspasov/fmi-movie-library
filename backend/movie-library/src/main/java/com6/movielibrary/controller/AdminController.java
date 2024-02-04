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

    @PostMapping("/secure/add/movie")
    public void postMovie(@RequestHeader(value="Authorization") String token,
                          @RequestBody AddMovieRequest addMovieRequest) throws Exception {

        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if(admin == null || !admin.equals("admin")){
            throw new Exception("Only admins allowed!");
        }

        adminService.postMovie(addMovieRequest);

    }

}