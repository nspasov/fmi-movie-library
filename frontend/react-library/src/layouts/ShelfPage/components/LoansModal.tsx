import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";

export const LoansModal: React.FC<{ shelfCurrentLoan: ShelfCurrentLoans, mobile: boolean }> = (props) => {

    return (
        <div className="modal fade" id={props.mobile ? `mobilemodal${props.shelfCurrentLoan.movie.id}`
            : `modal${props.shelfCurrentLoan.movie.id}`} data-bs-backdrop='static' data-bs-keyboard='false' aria-labelledby="staticBackdropLabel" aria-hidden='true' key={props.shelfCurrentLoan.movie.id}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            Loan Options
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-2">
                                        {props.shelfCurrentLoan.movie?.img ?
                                            <img src={props.shelfCurrentLoan.movie?.img} width="56" height="87" alt="movie" />
                                            :
                                            <img src={require('../../../Images/MoviesImages/book-luv2code-1000.png')} width="56" height="87" alt="movie" />
                                        }
                                    </div>
                                    <div className="col-10">
                                        <h6>{props.shelfCurrentLoan.movie.director}</h6>
                                        <h4>{props.shelfCurrentLoan.movie.title}</h4>
                                    </div>
                                </div>
                                <hr />
                                {props.shelfCurrentLoan.daysLeft > 0 && <p className="text-secondary"> Due in {props.shelfCurrentLoan.daysLeft} days.</p>}
                                {props.shelfCurrentLoan.daysLeft === 0 && <p className="text-success">Due today</p>}
                                {props.shelfCurrentLoan.daysLeft < 0 && <p className="text-danger">Due {props.shelfCurrentLoan.daysLeft} days ago</p>}
                                <div className="list-group mt-3">
                                    <button data-bs-dismiss="modal" className="list-group-item list-group-item-action" aria-current="true">
                                        Return movie
                                    </button>
                                    <button data-bs-dismiss="modal" className={props.shelfCurrentLoan.daysLeft < 0 ? "list-group-item list-group-item-action inactive" : "list-group-item list-group-item-action"}>
                                        {props.shelfCurrentLoan.daysLeft < 0 ? "Late dues can not be renewed" : "Renew loan for 7 days"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );

}