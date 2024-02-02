import React from 'react';
import './App.css';
import Navbar from './layouts/NavbarAndFooter/NavBar';
import Footer from './layouts/NavbarAndFooter/Footer';
import HomePage from './layouts/HomePage/HomePage';
import { SearchMoviesPage } from './layouts/SearchMoviesPage/SearchMoviesPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { MovieCheckoutPage } from './layouts/MovieCheckoutPage/MovieCheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './layouts/MovieCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';

const oktaAuth = new OktaAuth(oktaConfig);

export default function App() {

  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  }

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
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
            <Route path='/reviewList/:movieId'>
              <ReviewListPage />
            </Route>
            <Route path='/checkout/:movieId'>
              <MovieCheckoutPage />
            </Route>
            <Route path='/login' render={() => <LoginWidget config={oktaConfig} />}/>
            <Route path='/login/callback' component={LoginCallback} />
            <SecureRoute path="/shelf"><ShelfPage/></SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}


