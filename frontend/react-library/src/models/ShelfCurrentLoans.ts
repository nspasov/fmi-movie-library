import MovieModel from "./MovieModel";

class ShelfCurrentLoans {
    movie: MovieModel;
    daysLeft: number;

    constructor(movie: MovieModel, daysLeft: number){
        this.movie = movie;
        this.daysLeft = daysLeft;
    }
}

export default ShelfCurrentLoans;