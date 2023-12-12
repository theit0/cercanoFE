import { useCategoria } from "../context/CategoriaProvider";
import { useEffect, useState } from "react";
import { Producto } from "../types/Producto";
import { ProductoRequests } from "../services/Requests/ProductoRequests/ProductoRequests";
import ProductoCard from "../components/ProductoCard/ProductoCard";
import "./styles/Categoria.css"

const Categoria = () => {

    const { categoriaSeleccionada } = useCategoria();

    const [productos,setProductos] = useState<Producto[]>();

    useEffect(() => {
        const fetchProductos = async () => {
            if (categoriaSeleccionada && categoriaSeleccionada.id) {
                const productos = await ProductoRequests.getCatProds(categoriaSeleccionada.id);
                setProductos(productos);
            }
        };
        fetchProductos();
    }, [categoriaSeleccionada]);



    if (!categoriaSeleccionada) {
        return <div>No hay categoría seleccionada</div>;
    } else if (!productos) {
        return <div>No hay productos</div>;
    }


    const volverPagina = () => {
      window.history.back();
    }

    return (
        <div key={categoriaSeleccionada.id} className="categoria-section">
          <button onClick={()=>volverPagina()} className="login-button" style={{width:"fit-content",borderRadius:"50%",padding:"1rem",boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"}}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg>
          </button>
          <h2>{categoriaSeleccionada.nombreCategoria}</h2>
          <div className='categoria-container'>
            {productos
              .filter((prod) => prod.categoria.id === categoriaSeleccionada.id)
              .map((filteredProd) => {
                return (
                  <ProductoCard producto={filteredProd}/>
                );
              })}
          </div>
        </div>
    )
}

export default Categoria