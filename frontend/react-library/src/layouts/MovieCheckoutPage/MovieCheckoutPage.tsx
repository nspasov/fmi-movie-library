import { useState, useEffect } from "react";
import MovieModel from "../../models/MovieModel";
import { LoadingSpinner } from "../Utils/LoadingSpinner";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import { findAllByText } from "@testing-library/react";

export const MovieCheckoutPage = () => {

    const {authState} = useOktaAuth();

    const [movie, setMovie] = useState<MovieModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);

    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoadingMovieCheckedOut, setIsLoadingMovieCheckedOut] = useState(true);

    const movieId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchMovie = async () => {
            const baseUrl: string = `http://localhost:8080/api/movies/${movieId}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadedMovie: MovieModel = { ...responseJson };

            // for (const movie of responseData) {
            //     loadedMovies.push({
            //         id: movie.id,
            //         title: movie.title,
            //         director: movie.director,
            //         description: movie.description,
            //         copies: movie.copies,
            //         copiesAvailable: movie.copiesAvailable,
            //         category: movie.category,
            //         img: movie.img
            //     });
            // }

            setMovie(loadedMovie);
            setIsLoading(false);

        };

        fetchMovie().catch((err: any) => {
            setIsLoading(false);
            setHttpError(err.message);
        });
    }, [isCheckedOut]);

    useEffect(() => {
        const fetchMovieReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByMovieId?movieId=${movieId}`;

            const responseReviews = await fetch(reviewUrl);

            if(!responseReviews.ok){
                throw new Error('Something went wrong');
            }

            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0;

            for(const review of responseData){
                loadedReviews.push(review);
                weightedStarReviews = weightedStarReviews + review.rating;
            }

            // not sure
            if(loadedReviews){
                const round = (Math.round(weightedStarReviews / loadedReviews.length * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }
            console.log('***** LOADED REVIEWS *****', loadedReviews);
            setReviews(loadedReviews);
            setIsLoadingReviews(false);
        };

        fetchMovieReviews().catch((error: any) => {
            setIsLoadingReviews(false);
            setHttpError(error.message);
        });
    }, []);

    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if(authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/movies/secure/currentLoans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }

                const currentLoansCountResponse = await fetch(url, requestOptions);

                if(!currentLoansCountResponse.ok) {
                    throw new Error('Something went wrong!');
                }

                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson);
            }

            setIsLoadingCurrentLoansCount(false);
        }

        fetchUserCurrentLoansCount().catch((err: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(err.message);
        });

    }, [authState]);

    useEffect(() =>{
        const fetchUserCheckedOutMovie = async () => {
            if(authState && authState.isAuthenticated){
                const url = `http://localhost:8080/api/movies/secure/ischeckedout/byuser/?movieId=${movieId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };

                const movieCheckedOut = await fetch(url, requestOptions);

                if(!movieCheckedOut.ok){
                    throw new Error('Something went wrong');
                }

                const movieCheckedOutResponseJson = await movieCheckedOut.json();
                setIsCheckedOut(movieCheckedOutResponseJson);
            }
            setIsLoadingMovieCheckedOut(false);
        }

        fetchUserCheckedOutMovie().catch((err: any) => {
            setIsLoadingMovieCheckedOut(false);
            setHttpError(err.message);
        });
    }, [authState, isCheckedOut]);

    if (isLoading || isLoadingReviews || isLoadingCurrentLoansCount || isLoadingMovieCheckedOut) {
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

    async function checkoutMovie() {
        const url = `http://localhost:8080/api/movies/secure/checkout/?movieId=${movie?.id}`;
        
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const checkoutResponse = await fetch(url, requestOptions);

        if(!checkoutResponse.ok){
            throw new Error('Something went wrong!');
        }

        setIsCheckedOut(true);
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {movie?.img ?
                            <img src={movie?.img} width='226' height='349' alt='Movie' />
                            :
                            <img src={require('./../../Images/MoviesImages/book-luv2code-1000.png')} width='226' height='349' alt='Movie' />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{movie?.title}</h2>
                            <h5 className="text-primary">{movie?.director}</h5>
                            <p className="lead">{movie?.description}</p>
                            <StarsReview rating={totalStars} size={32}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox movie={movie} mobile={false} currentLoansCount={currentLoansCount} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} checkoutMovie={checkoutMovie}/>
                </div>
                <hr></hr>
                <LatestReviews reviews={reviews} movieId={movie?.id} mobile={false} />
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {movie?.img ?
                        <img src={movie?.img} width='226' height='349' alt='Movie' />
                        :
                        <img src={require('./../../Images/MoviesImages/book-luv2code-1000.png')} width='226' height='349' alt='Movie' />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{movie?.title}</h2>
                        <h5 className="text-primary">{movie?.director}</h5>
                        <p className="lead">{movie?.description}</p>
                        <StarsReview rating={totalStars} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox movie={movie} mobile={true} currentLoansCount={currentLoansCount} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut} checkoutMovie={checkoutMovie}/>
                <hr></hr>
                <LatestReviews reviews={reviews} movieId={movie?.id} mobile={true} />
            </div>
        </div>
    );
}