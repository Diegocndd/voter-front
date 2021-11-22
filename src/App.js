import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';

import Home from "./Pages/Home";
import CreateAccount from './Pages/CreateAccount';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-account" element={<CreateAccount />} />
            </Routes>
        </Router>
    )
}

export default App;