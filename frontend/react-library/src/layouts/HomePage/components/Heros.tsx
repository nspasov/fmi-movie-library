export default function Heros() {
    return (
        <div>
            <div className="d-none d-lg-block">
                <div className="row g-0 mt-5">
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-left"></div>
                    </div>
                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="ml-2">
                            <h1>What have you been watching</h1>
                            <p className="lead">
                                Our team would love to hear from you..
                                We are able to provide top content spawning different genres for you...
                            </p>
                            <a className="btn main-color btn-lg text-white" href="#">Sign up</a>
                        </div>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="ml-2">
                            <h1>Our collection is always growing</h1>
                            <p className="lead">
                                Checking in daily as our collection is ever changing...
                                We work nonstop to provide great movie selection
                                We are extremely passionate and our movies will always be our top priority
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-right"></div>
                    </div>
                </div>
            </div>
            {/* MOBILE */}
            <div className="d-lg-none">
                <div className="container">
                    <div className="m-2">
                        <div className="col-image-left"></div>
                        <div className="mt-2">
                            <h1>What have you been watching</h1>
                            <p className="lead">
                                Our team would love to hear from you..
                                We are able to provide top content spawning different genres for you...
                            </p>
                            <a className="btn main-color btn-lg text-white" href="#">Sign up</a>
                        </div>
                        <div className="mt-2">
                            <div className="col-image-right"></div>
                            <div className="mt-2">
                            <h1>Our collection is always growing</h1>
                            <p className="lead">
                                Checking in daily as our collection is ever changing...
                                We work nonstop to provide great movie selection
                                We are extremely passionate and our movies will always be our top priority
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}