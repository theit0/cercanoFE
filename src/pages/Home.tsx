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
          <div className='categoria-productos'>
            <h2>{cat.nombreCategoria}</h2>
            <div>
            {
              productos
                .filter((prod) => prod.categoria.id === cat.id) // Filtrar productos por categoría
                .map((filteredProd) => {
                  return (
                    <div className='producto'>
                      <h3>{filteredProd.nombre}</h3>
                      <p>{filteredProd.descripcion}</p>
                      <p>{filteredProd.monto}</p>
                      <button>Agregar al carrito</button>
                    </div>
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