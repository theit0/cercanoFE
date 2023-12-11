import { Base } from "../services/BaseAPIInterface";
import { Categoria } from "./Categoria";


export interface Producto extends Base{
    id:number;
    nombre:string;
    descripcion:string;
    urlImagen:string;
    monto:number;
    categoria: Categoria;
    fechaAlta: Date | null;
    fechaModificacion:Date |null
}