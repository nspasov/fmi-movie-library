import { useState, useEffect } from "react";
import MovieModel from "../../models/MovieModel";
import { LoadingSpinner } from "../Utils/LoadingSpinner";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReview";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";

export const MovieCheckoutPage = () => {

    const [movie, setMovie] = useState<MovieModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);

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
    }, []);

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

    if (isLoading || isLoadingReviews) {
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
                    <CheckoutAndReviewBox movie={movie} mobile={false} />
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
                <CheckoutAndReviewBox movie={movie} mobile={true} />
                <hr></hr>
                <LatestReviews reviews={reviews} movieId={movie?.id} mobile={true} />
            </div>
        </div>
    );
}