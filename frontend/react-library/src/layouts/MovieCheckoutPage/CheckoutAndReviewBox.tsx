import { Link } from "react-router-dom";
import MovieModel from "../../models/MovieModel";

export const CheckoutAndReviewBox: React.FC<{ movie: MovieModel | undefined, mobile: boolean, currentLoansCount: number, isAuthenticated: any, isCheckedOut: boolean, checkoutMovie: any }> = (props) => {
    
    function buttonRender() {
        if(props.isAuthenticated) {
            if(!props.isCheckedOut && props.currentLoansCount < 5){
                return (<button onClick={() => props.checkoutMovie()} className="btn btn-success btn-lg">Checkout</button>);
            }else if(props.isCheckedOut) {
                return (<p><b>Movie checked out, enjoy!</b></p>);
            } else if(!props.isCheckedOut) {
                return (<p className="text-danger">Too many movies checked out!</p>)
            }
        }

        return (<Link to={'/login'} className="btn btn-success btn">Login</Link>);
    }



    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
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
                {buttonRender()}
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