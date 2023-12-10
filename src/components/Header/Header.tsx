import { Link } from 'react-router-dom';
import './Header.css';
import LogoutButton from '../LogoutButton/LogoutButton';
import LoginButton from '../LoginButton/LoginButton';
import { useAuth0 } from "@auth0/auth0-react";
import ProfileButton from '../ProfileButton/ProfileButton';
import Pedido from '../Pedido/Pedido';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const { isAuthenticated } = useAuth0();
  const [isToggled, setIsToggled] = useState(false);

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
      <div>
        <img src='src/assets/images/cercanoOesteLogo.png' width={100} alt='logo' />
      </div>
      <div>
        <nav>
          {!isAuthenticated && (
            <button className='carrito-button' onClick={handleCarritoClick}>
              <img src='src/assets/icons/shopping-cart.svg' alt='carrito' />
            </button>
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
