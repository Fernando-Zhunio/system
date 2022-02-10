import { AbstractControl, Validators } from '@angular/forms';

export function requiredIf(item) {
    return (control: AbstractControl): { [key: string]: any } => {
        const isRequired = control.parent.get(item).value;
        if (isRequired) {
            return Validators.required(control);
        }
        return null;
    };
}
