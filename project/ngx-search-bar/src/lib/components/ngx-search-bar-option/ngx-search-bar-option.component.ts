import { Component, ElementRef, EventEmitter, Input, Output } from "@angular/core"

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "ngx-search-bar-option",
  templateUrl: "./ngx-search-bar-option.component.html",
  styleUrls: ["./ngx-search-bar-option.component.scss"],
})
export class NgxSearchBarOptionComponent {
  @Input() disabled = false
  @Input() value = null
  previousSelectedValue: any
  selected = false
  isSelectable = true
  constructor(private element: ElementRef) {
    // this.selected = false
    // this.previousSelectedValue = this.selected
  }
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onSelectionChange = new EventEmitter<NgxSearchBarSelectionChange>()

  emitSelectionChangeEvent(isUserInput = false): void {
    console.log("emitSelectionChangeEvent")
    this.onSelectionChange.emit(new NgxSearchBarSelectionChange(this, isUserInput))
  }

  toggle() {
    if (this.disabled) {
      return
    }
    if (this.value === this.previousSelectedValue && !this.isSelectable) {
      return
    }
    this.selected = !this.selected
    this.emitSelectionChangeEvent(true)
  }

  getLabel() {
    return this.element.nativeElement.textContent.trim()
  }

  getValue(): any {
    return this.value
  }

  

}

export class NgxSearchBarSelectionChange {
  constructor(public source: NgxSearchBarOptionComponent, public isUserInput = false) {}
}
