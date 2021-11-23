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
import Profile from './Pages/Profile';
import Dashboard from './Pages/Dashboard';

import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './store';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create-account" element={<CreateAccount />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default App;