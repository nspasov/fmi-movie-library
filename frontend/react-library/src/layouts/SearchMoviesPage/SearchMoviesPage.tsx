import { useState, useEffect } from "react";
import MovieModel from "../../models/MovieModel";
import { LoadingSpinner } from "../Utils/LoadingSpinner";
import { SearchMovie } from "./components/SearchMovie";
import { Pagination } from "../Utils/Pagination";

export const SearchMoviesPage = () => {
    const [movies, setMovies] = useState<MovieModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            const baseUrl: string = "http://localhost:8080/api/movies";
            let url = '';

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${moviesPerPage}`;
            } else {
                url = baseUrl.concat(searchUrl);
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.movies;
            console.log('***RESPONSE DATA****', responseJson);
            setTotalAmount(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

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
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

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

    const searchHandleChange = () => {
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size=${moviesPerPage}`);
        }
    };

    const lastMovieIndex: number = currentPage * moviesPerPage;
    const firstMovieIndex: number = lastMovieIndex - moviesPerPage;
    let lastItem = moviesPerPage * currentPage <= totalAmount ? moviesPerPage * currentPage : totalAmount;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="search" aria-label="search"
                                    onChange={e => setSearch(e.target.value)} />
                                <button className="btn btn-outline-success" onClick={searchHandleChange}>
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
                    {totalAmount > 0 ? <>
                        <div className="mt-3">
                            <h5>Number of results: {totalAmount}</h5>
                        </div>
                        <p>
                            {firstMovieIndex + 1} to {lastItem} of {totalAmount} items:
                        </p>
                        {movies.map(movie => (
                            <SearchMovie movie={movie} key={movie.id} />
                        ))}
                    </>
                        :
                        <div className="m-5">
                            <h3>Can't find what you are looking for?</h3>
                            <a type="button" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white" href="#">
                                Services
                            </a>
                        </div>
                    }

                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </>
    );
}