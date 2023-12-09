import './styles/Home.css'

import  { CategoriaRequests } from "../services/Requests/CategoriaRequests/CategoriaRequests"
import { useEffect, useState } from 'react';

import { Categoria } from '../types/Categoria';
import { Producto } from '../types/Producto';
import { ProductoRequests } from '../services/Requests/ProductoRequests/ProductoRequests';

const Home = () => {

  const [categorias,setCategorias] = useState<Categoria[]>([]);
  const [productos,setProductos] = useState<Producto[]>([]);

    useEffect(() => {

      //Llamamos a la función para obtener todos los productos declarado en el service
      const fetchCategorias = async () => {
          const categorias = await CategoriaRequests.getCategorias();
          setCategorias(categorias);
      };

      const fetchProductos = async () => {
        const productos = await ProductoRequests.getProductos();
        setProductos(productos);
    };

      fetchCategorias();
      fetchProductos();
    }, []);



    return (
      <section className='productos-section'>
        {categorias.map((cat) => (
          <div >
            <h2 >{cat.nombreCategoria}</h2>
            <div className='categoria-container'>
                  {
                    productos
                      .filter((prod) => prod.categoria.id === cat.id) // Filtrar productos por categoría
                      .map((filteredProd) => {
                        return (
                          <article className='producto'>
                              
                              <div className='prod-image-container'>
                                <img src='src/assets/images/default-product.jpg'/>
                              </div>
                              
                              <div className='info-prod-container'>
                                  <div className='nombre-prod-container'>
                                    <h3>{filteredProd.nombre}</h3>
                                    <p >${filteredProd.monto}</p>
                                  </div>
                                  
                                  <div className='desc-container'>
                                    <p>{filteredProd.descripcion}</p>
                                    <button className='login-button'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
                                        Agregar al pedido
                                    </button>
                                  </div>
                              </div>

                          </article>
                        )
                      })
                  }
            </div>
            
          </div>
        ))}
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