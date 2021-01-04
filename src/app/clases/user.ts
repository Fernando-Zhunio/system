import { Permission } from "./permission";

export class User {
    id:string;
    name:string;
    email:string;
    permission:any;
    rol:any;
    companies:any

    constructor(id,name,permision,rol,companies){
        this.id = id;
        this.name = name;
        this.permission = permision;
        this.rol = rol;
        this.companies = companies
    }
}
