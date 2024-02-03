import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel";
import { LoadingSpinner } from "../../Utils/LoadingSpinner";
import { Pagination } from "../../Utils/Pagination";
import { AdminMessage } from "./AdminMessage";
import AdminMessageRequest from "../../../models/AdminMessageRequest";

export const AdminMessages = () => {
    const {authState} = useOktaAuth();

    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [messagesPerPage, setMessagesPerPage] = useState(5);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [buttonSubmit, setButtonSubmit] = useState(false);


    useEffect(() => {
        const fetchUserMessages = async () => {
            if(authState && authState.isAuthenticated){
                const url = `http://localhost:8080/api/messages/search/findByClosed/?closed=false&page=${currentPage-1}&size=${messagesPerPage}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };

                const messagesResponse = await fetch(url, requestOptions);

                if(!messagesResponse.ok){
                    throw new Error('Something went wrong');
                }

                const messagesResponseJson = await messagesResponse.json();

                setMessages(messagesResponseJson._embedded.messages);
                setTotalPages(messagesResponseJson.page.totalPages);
            }
            setIsLoadingMessages(false);
        }

        fetchUserMessages().catch((err: any) => {
            setIsLoadingMessages(false);
            setHttpError(err.message);
        });
        window.scrollTo(0,0);
    }, [authState, currentPage, buttonSubmit]);

    if(isLoadingMessages){
        return(
            <LoadingSpinner/>
        );
    }

    if(httpError){
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    async function submitResponse(id: number, response: string){
        const url = `http://localhost:8080/api/messages/secure/admin/message`;

        if(authState && authState?.isAuthenticated && id !== null && response !== ''){

            const messageAdminRequestModel: AdminMessageRequest = new AdminMessageRequest(id, response);
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageAdminRequestModel)
            }

            const messageAdminRequestModelResponse = await fetch(url, requestOptions);

            if(!messageAdminRequestModelResponse.ok){
                throw new Error('Something went wrong');
            }
            setButtonSubmit(!buttonSubmit);

        }

        
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return(
        <div className="mt-3">
            {messages.length > 0 ? 
                <>
                    <h5>Pending response</h5>
                    {messages.map(message => (
                        <AdminMessage submitResponse={submitResponse} message={message} key={message.id} />
                    ))}
                </>
                :
                <h5>Nothing pending</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}