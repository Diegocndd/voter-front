import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AboutUs from "./Pages/AboutUs";
import Discover from "./Pages/Discover";
import CreateAccount from './Pages/CreateAccount';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/discover" element={<Discover />} />
            </Routes>
        </Router>
    )
}

export default App;