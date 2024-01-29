import ReturnMovie from "./ReturnMovie";
import { useEffect, useState } from "react";
import MovieModel from "../../../models/MovieModel";
import { LoadingSpinner } from "../../Utils/LoadingSpinner";

export default function Carousel() {

    const [movies, setMovies] = useState<MovieModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            const baseUrl: string = "http://localhost:8080/api/movies";
            const url = `${baseUrl}?page=0&size=9`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.movies;

            const loadedMovies: MovieModel[] = [];

            for (const movie of responseData) {
                loadedMovies.push({
                    id: movie.id,
                    title: movie.title,
                    director: movie.director,
                    description: movie.description,
                    copies: movie.copies,
                    copiesAvailable: movie.copiesAvailable,
                    category: movie.category,
                    img: movie.img
                });
            }

            setMovies(loadedMovies);
            setIsLoading(false);

            console.log('***LOADED MOVIES****', loadedMovies);
        };

        fetchMovies().catch((err: any) => {
            setIsLoading(false);
            setHttpError(err.message);
        });
    }, []);

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="container mt-5" style={{ height: 550 }}>
            <div className="homepage-carousel-title">
                <h3>Find your next "I stayed up watiching" movie</h3>
            </div>
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5 d-none d-lg-block" data-bs-interval={false}>
                {/*DESKTOP*/}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-item-center">
                            {movies.slice(0, 3).map(movie => {
                                return <ReturnMovie movie={movie} key={movie.id} />
                            })}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-item-center">
                            {movies.slice(0, 3).map(movie => {
                                return <ReturnMovie movie={movie} key={movie.id} />
                            })}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-item-center">
                            {movies.slice(0, 3).map(movie => {
                                return <ReturnMovie movie={movie} />
                            })}
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className="carousel-control-prev-icon" aria-hidden='true'></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className="carousel-control-next-icon" aria-hidden='true'></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* MOBILE */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnMovie movie={movies[0]}/>
                </div>
            </div>
            <div className="homepage-carousel-title mt-3">
                <a className="btn btn-outline-secondary btn-lg" href="#">View more</a>
            </div>
        </div>
    );
}