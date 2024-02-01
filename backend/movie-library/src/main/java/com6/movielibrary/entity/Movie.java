package com6.movielibrary.entity;
import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "movie")
@Data
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "title")
    private String title;
    @Column(name = "director")
    private String director;
    @Column(name = "description")
    private String description;
    @Column(name = "copies")
    private int copies;
    @Column(name = "copies_available")
    private int copiesAvailable;
    @Column(name = "category")
    private String category;
    @Column(name = "img")
    private String img;

    public int getCopiesAvailable(){
        return this.copiesAvailable;
    }

    public long getId(){
        return this.id;
    }

    public int setCopiesAvailable(int copiesAvailable){
        return this.copiesAvailable = copiesAvailable;
    }

}
