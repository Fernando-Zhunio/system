import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, forwardRef, Input, Output, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    CommonModule,
  ],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input-array',
  templateUrl: './input-array.component.html',
  styleUrls: ['./input-array.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputArrayComponent),
      multi: true
    }
  ]
})
export class InputArrayComponent implements ControlValueAccessor {

  @Input() label: string = '';
  arraySelect: any[] = [];
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  onChangeCb?: (select) => void;
  onTouchedCb?: () => void;
  isDisabled = false
  @Input() key: string | null = null;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
  writeValue(obj: any): void {
    this.arraySelect = obj;
    this.onChangeCb && this.onChangeCb( typeof this.key ? this.arraySelect.map(item => item[this.key!]) : this.arraySelect);
  }
  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  deleteItem(item: any, event) {
    event.stopPropagation();
    this.delete.emit(item);
  }
  

}
