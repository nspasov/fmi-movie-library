class ReviewModel {
    id: number;
    userEmail: string;
    date: string;
    rating: number;
    movieId: number;
    reviewDescription: string;

    constructor(id: number, userEmail: string, date: string, movieId: number, rating: number, reviewDescription: string){
        this.id = id;
        this.userEmail = userEmail;
        this.date = date;
        this.movieId = movieId;
        this.rating = rating;
        this.reviewDescription = reviewDescription;
    }
}
export default ReviewModel;