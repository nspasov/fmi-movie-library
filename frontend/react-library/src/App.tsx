import React from 'react';
import './App.css';
import Navbar from './layouts/NavbarAndFooter/NavBar';
import Footer from './layouts/NavbarAndFooter/Footer';
import HomePage from './layouts/HomePage/HomePage';
import { SearchMoviesPage } from './layouts/SearchMoviesPage/SearchMoviesPage';

export default function App() {
  return (
    <>
      <Navbar />
      {/* <HomePage/> */}
      <SearchMoviesPage />
      <Footer />
    </>
  );
}

