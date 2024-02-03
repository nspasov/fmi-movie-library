package com6.movielibrary.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="history")
@Data
public class History {
    public History(){}

    public History(String userEmail, String checkoutDate, String returnedDate, String title, String director, String description, String img){
        this.userEmail = userEmail;
        this.checkOutDate = checkoutDate;
        this.returnedDate = returnedDate;
        this.title = title;
        this.director = director;
        this.description = description;
        this.img = img;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="checkout_date")
    private String checkOutDate;

    @Column(name="returned_date")
    private String returnedDate;

    @Column(name="title")
    private String title;

    @Column(name="director")
    private String director;

    @Column(name="description")
    private String description;

    @Column(name="img")
    private String img;


}
