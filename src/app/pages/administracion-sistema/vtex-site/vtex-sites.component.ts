import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StandartSearchService } from '../../../services/standart-search.service';
import { IvtexSite } from '../../../interfaces/vtex/ivtex-site';
import { SwalService } from './../../../services/swal.service';

@Component({
  selector: 'app-vtex-sites',
  templateUrl: './vtex-sites.component.html',
  styleUrls: ['./vtex-sites.component.css'],
})
export class VtexSitesComponent implements OnInit {
  constructor(
    private s_standart: StandartSearchService,
    private router: Router
  ) {}

  vtexSites: IvtexSite[] = [];
  isload: boolean = false;
  ngOnInit(): void {
    this.loadSitesVtex();
  }

  loadSitesVtex(): void {
    this.isload = true;
    this.s_standart.index('admin/vtex').subscribe((res) => {
      console.log(res);
      if (res && res.hasOwnProperty('success') && res.success) {
        this.vtexSites = res.data;
        console.log(this.vtexSites);
      }
      this.isload = false;
    });
  }

  goCreateVtexSites(): void {
    this.router.navigate(['/administracion-sistema/vtex-sites/create']);
  }

  deleteVtexSite(id): void {
    console.log(id);
    SwalService.swalConfirmation(
      'Eliminar',
      '¿Está seguro de eliminar este sitio?',
      'warning'
    )
      .then((result) => {
        if (result.isConfirmed) {
          this.s_standart
            .destory('admin/vtex/' + id)
            .subscribe((res) => {
              console.log(res);
              if (res && res.hasOwnProperty('success') && res.success) {
                const indexSite = this.vtexSites.findIndex(x => x.id === id);
                if (indexSite > -1) {
                  this.vtexSites.splice(indexSite, 1);
                }
              }
            });
        }
      })
      .catch(() => {});
  }
}
