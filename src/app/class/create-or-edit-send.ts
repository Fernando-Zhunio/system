import { StandartSearchService } from '../services/standart-search.service';

export class CreateOrEditSend {
    standard: StandartSearchService;
    constructor( private _standard: StandartSearchService ) {
        this.standard = _standard;
    }

    createOrEdit(url,form,isEdit,callback): void {
        if (isEdit) {
            this.standard.methodPut<any>(url, form).subscribe(res => {
                callback(res.data);
            });
        } else {
            this.standard.methodPost<any>(url, form).subscribe(res => {
                callback(res.data);
            });
        }

    }
}
