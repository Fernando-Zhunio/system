import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cperson } from '../../../class/cperson';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { Ipagination } from '../../../interfaces/ipagination';
import { IpermissionStandart } from '../../../interfaces/ipermission-standart';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css'],
})
export class PersonasComponent implements OnInit {
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  peoples: Cperson[] = [];
  isload: boolean = false;
  paginator: Ipagination<Cperson>;

  constructor(
    private router_active: ActivatedRoute,
    private s_standart: StandartSearchService
  ) {}

  permissions: IpermissionStandart;
  ngOnInit(): void {
    this.router_active.data.subscribe((res) => {
      this.permissions = res.permissions.all;
    });
  }

  deletePerson(id): void {
    SwalService.swalConfirmation(
      'Eliminar Item',
      'Seguro que desea eliminar este item',
      'warning'
    ).then((res) => {
      if (res.isConfirmed) {
        this.s_standart.destory('admin/people/' + id).subscribe((res) => {
          if (res.hasOwnProperty('success') && res.success) {
            const index_for_delete = this.peoples.findIndex((x) => x.id == id);
            if (index_for_delete != -1) {
              this.peoples.splice(index_for_delete, 1);
            }
          }
        });
      }
    });
  }

  loadData($event): void {
    this.paginator = $event.data;
    this.peoples = this.paginator.data;
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }
}
