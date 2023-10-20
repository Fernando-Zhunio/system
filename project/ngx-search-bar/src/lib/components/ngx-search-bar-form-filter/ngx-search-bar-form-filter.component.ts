// import { NgxSearchBarFilterValue } from './../../interfaces/structures';
import { Component, ElementRef, Inject, Input, ViewChild } from "@angular/core"
import { FormGroup } from "@angular/forms"
import { empty } from "../../utils/empty"
import { NGX_SEARCH_BAR_DATA, NgxSearchBarProvider } from "../../utils/DATA_FOR_SEARCH_BAR"
// import { NgxSearchBarComponent } from '../ngx-search-bar/ngx-search-bar.component';
import { Location } from "@angular/common"
import { animate, style, transition, trigger } from "@angular/animations"
import { NgxSearchBarService } from "../../ngx-search-bar.service"

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "ngx-search-bar-form-filter",
  templateUrl: "./ngx-search-bar-form-filter.component.html",
  styleUrls: ["./ngx-search-bar-form-filter.component.scss"],
  animations: [
    trigger("openOrCloseFilter", [
      transition(":enter", [
        style({ transform: "translateY(-50px)", opacity: 0 }),
        animate("300ms", style({ transform: "translateY(0)", opacity: 1 })),
      ]),
      transition(":leave", [
        animate("300ms", style({ transform: "translateY(-50px)", opacity: 0, background: "inherit" })),
      ]),
    ]),
  ],
})
export class NgxSearchBarFormFilterComponent {
  @ViewChild("dropDownFilter", { static: false }) dropDownFilterElement: ElementRef
  @Input() filters: FormGroup;
  @Input() textBtnApply!: string;
  @Input() textBtnClose!: string;
  @Input() withParamsClean: boolean = false;
  // @Input() customBtnApplyFilter: { text?: string; class?: string; color?: string; icon?: string } | null = null;
  @Input() classPanel: string;
  private filtersSend: { [key: string]: any } | null = null;
  classPosition: string = "";
  isOpenFilter = false;
  numberFilter = 0;

  private id!: Symbol

  constructor(
    protected location: Location,
    private service: NgxSearchBarService,
    @Inject(NGX_SEARCH_BAR_DATA) public dataInject: NgxSearchBarProvider
  ) {
    // if (!this.customBtnApplyFilter) {
    //   this.customBtnApplyFilter = this.dataInject?.OPTIONS?.customBtnApplyFilter || {
    //     text: "Aplicar Filtros",
    //     class: "",
    //     color: "accent",
    //     icon: "done",
    //   }
    // }
    if (!this.textBtnApply) {
      this.textBtnApply = this.dataInject?.OPTIONS_FILTERS?.textButtons?.apply || "Apply Filters";
    }
    if (!this.textBtnClose) {
      this.textBtnClose = this.dataInject?.OPTIONS_FILTERS?.textButtons?.cancel || "Close Filters";
    }
  }

  setId(id: Symbol) {
    this.id = id
  }

  applyFilters() {
    this.filtersSend = this.filterVerified()
    this.isOpenFilter = false
    this.search()
  }

  search() {
    this.service.setParamsForm(this.id, this.filtersSend)
    this.service.searchApply(this.id)
  }

  getFilter(): { [key: string]: any } | null {
    return this.filtersSend
  }

  removeQueryParam(key: string) {
    this.filters.get(key)?.setValue(null)
    this.search()
  }

  calculePosition() {
    const containerFilter = (this.dropDownFilterElement as ElementRef).nativeElement as HTMLElement
    const btn = document.querySelector(".nsb-content-input-search") as HTMLElement
    const dropdownRect = btn.getBoundingClientRect()
    const spaceAbove = dropdownRect.top
    const spaceBelow = window.innerHeight - dropdownRect.bottom

    const height = btn?.["offsetHeight"] || 44
    console.log({ spaceAbove, spaceBelow })
    if (spaceBelow > spaceAbove) {
      containerFilter.style.top = `${height}px`
      containerFilter.style.bottom = "auto"
      containerFilter.style.maxHeight = `${spaceBelow}px`
    } else {
      containerFilter.style.top = "auto"
      containerFilter.style.bottom = `${height}px`
      containerFilter.style.maxHeight = `${spaceAbove}px`
    }
  }

  filterVerified(): { [key: string]: any } | null {
    const filters = this.filters.value
    const filtersOverride = {}
    this.numberFilter = 0
    for (const key in filters) {
      if (!empty(filters[key])) {
        this.numberFilter++
        filtersOverride[key] = filters[key]
      }
    }
  
    this.filtersSend = this.withParamsClean ? filtersOverride: this.filters.value
    return this.filtersSend
  }

  loadFilters() {
    const form = this.service.queryParams.form
    if (!form) {
      this.numberFilter = 0
      return
    }
    Object.keys(form).forEach((key) => {
      if (!empty(form[key])) {
        this.numberFilter++;
      }
    })
    this.filters.patchValue(form)
    // const values = this.filters.value
    // Object.keys(values).forEach((key) => {
    //   if (empty(values[key])) {
    //     return;
    //   }
    // this.buttonsFilters.set(key, this.filters.controls[key].value);
    // })
  }

  getFormFilters(): FormGroup {
    return this.filters
  }

  openFilter() {
    this.isOpenFilter = !this.isOpenFilter
    if (this.isOpenFilter) {
      this.calculePosition()
    }
  }
}
