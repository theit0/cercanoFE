/// <reference types="vite/client" />
import { Button, Dropdown, Form, Modal } from "react-bootstrap";

//Dependencias para validar los formularios


import { useFormik } from "formik";
import * as Yup from "yup";
//Notificaciones al usuario
import { toast } from 'react-toastify';

import { useEffect, useState } from "react";
import './ProductModal.css'
import { Producto } from "../../types/Producto";

import { ModalType } from "../../types/ModalType";
import { Categoria } from "../../types/Categoria";
import { ProductoRequests } from "../../services/Requests/ProductoRequests/ProductoRequests";
import { useAuth0 } from "@auth0/auth0-react";
import { CategoriaRequests } from "../../services/Requests/CategoriaRequests/CategoriaRequests";





//Recibe parametros como props para que se renderice, su titulo y según qué operación queremos realizar.
type ProductModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    prod: Producto;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
    
};





const ProductModal = ({show, onHide, title, prod, modalType, refreshData}:ProductModalProps) => {

    
    const { getAccessTokenSilently } = useAuth0();
        

    //CREATE-UPDATE función handleSaveUpdate 
    const handleSaveUpdate = async (pro : Producto) => {
    try {
        const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            },
          });
        const isNew = pro.id === 0;
        if (isNew) {
            await ProductoRequests.createProducto(pro,token);
        } else {
            await ProductoRequests.updateProducto(pro.id, pro,token);
        }
        toast.success(isNew ? "Producto Creado" : "Producto Actualizado", {
            position: "top-center",
        });
        onHide();
        refreshData(prevState => !prevState);
    } catch (error) {
        console.error(error);
        toast.error('Ha ocurrido un error');
    }
    
};


//Función handleDelete (DELETE)
const handleDelete = async (pro: Producto) => {
    try {
        const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            },
          });
        await ProductoRequests.deleteProducto(pro.id,pro,token);
        toast.success("Articulo dado de baja", {
            position: "top-center", 
        });
        onHide();
        refreshData(prevState => !prevState);
    } catch (error) {
        console.error(error);
        toast.error("Ha ocurrido un error");
        
    }
    
}
const [Categoria, setCategorias] = useState<Categoria[]>([]);
useEffect(() => {
    const fetchCategorias = async () => {
    try {
        
        const data = await CategoriaRequests.getCategorias();
        setCategorias(data);
    } catch (error) {
        console.error(error);
        // Manejo de error, muestra un mensaje al usuario, etc.
    }
    };
    fetchCategorias();
}, []);
        //YUP - Esquema de validación
    const validationSchema = () => {
        return Yup.object().shape({
        id: Yup.number().integer().min(0),
        nombre:  Yup.string().required('El nombre es requerido'),
        monto: Yup.number().min(0).required('El precio es requerido'),
        descripcion: Yup.string().required('La descripcion es requerida'),
        urlImagen: Yup.string().required('La URL de la imagen es requerida'),
        });
    };
    

//Formik -  Utiliza el esquema de validación de YUP y obtiene un formulario dinámico que
// bloquea el formulario en caso de haber errores.
    const formik = useFormik({
        initialValues: prod,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Producto) => handleSaveUpdate(obj),
     });



        return(
            <>

            {modalType === ModalType.DELETE ? (
                

                <Modal show={show} onHide={onHide} centered backdrop="static">

                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p> ¿Está seguro que desea eliminar el producto
                        <br /> <strong> {prod.descripcion} </strong> ?
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>

                    <Button variant="danger" onClick={()=>handleDelete(prod)}>
                        Borrar
                    </Button>
                </Modal.Footer>

                </Modal>
                
            ) : (

                <>
                <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                    
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                   
                    <Form onSubmit={formik.handleSubmit}>

                    {"Nombre"}
                        <Form.Group controlId="formNombre">
                            {/*}<Form.Label>titulo</Form.Label>{*/}
                            <Form.Control
                                name="nombre"
                                type="text"
                                value={formik.values.nombre || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.nombre &&
                                formik.touched.nombre)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.nombre}
                             </Form.Control.Feedback>
                        </Form.Group>
                        
                    {"Descripcion"}
                        <Form.Group controlId="formDescription">
                            {/*}<Form.Label>titulo</Form.Label>{*/}
                            <Form.Control
                                name="descripcion"
                                type="text"
                                value={formik.values.descripcion || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.descripcion &&
                                formik.touched.descripcion)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.descripcion}
                             </Form.Control.Feedback>
                        </Form.Group>


                    {"Monto"}                    
                        <Form.Group controlId="formPrice">
                           {/*} <Form.Label>Precio</Form.Label>{*/}
                            <Form.Control
                                name="monto"
                                type="number"
                                value={formik.values.monto || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.monto &&
                                formik.touched.monto)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.monto}
                             </Form.Control.Feedback>
                        </Form.Group>

                        
                    {"Imagen"}                
                        <Form.Group controlId="formImage">
                          {/*}  <Form.Label>Imagen</Form.Label>{*/}
                            <Form.Control
                                name="urlImagen"
                                type="text"
                                value={formik.values.urlImagen || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.urlImagen &&
                                formik.touched.urlImagen)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.urlImagen}
                             </Form.Control.Feedback>
                        </Form.Group>
                    {"Categoria"}
                        <Form.Group controlId="formCategoria">
                                    <Form.Label></Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-categoria">
                                            {
                                                formik.values.categoria.nombreCategoria || 'categoria'
                                            }
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        {Categoria.map((categoria) => (
                                            <Dropdown.Item key={categoria.id}  onClick={() => formik.setValues({ ...formik.values, categoria: categoria })}>
                                            {categoria.nombreCategoria}
                                            </Dropdown.Item>
                                        ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>

                            <Modal.Footer className="mt-4">
                                
                                <Button variant="secondary" onClick={onHide}>
                                    Cancelar
                                </Button>
                                <Button variant="primary" type="submit" disabled={!formik.isValid}>
                                    Guardar
                                </Button>

                            </Modal.Footer>
                            </Form>
                               

                    </Modal.Body>

                </Modal>

            </>
        )}
        </>
    )

}


export default ProductModal;