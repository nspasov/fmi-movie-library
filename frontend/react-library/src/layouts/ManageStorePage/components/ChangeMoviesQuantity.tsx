import { useState, useEffect } from "react";
import MovieModel from "../../../models/MovieModel";
import { LoadingSpinner } from "../../Utils/LoadingSpinner";
import { Pagination } from "../../Utils/Pagination";
import { ChangeMovieQuantity } from "./ChangeMovieQuantity";

export const ChangeMoviesQuantity = () => {

    const [movies, setMovies] = useState<MovieModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(5);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            const url: string = `http://localhost:8080/api/movies?page=${currentPage - 1}&size=${moviesPerPage}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.movies;
            
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
    }, [currentPage]);

    const lastMovieIndex: number = currentPage * moviesPerPage;
    const firstMovieIndex: number = lastMovieIndex - moviesPerPage;
    let lastItem = moviesPerPage * currentPage <= totalAmount ? moviesPerPage * currentPage : totalAmount;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
        <div className="container mt-5">
            {
                totalAmount > 0 ?
                    <>
                        <div className="mt-3">
                            <h3>Results: ({totalAmount})</h3>
                        </div>
                        <p>
                            {firstMovieIndex + 1} to {lastItem} of {totalAmount} items:
                        </p>
                        {movies.map(movie => (
                            <ChangeMovieQuantity movie={movie} key={movie.id} />
                        ))}
                    </>
                    :
                    <h5>Add a movie maybe</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );

}