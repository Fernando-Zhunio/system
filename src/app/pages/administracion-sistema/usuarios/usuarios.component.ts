import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { Ipagination } from '../../../interfaces/ipagination';
import { IuserSystem } from '../../../interfaces/iuser-system';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';

declare let Swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private s_standart:StandartSearchService,private snack_bar:MatSnackBar) { }
  displayedColumns: string[] = [
    "id",
    "name",
    "email",
    "companies",
    "roles",
    "last_activity",
    "acciones",
  ];
  @ViewChild(HeaderSearchComponent) headerComponent:HeaderSearchComponent;
  ELEMENT_DATA: IuserSystem[] = [];
  permission_create:any[] = ['super-admin','admin.users.create'];
  permission_edit:any[] = ['super-admin','admin.users.edit'];
  permission_destroy:any[] = ['super-admin','admin.users.destroy'];
  dataSource = new MatTableDataSource<IuserSystem>(this.ELEMENT_DATA);
  paginator:Ipagination<IuserSystem>;
  isload:boolean;

  ngOnInit(): void {
    // this.getUserServer();
  }

  users:IuserSystem[];
  getUserServer():void{
    this.s_standart.show('admin/users').subscribe((res:{success:boolean,data:Ipagination<IuserSystem>})=>{
      // console.log(res);
      // this.refreshDataTable(res.data.data);

    })
  }

  refreshDataTable(data) {
    let row: IuserSystem[] = data as IuserSystem[];
    console.log(row);
    this.ELEMENT_DATA = row;
    this.dataSource = new MatTableDataSource<IuserSystem>(this.ELEMENT_DATA);
  }

  //#region botones de acciones de usuario
  editItem(i):void{

  }

  deleteItem(id):void{
    // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: 'btn btn-success mr-1',
    //     cancelButton: 'btn btn-danger'
    //   },
    //   buttonsStyling: false
    // })
    SwalService.swalConfirmation("Eliminar","Esta seguro de que desea eliminar este usuario","warning").then((result) => {
      if (result.isConfirmed) {
        this.snack_bar.open("Eliminando usuario espere ...")
        this.s_standart.destory("admin/users/"+id).subscribe(res=>{
          if(res.hasOwnProperty("success") && res.success){
            this.snack_bar.open("Usuario Eliminado con exito","OK",{duration:2000});
            this.removeItemTable(id);
          }
          else{
            this.snack_bar.open("No se a podido eliminar ","Error",{duration:2000})
          }
        },err=>{
          console.log(err);
          this.snack_bar.open("No se a podido eliminar ","Error",{duration:2000})
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

        // swalWithBootstrapButtons.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    })
  }

  removeItemTable(id):void{
      let index = this.ELEMENT_DATA.findIndex(x=>x.id);
      this.ELEMENT_DATA.splice(index,1);
      // this.dataSource.data.splice(this.ELEMENT_DATA.indexOf(element),1);
      this.dataSource = new MatTableDataSource<IuserSystem>(this.ELEMENT_DATA);
  }

  //#endregion
  loadData($event):void{
    this.paginator = $event.data;
    console.log(this.paginator);
    this.refreshDataTable(this.paginator.data);
  }

  changePaginator(event):void{
    this.headerComponent.searchBar(event);
    console.log(event);

  }

}
