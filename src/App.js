import {
    HashRouter as Router,
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
import ForgotPassword from './Pages/ForgotPassword';
import SentEmail from './Pages/ForgotPassword/SentEmail';
import CreatePoll from './Pages/CreatePoll.js';
import PrivateRoute from './Pages/PrivateRoute';
import Poll from './Pages/Poll';
import PollDetail from './Pages/PollDetail';

import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './store';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/create-account" element={<CreateAccount />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/create-poll" element={<PrivateRoute><CreatePoll /></PrivateRoute>} />
                        <Route path="/poll-detail" element={<PrivateRoute><PollDetail /></PrivateRoute>} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/sent-email" element={<SentEmail />} />
                        <Route path="/poll" element={<Poll />} />
                    </Routes>
                </Router>
            </PersistGate>
        </Provider>
    )
}

export default App;