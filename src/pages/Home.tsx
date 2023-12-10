
import './styles/Home.css';
import { CategoriaRequests } from '../services/Requests/CategoriaRequests/CategoriaRequests';
import { useEffect, useState } from 'react';
import { Categoria } from '../types/Categoria';
import { Producto } from '../types/Producto';
import { ProductoRequests } from '../services/Requests/ProductoRequests/ProductoRequests';
import ProductoCard from '../components/ProductoCard/ProductoCard';

const Home = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);

  
  //Navegar suavemente hacia la categoria
  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
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

      <section className='select-categorias'>
        <button className='goUp-button' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-up" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M16 9l-4 -4" /><path d="M8 9l4 -4" /></svg>
        </button>
        {categorias.map((cat) => {
          return (
            <button onClick={() => scrollToCategory(cat.nombreCategoria)} className='cat-button'  key={cat.id} >
              {cat.nombreCategoria}
            </button>
          );
        })}
      </section>

      {categorias.map((cat) => (
        <div key={cat.id} id={`${cat.nombreCategoria}`}>
          <h2>{cat.nombreCategoria}</h2>
          <div className='categoria-container'>
            {productos
              .filter((prod) => prod.categoria.id === cat.id)
              .map((filteredProd) => {
                return (
                  <ProductoCard producto={filteredProd}/>
                );
              })}
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