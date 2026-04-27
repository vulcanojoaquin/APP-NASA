import { Routes, Route } from "react-router-dom";
import Home from '../Pages/Home/Home';
import Details from '../Pages/Details/Details';
import Favorites from '../Pages/Favorites/Favorites';



function AppRoutes() {

    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/favorites" element={<Favorites />} />
        </Routes>
    )
}


export default AppRoutes