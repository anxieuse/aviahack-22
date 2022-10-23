import '../CommonStyle.css';
import {Route, Router, Routes} from "react-router-dom";
import MainPage from "../../screens/MainPage";
import Statistic from "../../screens/Statistic";

function Navigation() {
    return(
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/statistic" element={<Statistic />} />
        </Routes>
    );
}

export default Navigation;
