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
  @Input() appearance: string;
  @Input() items: any[] = [];
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  onChangeCb?: (select) => void;
  onTouchedCb?: () => void;
  isDisabled = false
  @Input() key: string | null = null;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
  writeValue(obj: any): void {
    console.log(obj);
    this.items = this.items.filter(item => obj.includes(item[this.key!]));
    this.onChangeCb && this.onChangeCb( this.key ? this.items.map(item => item[this.key!]) : this.items);
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
    const itemIndex = this.items.findIndex((x: any) => x[this.key!] === item[this.key!]);
    this.items.splice(itemIndex, 1);
    this.onChangeCb && this.onChangeCb(this.key ? this.items.map(item => item[this.key!]) : this.items);
  }
}
