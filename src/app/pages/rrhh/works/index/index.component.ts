import { Component, OnInit } from '@angular/core';
import { CTemplateSearch } from './../../../../class/ctemplate-search';
import { Iwork } from '../../../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { SwalService } from '../../../../services/swal.service';
import { StandartSearchService } from './../../../../services/standart-search.service';
import { animation_conditional } from '../../../../animations/animate_leave_enter';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  animations: animation_conditional

})
export class IndexComponent extends CTemplateSearch<Iwork> implements OnInit {
  constructor(private s_serviceStandart: StandartSearchService) {
    super();
  }

  url: string = 'rrhh/works';

  ngOnInit(): void {}

  deleteWork(id: number) {
    const work = this.products.find((x) => x.id === id);
    SwalService.swalConfirmation(
      'Eliminacion Empleo',
      '¿Está seguro de eliminar este Empleo?',
      'question',
      'Si, eliminar',
      'No, cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
    work['isload'] = true;
        this.s_serviceStandart
          .destory(`rrhh/works/${work.id}`)
          .subscribe((res) => {
    work['isload'] = false;
            if (res && res.hasOwnProperty('success') && res.success) {
              const index = this.products.findIndex(
                (i) => i.id == id
              );
              this.products.splice(index, 1);
            }
          }, (err) => {work['isload'] = false;});
      }
    });
  }


}
