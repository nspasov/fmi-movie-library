import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import { LoadingSpinner } from "../../Utils/LoadingSpinner";
import { Link } from "react-router-dom";

export const Loans = () => {

    const { authState } = useOktaAuth();

    const [httpError, setHttpError] = useState(null);

    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);

    useEffect(() => {

        const fetchUserCurrentLoans = async () => {
            if (authState && authState.isAuthenticated) {
                console.log('***ACCESS TOKEN****', authState.accessToken?.accessToken);
                const url = `http://localhost:8080/api/movies/secure/currentLoans`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };

                const shelfCurrentLoansResponse = await fetch(url, requestOptions);

                if (!shelfCurrentLoansResponse.ok) {
                    throw new Error('Something went wrong!');
                }

                const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
                setShelfCurrentLoans(shelfCurrentLoansResponseJson);
                setIsLoadingUserLoans(false);
            }
        };

        fetchUserCurrentLoans().catch((error: any) => {
            setIsLoadingUserLoans(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);

    }, [authState]);

    if (isLoadingUserLoans) {
        return <LoadingSpinner />;
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>
                    {httpError}
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Desktop */}
            <div className="d-none d-lg-block mt-2">
                {shelfCurrentLoans.length > 0 ?
                    <>
                        <h5>Current Loans: {shelfCurrentLoans.map(loan => (
                            <div key={loan.movie.id}>
                                <div className="row mt-3 mb-3">
                                    <div className="col-4 col-md-4 container">
                                        {
                                            loan.movie?.img ?
                                                <img src={loan.movie?.img} width='226' height='349' alt={loan.movie?.title}></img>
                                                :
                                                <img src={require('./../../../Images/MoviesImages/book-luv2code-1000.png')} width='226' height='349' alt={loan.movie?.title} />
                                        }
                                    </div>
                                    <div className="card col-3 col-md-3 container d-flex">
                                        <div className="card-body">
                                            <div className="mt-3">
                                                <h4>Loan options</h4>
                                                {loan.daysLeft > 0 && <p className="text-secondary"> Due in {loan.daysLeft} days.</p>}
                                                {loan.daysLeft === 0 && <p className="text-success">Due today</p>}
                                                {loan.daysLeft < 0 && <p className="text-danger">Due {loan.daysLeft} days ago</p>}
                                                <div className="list-group mt-3">
                                                    <button className="list-group-item list-group-item-action" aria-current='true' data-bs-toggle="modal" data-bs-target={`#modal${loan.movie.id}`}>
                                                        Manage Loan
                                                    </button>
                                                    <Link to={'search'} className="list-group-item list-group-item-action">Search more movies</Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <p className="mt-3">
                                                Help others by leaving a review
                                            </p>
                                            <Link className="btn btn-primary" to={`/checkout/${loan.movie.id}`}>
                                                Leave a review
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>

                            </div>
                        ))}</h5>
                    </>
                    :
                    <>
                        <h3 className="mt-3">
                            No current loans
                        </h3>
                        <Link className="btn btn-primary" to={'search'}>
                            Search for a new movie
                        </Link>
                    </>

                }
            </div>

            {/* MOBILE */}
            <div className="container d-lg-none mt-2">
                {shelfCurrentLoans.length > 0 ?
                    <>
                        <h5 className="mb-3">Current Loans: {shelfCurrentLoans.map(loan => (
                            <div key={loan.movie.id}>
                                <div className="d-flex justify-content-center align-items-center">
                                    {
                                        loan.movie?.img ?
                                            <img src={loan.movie?.img} width='226' height='349' alt={loan.movie?.title}></img>
                                            :
                                            <img src={require('./../../../Images/MoviesImages/book-luv2code-1000.png')} width='226' height='349' alt={loan.movie?.title} />
                                    }
                                </div>
                                <div className="card d-flex mt-5 mb-3">
                                    <div className="card-body container">
                                        <div className="mt-3">
                                            <h4>Loan options</h4>
                                            {loan.daysLeft > 0 && <p className="text-secondary"> Due in {loan.daysLeft} days.</p>}
                                            {loan.daysLeft === 0 && <p className="text-success">Due today</p>}
                                            {loan.daysLeft < 0 && <p className="text-danger">Due {loan.daysLeft} days ago</p>}
                                            <div className="list-group mt-3">
                                                <button className="list-group-item list-group-item-action" aria-current='true' data-bs-toggle="modal" data-bs-target={`#mobilemodal${loan.movie.id}`}>
                                                    Manage Loan
                                                </button>
                                                <Link to={'search'} className="list-group-item list-group-item-action">Search more movies</Link>
                                            </div>
                                        </div>
                                        <hr />
                                        <p className="mt-3">
                                            Help others by leaving a review
                                        </p>
                                        <Link className="btn btn-primary" to={`/checkout/${loan.movie.id}`}>
                                            Leave a review
                                        </Link>
                                    </div>
                                </div>

                                <hr></hr>
                            </div>
                        ))}</h5>
                    </>
                    :
                    <>
                        <h3 className="mt-3">
                            No current loans
                        </h3>
                        <Link className="btn btn-primary" to={'search'}>
                            Search for a new movie
                        </Link>
                    </>

                }
            </div>

        </div>
    );

}