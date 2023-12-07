import { Link } from 'react-router-dom'
import './Header.css'
import LogoutButton from '../LogoutButton/LogoutButton'
import LoginButton from '../LoginButton/LoginButton'
import {useAuth0} from "@auth0/auth0-react";
import RegisterButton from '../RegisterButton/RegisterButton';
import ProfileButton from '../ProfileButton/ProfileButton';

const Header = () => {
  const {isAuthenticated} = useAuth0();

  return (
    <div>
       <Link to="/">
          Home page
       </Link>
       <Link to="/cliente">
          Cliente page
       </Link>
       <Link to="/admin">
          Admin page
       </Link>

       <div>
          { isAuthenticated ? (
            <>
              <LogoutButton/>
              <ProfileButton/>
            </>
            
          ) : (
            <>
              <LoginButton/>
              <RegisterButton/>
            </>
          )
          }
       </div>
    </div>

  )
}

export default Header