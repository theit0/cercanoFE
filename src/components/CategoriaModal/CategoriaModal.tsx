/// <reference types="vite/client" />
import { Button, Form, Modal } from "react-bootstrap";

//Dependencias para validar los formularios


import { useFormik } from "formik";
import * as Yup from "yup";
//Notificaciones al usuario
import { toast } from 'react-toastify';


import './CategoriaModal.css'


import { ModalType } from "../../types/ModalType";
import { Categoria } from "../../types/Categoria";


import { CategoriaRequests } from "../../services/Requests/CategoriaRequests/CategoriaRequests";
import { useAuth0 } from "@auth0/auth0-react";





//Recibe parametros como props para que se renderice, su titulo y según qué operación queremos realizar.
type CategoriaModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    cate: Categoria;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
    
};





const CategoriaModal = ({show, onHide, cate, modalType, refreshData}:CategoriaModalProps) => {
    const { getAccessTokenSilently } = useAuth0();
        

    //CREATE-UPDATE función handleSaveUpdate 
    const handleSaveUpdate = async (cat : Categoria) => {
    try {
        const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            },
          });
        const isNew = cat.id === 0;
        if (isNew) {
            await CategoriaRequests.createCategoria(cat,token);
        } else {
            await CategoriaRequests.updateCategoria(cat.id, cat,token);
        }
        toast.success(isNew ? "Categoria Creada" : "Categoria Actualizada", {
            position: "top-right",
        });
        onHide();
        refreshData(prevState => !prevState);
    } catch (error) {
        console.error(error);
        toast.error('Ha ocurrido un error');
    }
    
};


//Función handleDelete (DELETE)
const handleDelete = async (cat: Categoria) => {
    try {
        const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
        await CategoriaRequests.deleteCategoria(cat.id,cat,token);
        toast.success("categoria dada de baja", {
            position: "top-right", 
        });
        onHide();
        refreshData(prevState => !prevState);
    } catch (error) {
        console.error(error);
        toast.error("Ha ocurrido un error");
        
    }
    
}

        //YUP - Esquema de validación
    const validationSchema = () => {
        return Yup.object().shape({
        id: Yup.number().integer().min(0),
        nombreCategoria:  Yup.string().required('El nombre es requerido'),
        
        });
    };
    

//Formik -  Utiliza el esquema de validación de YUP y obtiene un formulario dinámico que
// bloquea el formulario en caso de haber errores.
    const formik = useFormik({
        initialValues: cate,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Categoria) => handleSaveUpdate(obj),
     });



        return(
            <>

            {modalType === ModalType.DELETE ? (
                

                <Modal show={show} onHide={onHide} centered backdrop="static">

                <Modal.Header closeButton>
                    <Modal.Title>{"Borrar Categoria"}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p> ¿Está seguro que desea eliminar la categoria
                        <br /> <strong> {cate.nombreCategoria} </strong> ?
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancelar
                    </Button>

                    <Button variant="danger" onClick={()=>handleDelete(cate)}>
                        Borrar
                    </Button>
                </Modal.Footer>

                </Modal>
                
            ) : (

                <>
                <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                    
                    <Modal.Header closeButton>
                        <Modal.Title>{"Editar Categoria"}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                    
                    <Form onSubmit={formik.handleSubmit}>

                    {"Nombre"}
                        <Form.Group controlId="formNombre">
                            {/*}<Form.Label>titulo</Form.Label>{*/}
                            <Form.Control
                                name="nombreCategoria"
                                type="text"
                                value={formik.values.nombreCategoria || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.nombreCategoria &&
                                formik.touched.nombreCategoria)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.nombreCategoria}
                             </Form.Control.Feedback>
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



export default CategoriaModal;