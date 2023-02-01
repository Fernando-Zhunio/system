import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IvtexSite } from '../../../../../interfaces/vtex/ivtex-site';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { SwalService } from '../../../../../services/swal.service';

@Component({
  selector: 'app-vtex-sites',
  templateUrl: './index-vtex-sites.component.html',
  styleUrls: ['./index-vtex-sites.component.css'],
})
export class IndexVtexSitesComponent implements OnInit {
  constructor(
    private methodsHttp: MethodsHttpService,
    private router: Router
  ) {}

  vtexSites: IvtexSite[] = [];
  isLoading: boolean = false;
  ngOnInit(): void {
    this.loadSitesVtex();
  }

  loadSitesVtex(): void {
    this.isLoading = true;
    this.methodsHttp.methodGet('admin/vtex').subscribe((res) => {
      if (res?.success) {
        this.vtexSites = res.data;
      }
      this.isLoading = false;
    });
  }

  goCreateVtexSites(): void {
    this.router.navigate(['/administracion-sistema/vtex-sites/create']);
  }

  deleteVtexSite(id): void {
    SwalService.swalConfirmation(
      'Eliminar',
      '¿Está seguro de eliminar este sitio?',
      'warning'
    )
      .then((result) => {
        if (result.isConfirmed) {
          this.methodsHttp
            .methodDelete('admin/vtex/' + id)
            .subscribe((res) => {
              if (res?.success) {
                const indexSite = this.vtexSites.findIndex(x => x.id === id);
                if (indexSite > -1) {
                  this.vtexSites.splice(indexSite, 1);
                }
              }
            });
        }
      });
  }
}
