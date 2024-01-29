import { useState, useEffect } from "react";
import MovieModel from "../../models/MovieModel";
import { LoadingSpinner } from "../Utils/LoadingSpinner";
import { SearchMovie } from "./components/SearchMovie";

export const SearchMoviesPage = () => {
    const [movies, setMovies] = useState<MovieModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            const baseUrl: string = "http://localhost:8080/api/movies";
            const url = `${baseUrl}?page=0&size=5`;

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
        <>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="search" aria-label="search" />
                                <button className="btn btn-outline-success">
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </button>
                                <ul className="dropdown-menu" aria-label="dropdownMenuButton1">
                                    <li>
                                        <a className="dropdown-item" href="#">All</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Comedy</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Action</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Horror</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Romance</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h5>Number of results: (number)</h5>
                    </div>
                    <p>
                        1 to 5 of number items:
                    </p>
                    {movies.map(movie => (
                        <SearchMovie movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        </>
    );
}