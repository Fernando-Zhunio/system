import { CommonModule } from '@angular/common';
import { Component, Optional, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { animation_conditional } from '../../../animations/animate_leave_enter';
import { SimpleSearchDialogRef } from './simple-search-dialog-ref';
import { ResponsePaginateApi } from '../../interfaces/response-api';
import { SimpleSearchSelectorDialogData } from './simple-search-selector.service';
import { NgxSearchBarModule } from '../../../../../project/ngx-search-bar/src/public-api';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    NgxSearchBarModule,
  ],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.scss'],
  animations: animation_conditional
})
export class SimpleSearchComponent {

  itemsSelected: Map<number, any> = new Map<number, any>();
  optionTemplate: TemplateRef<any>;
  key: string = 'id';
  items: Map<number, any> = new Map<number, any>();

  constructor(
    private componentRef: SimpleSearchDialogRef,
    @Optional() public dialogData: SimpleSearchSelectorDialogData
  ) {
    if (dialogData?.itemTemplateRef) {
      this.optionTemplate = dialogData.itemTemplateRef;
    }
    if (dialogData?.currentItemSelect) {
      this.itemsSelected = new Map(dialogData.currentItemSelect.map((item: any) => [item[this.key], item]));
    }
    if (dialogData?.key) {
      this.key = dialogData.key;
    }
  }

  getData(data: ResponsePaginateApi<any>) {
    this.items = new Map(data.data.data.map((item: any) => [item[this.key], item]));
  }

  addItem(key) {
    if (this.dialogData.isMultiSelection) {
      this.itemsSelected.set(key, this.items.get(key));
    } else {
      this.close(this.items.get(key));
    }
  }

  removeItem(key) {
    this.itemsSelected.delete(key);
  }

  close(data: any = null) {
    if (data) {
      this.componentRef.close({ data });
      return;
    }
    if (this.dialogData.isMultiSelection && this.itemsSelected.size > 0) {
      this.componentRef.close({ data: this.convertMapToArray(this.itemsSelected) });
      return;
    }
    this.componentRef.close();
  }

  closeClean(): void {
    this.componentRef.close();
  }

  convertMapToArray(map: Map<number, any>) {
    return Array.from(map.values());
  }

}
