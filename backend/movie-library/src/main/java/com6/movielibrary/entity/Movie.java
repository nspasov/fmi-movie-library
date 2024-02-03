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

    public String getTitle() { return this.title; }

    public String getDescription() { return this.description; }

    public String getDirector() { return this.director; }

    public String getImg() { return this.img; }

    public int setCopiesAvailable(int copiesAvailable){
        return this.copiesAvailable = copiesAvailable;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCopies() {
        return copies;
    }

    public void setCopies(int copies) {
        this.copies = copies;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
