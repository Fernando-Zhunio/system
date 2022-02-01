import { Component, Inject, OnInit } from '@angular/core';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { EProviderActions } from '../../../enums/eprovider-actions.enum';

@Component({
  selector: 'app-action-provider',
  templateUrl: './action-provider.component.html',
  styleUrls: ['./action-provider.component.css']
})
export class ActionProviderComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private sheet:MatBottomSheetRef) { }

  
  ngOnInit(): void {
  }

  createProvider():void{
    this.sheet.dismiss(EProviderActions.create_provider);
  }

  createContact():void{
    this.sheet.dismiss(EProviderActions.create_contact);
  }

  viewContact():void{
    this.sheet.dismiss(EProviderActions.view_contact);
  }

  deleteProvider():void{
    this.sheet.dismiss(EProviderActions.delete_provider);
  }

  editProvider():void{
    this.sheet.dismiss(EProviderActions.edit_provider);
  }

}
