import { FormControl, FormGroup } from "@angular/forms";

export interface SimpleInputDialogData {
    title: string;
    structs: SimpleInputDialogStruct[],
    method?: 'post' | 'put',
    url: string,
    callbackFillForm?: (response, form: FormGroup) => void,
    isGetData?: boolean,
}

export interface SimpleInputDialogStruct{
        name: string;
        formControl: FormControl;
        label: string;
        labelError?: string;
        type?: 'input' | 'textarea',
        placeholder?: string,
    }
