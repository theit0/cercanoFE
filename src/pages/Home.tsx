
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

      <section className='select-categorias'>
        {categorias.map((cat) => {
          return (
            <button onClick={() => handleCategoria(cat)} className='cat-button'  key={cat.id}>
              {cat.nombreCategoria}
            </button>
          );
        })}
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