import { Link } from 'react-router-dom';
import './Header.css';
import LogoutButton from '../LogoutButton/LogoutButton';
import LoginButton from '../LoginButton/LoginButton';
import { useAuth0 } from "@auth0/auth0-react";
import ProfileButton from '../ProfileButton/ProfileButton';
import Pedido from '../Pedido/Pedido';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../../context/CartProvider';

const Header = () => {
  const { isAuthenticated } = useAuth0();
  const [isToggled, setIsToggled] = useState(false);
  const { cartItems } = useCart();


  const handleCarrito = () => {
    setIsToggled(!isToggled);
  }

  const listaRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = (e: MouseEvent) => {
    if (listaRef.current && !listaRef.current.contains(e.target as Node)) {
      setIsToggled(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleCarritoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Evita que el clic se propague al documento y cierre el carrito inmediatamente
    handleCarrito();
  };


  return (
    <header>
      <div style={{marginLeft:"1rem"}}>
        <img src='src/assets/images/cercanoOesteLogo.png' width={100} alt='logo' />
      </div>
      <div>
        <nav>
          {!isAuthenticated && (
            <div style={{position:"relative"}}>
              <button className='carrito-button' onClick={handleCarritoClick}>
                <img src='src/assets/icons/shopping-cart.svg' alt='carrito' />
                {cartItems.length>0 && (
                <span className='alert-carrito'></span>
              )}
              </button>
            </div>
            
          )}

          <div>
            {isAuthenticated ? (
              <>
                <Link to="/pedidos">VER PEDIDOS</Link>
                <Link to="/productos">GESTIONAR PRODUCTOS</Link>
                <Link to="/categorias">GESTIONAR CATEGORIAS</Link>
                <LogoutButton />
                <ProfileButton />
              </>
            ) : (
              <>
                <LoginButton />
              </>
            )}
          </div>
        </nav>
        {isToggled && (
        <div ref={listaRef}>
          <Pedido />
        </div>
      )}
      </div>
      
      
      
    </header>
  )
}

export default Header;
