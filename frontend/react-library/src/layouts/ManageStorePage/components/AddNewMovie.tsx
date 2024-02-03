import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";

export const AddNewMovie = () => {

    const {authState} = useOktaAuth();

    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('Category');
    const [selectedImg, setSelectedImg] = useState<any>(null);

    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string){
        setCategory(value);
    }


    return (
        <div className="container">
            {displaySuccess && 
                <div className="alert alert-success">Movie added sucessfully</div>
            }
            {
                displayWarning && 
                <div className="alert alert-danger">All fields must be filled out</div>
            }
            <div className="card">
                <div className="card-header">
                    Add a new movie
                </div>
                <div className="card-body">
                    <form method="POST">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" required onChange={e => setTitle(e.target.value)} value={title}/>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Director</label>
                                <input type="text" className="form-control" name="director" required onChange={e => setDirector(e.target.value)} value={director}/>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Category</label>
                                <button className="form-control btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle='dropdown' aria-expanded='false'>
                                    {category}
                                </button>
                                <ul id="addNewMovieId" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a onClick={() => categoryField('Comedy')} className="dropdown-item">Comedy</a></li>
                                    <li><a onClick={() => categoryField('Action')} className="dropdown-item">Action</a></li>
                                    <li><a onClick={() => categoryField('Horror')} className="dropdown-item">Horro</a></li>
                                    <li><a onClick={() => categoryField('Romance')} className="dropdown-item">Romance</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id="exampleFormControlTextArea1" rows={3} onChange={e => setDescription(e.target.value)} value={description}/>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Copies</label>
                            <input type="number" className="form-control" name="copies" required onChange={e => setCopies(Number(e.target.value))} value={copies} />
                        </div>
                        <input type='file' />
                        <div>
                            <button type="button" className="btn btn-primary mt-3">
                                Add Movie
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}