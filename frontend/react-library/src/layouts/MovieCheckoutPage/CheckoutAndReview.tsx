import { Link } from "react-router-dom";
import MovieModel from "../../models/MovieModel";

export const CheckoutAndReviewBox: React.FC<{ movie: MovieModel | undefined, mobile: boolean }> = (props) => {
    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>0/5 </b>
                        movies checked out
                    </p>
                    <hr></hr>
                    {props.movie && props.movie.copiesAvailable && props.movie.copiesAvailable > 0 ?
                        <h4 className="text-success">Available</h4>
                        :
                        <h4 className="text-danger">Wait List</h4>
                    }
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{props.movie?.copies}</b>
                            copies
                        </p>
                        <p className="col-6 lead">
                            <b>{props.movie?.copiesAvailable}</b>
                            available
                        </p>
                    </div>
                </div>
                <Link to='/#' className="btn btn-success btn-lg">Sign In</Link>
                <hr></hr>
                <p className="mt-3">
                    Number might change before placing order
                </p>
                <p>
                    Sign in to leave a review
                </p>
            </div>
        </div>
    );
}