import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  const auth = useSelector(
    (store) => store.app.auth.isLogged,
  );
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
