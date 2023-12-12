
import './styles/Home.css';
import { CategoriaRequests } from '../services/Requests/CategoriaRequests/CategoriaRequests';
import { useEffect, useState } from 'react';
import { Categoria } from '../types/Categoria';
import { useNavigate } from 'react-router-dom';
import { useCategoria } from '../context/CategoriaProvider';

const Home = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const navigate = useNavigate();
  const { setCategoriaSeleccionada } = useCategoria();

  
  const handleCategoria = (cat:Categoria)=> {
     ;
    setCategoriaSeleccionada(cat);
    navigate(`/categoria/${cat.nombreCategoria.toLowerCase().replace(/\s/g, '-')}`)
  }

  useEffect(() => {
    const fetchCategorias = async () => {
      const categorias = await CategoriaRequests.getCategorias();
      setCategorias(categorias);
    };

    fetchCategorias();

  
  }, []);


  return (
    <section className='productos-section'>

      <div className='banner'>
        <img  src='src/assets/images/cowboy.jpeg' className='cowboy'/>
        <div className='banner-text'>
            <img src='src/assets/images/cercanoOesteLogo.png' width={200}/>
            <h1>CERCANO OESTE</h1>
            <h4 className='m-0'>¡ABIERTO DE MARTES A DOMINGO DE 20:30 a 01:00!</h4>
            <div className='banner-buttons'>
              <button className='login-button'><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pin-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" stroke-width="0" fill="currentColor" /></svg>UBICACIÓN</button>
              <button className='login-button'><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 3a1 1 0 0 1 .877 .519l.051 .11l2 5a1 1 0 0 1 -.313 1.16l-.1 .068l-1.674 1.004l.063 .103a10 10 0 0 0 3.132 3.132l.102 .062l1.005 -1.672a1 1 0 0 1 1.113 -.453l.115 .039l5 2a1 1 0 0 1 .622 .807l.007 .121v4c0 1.657 -1.343 3 -3.06 2.998c-8.579 -.521 -15.418 -7.36 -15.94 -15.998a3 3 0 0 1 2.824 -2.995l.176 -.005h4z" stroke-width="0" fill="currentColor" /></svg>+54 261 546-3224</button>
              <a href={'https://wa.me/542615463224'} target='_blank' className='login-button'><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-whatsapp" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>WHATSAPP</a>
            </div>
        </div>
      </div>

      <section className='select-categorias' id='cats'>
        <h2>¡HACÉ TU PEDIDO!</h2>
        <div className='categorias-container'>
          {categorias.map((cat) => {
            return (
              <div className='categoria-card' onClick={() => handleCategoria(cat)}>
                  <h5>{cat.nombreCategoria}</h5>
                  <img src='src/assets/images/default-product.jpg'/>
              </div>
            );
          })}
        </div>
        
      </section>
    </section>
  );
};

export default Home;





/* const { getAccessTokenSilently } = useAuth0();

  const [categorias,setCategorias] = useState<Categoria[]>([]);

  const obtenerCategorias = async () => {
    await getAccessTokenSilently()
      .then(async (accessToken) => {
        const response = await getCategorias();
        setCategorias(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  obtenerCategorias();

  console.log(categorias) */