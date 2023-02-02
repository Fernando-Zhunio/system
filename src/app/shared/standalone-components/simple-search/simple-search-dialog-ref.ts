import { SimpleSearchSelectorService } from "./simple-search-selector.service";

export class SimpleSearchDialogRef {
    private ref;
    private id;
    
    constructor(ref: SimpleSearchSelectorService, id: any) {
        this.ref = ref;
        this.id = id;
    }

    getId(){
        return this.id;
    }

    close(data: any = null){
        this.ref.close(this.id, data);
    }

}
