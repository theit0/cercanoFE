import { Link } from 'react-router-dom'
import './Header.css'
import LogoutButton from '../LogoutButton/LogoutButton'
import LoginButton from '../LoginButton/LoginButton'
import {useAuth0} from "@auth0/auth0-react";
import ProfileButton from '../ProfileButton/ProfileButton';
import './Header.css'
import Pedido from '../Pedido/Pedido';
import { useState } from 'react';


const Header = () => {
  const {isAuthenticated} = useAuth0();
  const [isToggled,setIsToggled] = useState(false);

  const handleCarrito = () => {
    setIsToggled(!isToggled);
  }

  

  return (
    <header>

       <img src='src/assets/images/cercanoOesteLogo.png' width={100} alt='logo'/>

       <nav>

          {
            !isAuthenticated &&
            <button className='carrito-button ' onClick={()=>handleCarrito()}>
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

       {
        isToggled &&
        <Pedido/>
       }
       
       
    </header>

  )
}

export default Header