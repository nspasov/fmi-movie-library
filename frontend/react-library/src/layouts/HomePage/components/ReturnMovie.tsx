export default function ReturnMovie() {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')} width='151' height='233' alt="movie" />
                <h6 className="mt-2">Movie</h6>
                <p>Movie name</p>
                <a className="btn main-color text-white" href="#">Reserve</a>
            </div>
        </div>
    );
}