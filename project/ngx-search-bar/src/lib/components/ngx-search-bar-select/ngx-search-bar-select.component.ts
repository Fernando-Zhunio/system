import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  forwardRef,
} from "@angular/core"
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import {
  NgxSearchBarOptionComponent,
  NgxSearchBarSelectionChange,
} from "../ngx-search-bar-option/ngx-search-bar-option.component"
import { Subscription, merge, startWith, switchMap } from "rxjs"
import { calcPositionDropdown } from "../../../../../../src/app/shared/class/tools"
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "ngx-search-bar-select",
  templateUrl: "./ngx-search-bar-select.component.html",
  styleUrls: ["./ngx-search-bar-select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxSearchBarSelectComponent),
      multi: true,
    },
  ],
})
export class NgxSearchBarSelectComponent implements ControlValueAccessor, AfterViewInit, AfterContentInit {
  @ContentChildren(NgxSearchBarOptionComponent) options: QueryList<NgxSearchBarOptionComponent>
  @ViewChild("triggerSelect") triggerSelect: ElementRef
  @ViewChild("selectItems") selectItems: ElementRef
  constructor() {}
  @Input() placeholder: string = "Select"
  @Input() multi = false
  @Input() tabindex = 1

  // selected: NgxSearchBarOptionComponent | null = null

  label: any = null

  isDisabled = false
  isShowOptions = false

  toggleSelect() {
    if (this.isDisabled) {
      return;
    }
    if (this.multi && this.isShowOptions) {
      return;
    }
    this.isShowOptions = !this.isShowOptions
    calcPositionDropdown(this.triggerSelect.nativeElement, this.selectItems.nativeElement, 5)
  }

  onChange?: (item: any) => void

  onTouchedCb?: () => void

  writeValue(obj: any): void {
    if (!obj) {
      this.label = null
      this.onChange?.(null)
      return
    }
    if (this.multi) {
      this.valuesMulti = new Map(obj.map((item) => [item, true]));
      this.onChange?.(obj || [])
      this.options.forEach((option) => {
        option.selected = this.valuesMulti.has(option.value)
        if (option.selected) {
          this.valuesMulti.set(option.value, option.getLabel())
        }
      })
      this.label = Array.from(this.valuesMulti.values()).join(", ")
      return
    }
    this.label = this.options.find((option) => option.value === obj)?.getLabel()
    this.onChange?.(obj)
  }

  setValue(value: any): void {
    this.onChange?.(value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }

  close() {
    this.isShowOptions = false
  }

  ngAfterViewInit() {
    this._optionSubscription = this.options.changes
      .pipe(
        startWith(this.options),
        switchMap((options: QueryList<NgxSearchBarOptionComponent>) => {
          console.log(options, "options")
          return merge(...this.options.map((option) => option.onSelectionChange))
        })
      )
      .subscribe((event: NgxSearchBarSelectionChange) => {
        console.log(event, "event")
        this.onSelect(event.source, event.isUserInput)
      })
  }

  ngAfterContentInit() {
    console.log(this.options, "ngAfterContentInit")
  }

  _optionSubscription: Subscription
  valuesMulti = new Map();

  onSelect(option: NgxSearchBarOptionComponent, isUserInput: boolean): void {
    if (!isUserInput) {
      return
    }
    this.setValueChange(option)
  }

  setValueChange(option: NgxSearchBarOptionComponent) {
    if (this.multi) {
      if (this.valuesMulti.has(option.value)) {
        this.valuesMulti.delete(option.value)
      } else {
        this.valuesMulti.set(option.value, option.getLabel())
      }
      this.onChange?.(Array.from(this.valuesMulti.keys()))
      this.label = Array.from(this.valuesMulti.values()).join(", ")
      return
    }
    this.label = option.getLabel()
    this.onChange?.(option.value)
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
