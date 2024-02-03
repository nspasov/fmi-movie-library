package com6.movielibrary.controller;

import com6.movielibrary.entity.Message;
import com6.movielibrary.requestModels.AdminQuestionRequest;
import com6.movielibrary.service.MessagesService;
import com6.movielibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessagesController {

    private MessagesService messagesService;

    @Autowired
    public MessagesController(MessagesService messagesService){
        this. messagesService = messagesService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Message messageRequest){
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        messagesService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value = "Authorization") String token,
                           @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {

        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if(admin == null || !admin.equals("admin")){
            throw new Exception("Page only for administrators");
        }

        messagesService.putMessage(adminQuestionRequest, userEmail);

    }

}
