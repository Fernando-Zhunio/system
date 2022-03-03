import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrEdit } from '../../../../class/create-or-edit';
import { IPermission } from '../../../../interfaces/ipermission';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-create-or-edit-sidebar',
  templateUrl: './create-or-edit-sidebar.component.html',
  styleUrls: ['./create-or-edit-sidebar.component.css']
})
export class CreateOrEditSidebarComponent extends CreateOrEdit<any> implements OnInit {
  public title: string = 'Sidebar Item';
  public urlSave: any = 'admin/sidebar';
  urlPermission: string = 'admin/sidebar/permissions';
  loadCreate: boolean = false;
  permissions: Map<any, IPermission>;
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    url: new FormControl(null, [Validators.required]),
    icon: new FormControl(null, [Validators.required]),
    permission_id: new FormControl(null, [Validators.required]),
    // name: new FormControl(null, [Validators.required]),
  })
  constructor( router_activated: ActivatedRoute, private standard: StandartSearchService, router: Router) {
    super(router_activated, standard, router);
   }

  ngOnInit(): void {
    this.init(false);
    this.search();
  }


  search($event = null): void {
    console.log($event);
    const text_search = $event?.target?.value || '';
    this.standard.index(this.urlPermission + '?search=' + text_search).subscribe(res => {
      this.permissions = new Map<any, IPermission>(res.data.data.map((item: IPermission) => [item['id'], item]));
      console.log(this.permissions);
    });
  }

  AutoCompleteDisplay(item): string {
    console.log(this.permissions);
     return ` ${item?.description} - ${item?.name} `;
  }

  optionSelected($event) {
    this.form.get('permission_id').setValue($event.option.value.id);
  }

  setData(data): void {
    if (this.status === 'edit') {
      this.form.patchValue(data);
    }
  }

  go(): void {
    this.router.navigate(['/administracion-sistema/sidebar']);
  }

}
