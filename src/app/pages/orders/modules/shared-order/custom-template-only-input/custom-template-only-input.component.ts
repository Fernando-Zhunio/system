import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-custom-template-only-input',
  templateUrl: './custom-template-only-input.component.html',
  styleUrls: ['./custom-template-only-input.component.scss']
})
export class CustomTemplateOnlyInputComponent {

  constructor(private standard: StandartSearchService) { }
  @Input() isCancelled: boolean;
  @Input() permissions: {create:string, destroy: string};
  @Input() path: string;
  @Input() title: string;
  @Input() placeholder: string;
  @Input() customInputName = 'doc_id';
  @Input() formControl = new FormControl(null, [Validators.required]);
  @Output() changeOrder = new EventEmitter<any>();

  isOpenAddInvoice = false;
  isLoading = false;

  addManually(): void {
    if (this.formControl.valid) {
      this.isLoading = true;
      this.standard.methodPost(this.path, { [this.customInputName]: this.formControl.value }).subscribe(
        (response: any) => {
          if (response.success) {
            this.changeOrder.emit('invoice');
            this.isOpenAddInvoice = false;
            this.formControl.reset();
          }
          this.isLoading = false;
        }, () => {
          this.isLoading = false;
        }
      );
    }
  }

  unlink(): void {
    this.isLoading = true;
    this.standard.methodPost(this.path, { [this.customInputName]: null }).subscribe(
      (response: any) => {
        if (response.success) {
          this.changeOrder.emit('invoice');
          this.isOpenAddInvoice = false;
          this.formControl.reset();
        }
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      }
    );
  }

}
