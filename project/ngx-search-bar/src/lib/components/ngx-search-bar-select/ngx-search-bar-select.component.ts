import { AfterViewInit, Component, HostListener, Input, QueryList, ViewChildren, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxSearchBarOptionComponent, NgxSearchBarSelectionChange } from '../ngx-search-bar-option/ngx-search-bar-option.component';
import { Subscription, merge, startWith, switchMap  } from 'rxjs';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-search-bar-select',
  templateUrl: './ngx-search-bar-select.component.html',
  styleUrls: ['./ngx-search-bar-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxSearchBarSelectComponent),
      multi: true,
    },
  ],
})
export class NgxSearchBarSelectComponent implements ControlValueAccessor, AfterViewInit {

  // @ViewChild('ngxsbselect') element: ElementRef;
  @ViewChildren(NgxSearchBarOptionComponent) options: QueryList<NgxSearchBarOptionComponent>;
  constructor() { }
  @Input() placeholder: string = 'Select';
  
  selected: NgxSearchBarOptionComponent | null  = null;

  get _label () {
    return this.selected?.getLabel();
  }

  isDisabled = false;
  isShowOptions = false;
  @HostListener('document:click', ['$event'])
  onOutsideClick(_event: Event) {
    // if (!this.getElement().contains(event.target)) {
    //   this.isShowOptions = false;
    // }
  }

  toggleSelect() {
    this.isShowOptions = !this.isShowOptions;
  }

  onChange?: (item: any) => void;

  onTouchedCb?: () => void;

  writeValue(obj: any): void {
    if (!obj) {

      // this.setElementHtml(this.placeholder);
      this.selected = null;
      return;
    }
  }

  setValue(value: any): void {
    this.onChange?.(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // getSelectedValue(event): any {
  //   let option = event.target.closest('[data-option]');
  //   if (!option) return;
  //   let value = option.getAttribute('data-option');
  //   let htmlSelect = option.querySelector('div:first-child');
  //   this.setElementHtml(htmlSelect.innerHTML);
  //   this.onChange?.(value);
  // }

  // getElement(): any {
  //   return this.element.nativeElement;
  // }
  // setElementHtml(html: any): any {
  //   this.element.nativeElement.innerHTML = html;
  // }

  _optionSubscription: Subscription;
  private listenToOptions() {
    this._optionSubscription = this.options.changes.pipe(
      // map(_res => {console.log('fer'); return this.options}),
      startWith(this.options),
      switchMap((options: QueryList<NgxSearchBarOptionComponent>) => {
        console.log(options, 'options');
        return merge(...options.map(option => option.onSelectionChange));
      })).
      subscribe((event: NgxSearchBarSelectionChange) => {
        console.log(event, 'listenToOptions');
        // this.onSelect(event.source, event.isUserInput);
      })

  }
  
  ngAfterViewInit() {
    this.listenToOptions();
  }

  onSelect(option: NgxSearchBarOptionComponent, isUserInput: boolean): void {
    if (isUserInput) {
      this.selected = option;
      // this.setElementHtml(option.getLabel());
    }
  }
}


// export class SelectionModel<T> {
//   private _model = new Set<T>();
//   private _selected = new BehaviorSubject<ReadonlySet<T>>(this._model);

//   constructor(private _multiple = false, initiallySelectedValues?: T[]) {
//     if (initiallySelectedValues && initiallySelectedValues.length) {
//       if (this._multiple) {
//         initiallySelectedValues.forEach(value => this._model.add(value));
//       } else {
//         this._model.add(initiallySelectedValues[0]);
//       }
//     }
//   }

//   get selected(): Observable<ReadonlySet<T>> {
//     return this._selected.asObservable();
//   }

//   get isEmpty(): boolean {
//     return this._model.size === 0;
//   }

//   get hasValue(): boolean {
//     return !this.isEmpty;
//   }

//   isSelected(value: T): boolean {
//     return this._model.has(value);
//   }

//   select(...values: T[]): void {
//     this._verifyValueAssignment(values);
//     values.forEach(value => this._model.add(value));
//     this._emitChangeEvent();
//   }

//   deselect(...values: T[]): void {
//     this._verifyValueAssignment(values);
//     values.forEach(value => this._model.delete(value));
//     this._emitChangeEvent();
//   }

//   toggle(value: T): void {
//     this.isSelected(value) ? this.deselect(value) : this.select(value);
//   }

//   clear(): void {
//     this._model.clear();
//     this._emitChangeEvent();
//   }

//   selectAll(filteredValues: T[]): void {
//     filteredValues.forEach(value => this._model.add(value));
//     this._emitChangeEvent();
//   }

//   _updateOptions(options: T[], compareWith: (o1: T, o2: T) => boolean): void {
//     const previousSelectedValues = this.selectedValue;
//     this._model.clear();

//     if (this._multiple) {
//       const newSelectedValues = options.filter(option => previousSelectedValues.has(option));
//       this._model = new Set(newSelectedValues);
//     } else {
//       const isSelected = (value: T) => compareWith(value, previousSelectedValues);
//       const newSelectedValues = options.find(isSelected);

//       if (newSelectedValues) {
//         this._model.add(newSelectedValues);
//       }
//     }

//     this._emitChangeEvent();
//   }

//   private _verifyValueAssignment(values: T[]): void {
//     if (!this._multiple && values.length > 1) {
//       throw Error('Cannot assign multiple values to a single selection model');
//     }
//   }

//   private _emitChangeEvent(): void {
//     this._selected.next(this._model);
//   }

//   private get selectedValue(): Set<T> {
//     return new Set(this._model);
//   }
// }