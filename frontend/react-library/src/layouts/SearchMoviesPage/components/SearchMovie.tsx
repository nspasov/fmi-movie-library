import MovieModel from "../../../models/MovieModel";

export const SearchMovie: React.FC<{ movie: MovieModel }> = (props) => {
    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        {props.movie.img ?
                            <img src={props.movie.img} width="123" height="196" alt="movie"></img>
                            :
                            <img src={require('../../../Images/MoviesImages/book-luv2code-1000.png')} width="123" height="196" alt="movie"></img>
                        }
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        {props.movie.img ?
                            <img src={props.movie.img} width="123" height="196" alt="movie"></img>
                            :
                            <img src={require('../../../Images/MoviesImages/book-luv2code-1000.png')} width="123" height="196" alt="movie"></img>
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">
                            {props.movie.director}
                        </h5>
                        <h4>
                            {props.movie.title}
                        </h4>
                        <p className="card-text">
                            {props.movie.description}
                        </p>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <a className="btn btn-md main-color text-white" href="#">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    );
};