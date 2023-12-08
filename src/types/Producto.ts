import { Base } from "../services/BaseAPIInterface";
import { Categoria } from "./Categoria";


export interface Producto extends Base{
    nombre:string;
    descripcion:string;
    urlImagen:string;
    monto:number;
    categoria: Categoria;
}