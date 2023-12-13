
import { useCategoria } from "../../context/CategoriaProvider";
import { Categoria } from "../../types/Categoria"
import { useNavigate } from 'react-router-dom';


type CategoriaProps = {
    categoria:Categoria
}

const CategoriaCard = ({categoria}:CategoriaProps) => {
    const navigate = useNavigate();
    const { setCategoriaSeleccionada } = useCategoria();

    const handleCategoria = (cat:Categoria)=> {
        ;
       setCategoriaSeleccionada(cat);
       navigate(`/categoria/${cat.nombreCategoria.toLowerCase().replace(/\s/g, '-')}`)
     }
  return (
    <div className='categoria-card' onClick={() => handleCategoria(categoria)}>
        <img src='src/assets/images/default-product.jpg'/>
        <h5>{categoria.nombreCategoria}</h5>
    </div>
  )
}

export default CategoriaCard