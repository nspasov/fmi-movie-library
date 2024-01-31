import { NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { LoadingSpinner } from "../Utils/LoadingSpinner";

export default function Navbar() {

    const { oktaAuth, authState } = useOktaAuth();

    if (!authState) {
        return <LoadingSpinner />
    }

    console.log(authState);

    const handleLogout = async () => oktaAuth.signOut();

    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <NavLink className='navbar-brand' to='/'>FMI MOVIES</NavLink>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNavDropdown'
                    aria-controls='navbarNavDropdown'
                    aria-expanded='false'
                    aria-label='Toggle Navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/home'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search'>Search Movies</NavLink>
                        </li>
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        {!authState.isAuthenticated ?
                            <li className='nav-item m-1'>
                                <a type='button' className='btn btn-outline-light' href='/login'>Sign in</a>
                            </li>
                            :
                            <li className='nav-item m-1'>
                                <a type='button' className='btn btn-outline-light' onClick={handleLogout}>Logout</a>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}