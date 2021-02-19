import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EProviderActions } from "../../../enums/eprovider-actions.enum";
import { Icontact } from "../../../interfaces/Imports/invoice-item";

@Component({
  selector: "app-create-provider-or-contact",
  templateUrl: "./create-provider-or-contact.component.html",
  styleUrls: ["./create-provider-or-contact.component.css"],
})
export class CreateProviderOrContactComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<CreateProviderOrContactComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      isProvider: boolean;
      state?: EProviderActions;
      form_data: any;
    }
  ) {}
  enum_action_provider = EProviderActions;
  contacts: Icontact[] = [];
  provider_name:string;
  state: EProviderActions = EProviderActions.create_provider;
  formProvider: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    website: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    country_id: new FormControl(null, [Validators.required]),
  });

  formContact: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    position: new FormControl(null, [Validators.required]),
    id: new FormControl(null)
  });

  ngOnInit(): void {
    if (this.data.hasOwnProperty("state")) {
      this.state = this.data.state;
      console.log(this.state,this.enum_action_provider.edit_provider);
      console.log(this.state == this.enum_action_provider.create_provider || this.state == this.enum_action_provider.edit_provider);
      
      switch (this.state) {
        case EProviderActions.edit_provider:
          const {
            name,
            phone,
            email,
            website,
            address,
            city,
            country_id,
          } = this.data.form_data;
          this.formProvider.setValue({
            name,
            phone,
            email,
            website,
            address,
            city,
            country_id,
          });
          break;
        case EProviderActions.view_contact:
          this.contacts = this.data.form_data.contacts;
          this.provider_name = this.data.form_data.name_provider;
          break;
        default:
          break;
      }
      // if(this.state == EProviderActions.edit_provider){
      //   if(this.data.isProvider){

      //   }else{
      //     const {name,phone,email,position} = this.data.form_data;
      //     this.formContact.setValue({name,phone,email,position})
      //   }
      // }
    }
  }

  closeDialogProviderCreate(): void {
    // if (this.data.isProvider) {
      if (this.formProvider.valid) {
        this.dialogRef.close({ success: true, data: this.formProvider.value });
      }
    // }
  }

  closeDialogContactCreate(option): void {
    // if (!this.data.isProvider) {
      if (this.formContact.valid) {
        if(this.state == this.enum_action_provider.create_contact){
          this.dialogRef.close({
            success: true,
            option,
            data: this.formContact.value,
          });
        }
        else if(this.state == this.enum_action_provider.edit_contact){
          this.dialogRef.close({
            success: true,
            action:this.enum_action_provider.edit_contact,
            data: this.formContact.value,  
          }); 
        }
      }
    // }
  }

  editContact(id):void{
    const index = this.contacts.findIndex(x=>x.id == id);
    if(index !== -1){
      const {id,name,phone,email,position} = this.contacts[index];
      this.formContact.setValue({id,name,phone,email,position})
      this.state = EProviderActions.edit_contact;
    }
  }

  deleteContact(id){
    const index = this.contacts.findIndex(x=>x.id == id);
    if(index !== -1){
      const {id,name,phone,email,position} = this.contacts[index];
      this.dialogRef.close({
        success: true,
        action:this.enum_action_provider.delete_contact,
        data:{id,name,phone,email,position},  
      });
      // this.formContact.setValue({id,name,phone,email,position});
    }
  }
}
