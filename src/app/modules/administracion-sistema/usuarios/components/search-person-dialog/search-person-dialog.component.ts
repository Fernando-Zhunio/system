import { Component } from '@angular/core';
import { LINK_IMAGE_LETTER } from '../../../../../class/fast-data';

@Component({
  selector: 'app-search-person-dialog',
  templateUrl: './search-person-dialog.component.html',
  styleUrls: ['./search-person-dialog.component.scss']
})
export class SearchPersonDialogComponent {

  urlLetter: string = LINK_IMAGE_LETTER;
  constructor() { }

}
