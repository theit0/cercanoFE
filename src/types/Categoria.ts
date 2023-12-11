import { Base } from "../services/BaseAPIInterface";


export interface Categoria extends Base{
    id:number;
    nombreCategoria:string;
    fechaAlta: Date;
    fechaModificacion: Date
}