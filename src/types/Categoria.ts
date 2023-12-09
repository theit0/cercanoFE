import { Base } from "../services/BaseAPIInterface";


export interface Categoria extends Base{
    id:number;
    nombreCategoria:string;
}