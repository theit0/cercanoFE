import { useEffect, useState } from "react"



import Loader from "../Loader/Loader";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";

import { Table } from "react-bootstrap";
import './CategoriaTable.css'

import { Categoria } from "../../types/Categoria";
import { ModalType } from "../../types/ModalType";

import { CategoriaRequests } from "../../services/Requests/CategoriaRequests/CategoriaRequests";
import CategoriaModal from "../CategoriaModal/CategoriaModal";
const CategoriaTable = () => {

    //Variable que va a contener los datos recibidos por la API
    const [categoria, setCategoria] = useState<Categoria[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
    useEffect(() => {

        //Llamamos a la función para obtener todos los productos declarado en el service
        const fetchProducts = async () => {
            const categoria= await CategoriaRequests.getCategorias();
            setCategoria(categoria);
            setIsLoading(false);
        };

        fetchProducts();
    }, [refreshData]);

    //Test, este log está modificado para que muestre los datos de una manera más legible
    console.log(JSON.stringify(categoria, null, 2));


    //Se inicializa un producto vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
        const initializeNewProduct = (): Categoria => {
        return {
            id: 0,
            nombreCategoria:"",
            fechaAlta : new Date(),
            fechaBaja : null,
            fechaModificacion:null,
            };
    };

    //Producto seleccionado que se va a pasar como prop al Modal
        const [categori, setCategori] = useState<Categoria>(initializeNewProduct);
    
    //Manejo de Modal
        const [showModal, setShowModal] = useState(false);
        const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
        const [title, setTitle] = useState("");

    //Logica de Modal
        const handleClick = (newTitle: string, cat: Categoria, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setCategori(cat);
        setShowModal(true);
    };


  return (
    <section className="p-5 tabla-section">

    <div className="titulo-container">
        <h1 style={{fontWeight:"800"}}>Categorias</h1>
       
    </div>
           

    {isLoading ? <Loader/>: (
           
        <Table>
            <thead>
                <tr>
                    <th> Nombre </th>
                    <th> EDITAR</th>
                    <th> BORRAR </th>
                </tr>
            </thead>
            <tbody>
                {categoria.map(categori => (
                    <tr key={categori.id}>
                        <td> {categori.nombreCategoria }</td>
                        <td> <EditButton onClick={() => handleClick("Editar producto", categori, ModalType.UPDATE)}/> </td>
                        <td> <DeleteButton onClick={() => handleClick("Borrar producto", categori, ModalType.DELETE)} /> </td>

                    </tr>
                ))}
                 <tr className="add-row">
                  <td>
                    <button onClick={()=>handleClick("Nueva Categoria",initializeNewProduct(),ModalType.CREATE)} className="boton-agregar">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#949494" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                        <path d="M9 12h6"></path>
                        <path d="M12 9v6"></path>
                      </svg>
                    </button>
                  </td>
                  <td style={{color:"#949494"}}>Añadir Categoria...</td>
                  <td style={{color:"#949494"}}>...</td>
                  <td style={{color:"#949494"}}>...</td>
                  <td style={{color:"#949494"}}>...</td>
                
                </tr>
            </tbody>

        </Table>

    )}

    {showModal && (
        <CategoriaModal
        show = {showModal}
        onHide={() => setShowModal(false)}
        title={title}
        modalType={modalType}
        cate={categori}
        refreshData={setRefreshData}
        />
        
        
        
        
    )}

    
    </section>
  )
}

export default CategoriaTable