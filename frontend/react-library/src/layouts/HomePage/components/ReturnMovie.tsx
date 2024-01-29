import MovieModel from "../../../models/MovieModel";

const ReturnMovie: React.FC<{ movie: MovieModel }> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                {props.movie.img ?
                    <img src={props.movie.img} width='151' height='233' alt="movie" />
                    :
                    <img src={require('./../../../Images/MoviesImages/book-luv2code-1000.png')} width='151' height='233' alt="movie" />
                }

                <h6 className="mt-2">{props.movie.title}</h6>
                <p>{props.movie.director}</p>
                <a className="btn main-color text-white" href="#">Reserve</a>
            </div>
        </div>
    );
}

export default ReturnMovie;