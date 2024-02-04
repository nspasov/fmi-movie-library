import { useEffect, useState } from "react";
import MovieModel from "../../../models/MovieModel"
import { useOktaAuth } from "@okta/okta-react";

export const ChangeMovieQuantity: React.FC<{movie: MovieModel, deleteMovie: any}> = (props, key) => {

    const {authState} = useOktaAuth();

    const [quantity, setQuantity] = useState(0);
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        const fetchMovieInState = () => {
            props.movie.copies ? setQuantity(props.movie.copies) : setQuantity(0);
            props.movie.copiesAvailable ? setRemaining(props.movie.copiesAvailable) : setRemaining(0);
        };

        fetchMovieInState();
    }, []);

    const deleteMovie = async () => {
        const url = `http://localhost:8080/api/admin/secure/delete/movie/?movieId=${props.movie?.id}`;

        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const deleteResponse = await fetch(url, requestOptions);

        if(!deleteResponse.ok){
            throw new Error('Something went wrong!');
        }

        props.deleteMovie();
    }

    const adjustQuantity = async (action: string) => {

        const url = `http://localhost:8080/api/admin/secure/${action}/movie/quantity/?movieId=${props.movie?.id}`;

        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);

        if(!quantityUpdateResponse.ok){
            throw new Error('Something went wrong!');
        }

        setQuantity(action === 'increase' ? quantity + 1 : quantity - 1);
        setRemaining(action === 'increase' ? remaining + 1 : quantity - 1);

    }

    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        <img src={props.movie.img} width='123' height='196' alt='movie' />
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        <img src={props.movie.img} width='123' height='196' alt='movie' />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{props.movie.director}</h5>
                        <h4>{props.movie.title}</h4>
                        <p className="card-text">{props.movie.description}</p>
                    </div>
                </div>
                <div className="mt-3 col-md-4">
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Total quantity: <b>{quantity}</b></p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Movies remaining: <b>{remaining}</b></p>
                    </div>
                </div>
                <div className="mt-3 col-md-1">
                    <div className="d-flex justify-content-start">
                        <button className="m-1 btn btn-md btn-danger" onClick={deleteMovie}>Delete</button>
                    </div>
                </div>
                <button onClick={() => adjustQuantity('increase')} className="m1 btn btn-md main-color text-white">
                    Increase Quantity
                </button>
                <button onClick={() => adjustQuantity('decrease')} className="m1 btn btn-md btn-warning">
                    Decrease Quantity
                </button>
            </div>
        </div>
    );

}