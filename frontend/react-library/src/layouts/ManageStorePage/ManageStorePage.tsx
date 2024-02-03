import { useOktaAuth } from "@okta/okta-react"
import { useState } from "react";
import { Redirect } from "react-router-dom";

export const ManageStorePage = () => {

    const {authState} = useOktaAuth();

    const [changeQuantityOfMoviesClicked, setChangeQuantityOfMoviesClicked] = useState(false);
    const [messagesClicked, setMessagesClicked] = useState(false);


    function addMovieClickFunction(){
        setChangeQuantityOfMoviesClicked(false);
        setMessagesClicked(false);
    }

    function changeQuantityOfMoviesClickFunction(){
        setChangeQuantityOfMoviesClicked(true);
        setMessagesClicked(false);
    }

    function messagesClickFuntion(){
        setChangeQuantityOfMoviesClicked(false);
        setMessagesClicked(true);
    }

    //console.log('*** AUTH STATE *****', authState);

    if(authState?.accessToken?.claims.userType === undefined){
        //console.log('*** CLAIMS ****', authState?.accessToken?.claims);
        
        return <Redirect to={'/home'}/>
    }


    return(
        <div className="container">
            <div className="mt-5">
                <h3>Manage Store</h3>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button onClick={addMovieClickFunction} className="nav-link active" id="nav-add-movie-tab" data-bs-toggle='tab' data-bs-target='#nav-add-movie' type="button" role="tab" aria-controls="nav-add-movie" aria-selected="false">
                            Add new movie
                        </button>
                        <button onClick={changeQuantityOfMoviesClickFunction} className="nav-link" id="nav-quantity-tab" data-bs-toggle='tab' data-bs-target='#nav-quantity' type="button" role="tab" aria-controls="nav-quantity" aria-selected="true">
                            Change quantity
                        </button>
                        <button onClick={messagesClickFuntion} className="nav-link" id="nav-messages-tab" data-bs-toggle='tab' data-bs-target='#nav-messages' type="button" role="tab" aria-controls="nav-messages" aria-selected="false">
                            Messages
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tab-content">
                    <div className="tab-pane fade show active" id="nav-add-movie" role="tabpanel" aria-labelledby="nav-add-movie-tab">
                        Add Movie
                    </div>
                    <div className="tab-pane fade" id="nav-quantity" role="tabpanel" aria-labelledby="nav-quantity-tab">
                        {changeQuantityOfMoviesClicked ? <>Change Quantity</> : <></>}
                    </div>
                    <div className="tab-pane fade" id="nav-messages" role="tabpanel" aria-labelledby="nav-messages-tab">
                        {messagesClicked ? <>Admin Messages</> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}