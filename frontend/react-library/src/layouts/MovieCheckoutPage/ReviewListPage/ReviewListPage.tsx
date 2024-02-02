import { useState, useEffect } from "react";
import ReviewModel from "../../../models/ReviewModel";
import { LoadingSpinner } from "../../Utils/LoadingSpinner";
import { Review } from "../../Utils/Review";
import { Pagination } from "../../Utils/Pagination";

export const ReviewListPage = () => {

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5);
    const [totalReviews, setTotalReviews] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const movieId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchMovieReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByMovieId?movieId=${movieId}&page=${currentPage - 1}&size=${reviewsPerPage}`;

            const responseReviews = await fetch(reviewUrl);

            if(!responseReviews.ok){
                throw new Error('Something went wrong');
            }

            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;

            setTotalReviews(responseJsonReviews.page.totalElements);
            setTotalPages(responseJsonReviews.page.totalPages);

            const loadedReviews: ReviewModel[] = [];

            for(const review of responseData){
                loadedReviews.push(review);
            }

            setReviews(loadedReviews);
            setIsLoading(false);
        };

        fetchMovieReviews().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, [currentPage]);

    if(isLoading){
        return <LoadingSpinner />
    }

    if(httpError){
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    const indexLastReview: number = currentPage * reviewsPerPage;
    const indexFirstReview: number = indexLastReview - reviewsPerPage;

    let lastItem = reviewsPerPage * currentPage <= totalReviews ? reviewsPerPage * currentPage : totalReviews;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container m-5">
            <div>
                <h3>Reviews: ({reviews.length})</h3>
            </div>
            <p>
                {indexFirstReview+1} to {lastItem} of {totalReviews} reviews
            </p>
            <div className="row">
                {reviews.map(review => (
                    <Review review={review} key={review.id}/>
                ))}
            </div>

            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}