import { useSelector } from "react-redux";
import Login from "../pages/login";

const withAuth = Component => {
  const Auth = props => {
    const user = useSelector(state => state.user);

    // If user is not logged in,
    if (!user.user) {
      return <Login />;
    }

    // If user is logged in,
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
