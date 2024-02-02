class ReviewRequestModel {
    rating: number;
    movieId: number;
    reviewDescription?: string;

    constructor(rating: number, movieId:number, reviewDescription: string){
        this.rating = rating;
        this.movieId = movieId;
        this.reviewDescription = reviewDescription;
    }
}

export default ReviewRequestModel;