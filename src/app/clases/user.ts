import { Permission } from "./permission";

export class User {
    id:string;
    name:string;
    email:string;
    permission:any;
    rol:any;
    companies:any
    company_company_id:string;

    constructor(id,name,permision,rol,companies,company_company_id){
        this.id = id;
        this.name = name;
        this.permission = permision;
        this.rol = rol;
        this.companies = companies;
        this.company_company_id = company_company_id;
    }
}
