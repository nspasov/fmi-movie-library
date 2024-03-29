import { useOktaAuth } from "@okta/okta-react";
import Footer from "../NavbarAndFooter/Footer";
import Navbar from "../NavbarAndFooter/NavBar";
import Carousel from "./components/Carousel";
import ExploreTopMovies from "./components/ExploreTopMovies";
import Heros from "./components/Heros";
import LibraryServices from "./components/LibraryServices";



export default function HomePage() {

    const {authState} = useOktaAuth();
    console.log('*** CLAIMS ****', authState?.accessToken?.claims);

    return (
        <>
            <ExploreTopMovies />
            <Carousel />
            <Heros />
            <LibraryServices />
        </>
    );
}