import { Cperson } from '../class/cperson';
export class User {
    id: string;
    name: string;
    email: string;
    permission: any;
    rol: any;
    companies: any;
    company_company_id: string;
    person: Cperson;

    constructor(id, name, permision, rol, companies, company_company_id, person: Cperson) {
        this.id = id;
        this.name = name;
        this.permission = permision;
        this.rol = rol;
        this.companies = companies;
        this.company_company_id = company_company_id;
        this.person = person;
    }
}
