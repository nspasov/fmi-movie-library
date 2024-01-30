import React from 'react';
import './App.css';
import Navbar from './layouts/NavbarAndFooter/NavBar';
import Footer from './layouts/NavbarAndFooter/Footer';
import HomePage from './layouts/HomePage/HomePage';
import { SearchMoviesPage } from './layouts/SearchMoviesPage/SearchMoviesPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MovieCheckoutPage } from './layouts/MovieCheckoutPage/MovieCheckoutPage';

export default function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route path='/search'>
            <SearchMoviesPage />
          </Route>
          <Route path='/checkout/:movieId'>
            <MovieCheckoutPage/>
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

