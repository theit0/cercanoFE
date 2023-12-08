import { Link } from 'react-router-dom'
import './Header.css'
import LogoutButton from '../LogoutButton/LogoutButton'
import LoginButton from '../LoginButton/LoginButton'
import {useAuth0} from "@auth0/auth0-react";
import ProfileButton from '../ProfileButton/ProfileButton';
import './Header.css'


const Header = () => {
  const {isAuthenticated} = useAuth0();

  return (
    <header>

       <img src='src/assets/images/cercanoOesteLogo.png' width={100} alt='logo'/>

       <nav>

          {
            !isAuthenticated &&
            <button className='carrito-button'>
                <img src='src/assets/icons/shopping-cart.svg' alt='carrito'/>
            </button>
          }
          
          
          <div>
            { isAuthenticated ? (
              <>
                <Link to="/pedidos">
                  VER PEDIDOS
                </Link>
                <Link to="/productos">
                  GESTIONAR PRODUCTOS
                </Link>
                <Link to="/categorias">
                  GESTIONAR CATEGORIAS
                </Link>
                <LogoutButton/>
                <ProfileButton/>
              </>
              
            ) : (
              <>
                <LoginButton/>
              </>
            )
            }
          </div>
       </nav>
       

       
    </header>

  )
}

export default Header