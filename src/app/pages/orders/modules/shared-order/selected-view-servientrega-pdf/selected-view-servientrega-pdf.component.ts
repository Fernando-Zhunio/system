import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-selected-view-servientrega-pdf',
  templateUrl: './selected-view-servientrega-pdf.component.html',
  styleUrls: ['./selected-view-servientrega-pdf.component.scss']
})
export class SelectedViewServientregaPdfComponent implements OnInit {

  constructor( private btnRef: MatBottomSheetRef<SelectedViewServientregaPdfComponent>) { }
  isManifest = false;
  formDate = new FormControl(null);
  ngOnInit() {
  }

  selectedView(event: MatSelectionListChange): void {
    const viewSelect = event.options[0].value;
    if ( viewSelect === 'manifest') {
      this.isManifest = true;
      return;
    }
    this.btnRef.dismiss(viewSelect);
  }

  selectedManifest(): void {
    if (this.formDate.value) {
      this.btnRef.dismiss(this.formDate.value);
    }
  }

}
