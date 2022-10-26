import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-campaign-dialog',
  templateUrl: './search-campaign-dialog.component.html',
  styleUrls: ['./search-campaign-dialog.component.scss']
})
export class SearchCampaignDialogComponent  {

  @Input() url: string;
  @Input() campaign: Map<number, any> = new Map<number, any>();
  @Input() onlyOne: boolean = false;
  constructor() { }


}
