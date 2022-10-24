import { CreateHostService } from "../services/create-host.service";

export class CreateHostRef {
    private ref;
    private _componentRef;
    public get componentRef() {
        return this._componentRef;
    }
    public set componentRef(value) {
        this._componentRef = value;
    }
    private id;
    
    constructor(ref: CreateHostService){
        this.ref = ref;
    }

    setId(id: any){
        this.id = id;
    }

    getId(){
        return this.id;
    }

    close(data: any = null){
        this.ref.close(this.id, data);
    }

}
