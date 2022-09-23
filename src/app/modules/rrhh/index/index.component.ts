import { Component, OnInit } from '@angular/core';
import { StandartSearchService } from '../../../services/standart-search.service';

enum EnumStatus {
  // //ACCIONES DE TRABAJO
  ACTION_WORK_AVAILABLE = 'work_available',
  ACTION_WORK_EXPIRED = 'work_expired',

  // ACCIONES DE SOLICITUDES
  ACTION_REQUEST_POSTULATE = 'request_postulate',
  ACTION_REQUEST_CV_VIEWED = 'request_cv_viewed',
  ACTION_REQUEST_IN_PROCESS = 'request_in_process',
  ACTION_REQUEST_FINALIST = 'request_finalist'
}
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor(private s_standart: StandartSearchService) {}

  enumStatus = EnumStatus;
  requests = [];
  userCount = 0;
  workCount = 0;
  requestCount = 0;
  cvCount = 0;
  statesRequestCount: object = {
    request_postulate: { name: 'Postulado', count: 0 },
    request_cv_viewed: { name: 'Cv visto', count: 0 },
    request_in_process: { name: 'En proceso', count: 0 },
    request_finalist: { name: 'FInalista', count: 0 },
  };
  statesWorkCount: object = {
    work_available: { name: 'disponible', count: 0 },
    work_expired: { name: 'expirada', count: 0 },
  };
  bestRequestsCount = [];


  ngOnInit(): void {
    this.s_standart.show('rrhh/dashboard').subscribe((response) => {
      if (response.hasOwnProperty('data')) {
        this.requests = response.data.request;
        this.userCount = response.data.user_count;
        this.workCount = response.data.work_count;
        this.requestCount = response.data.request_count;
        this.cvCount = response.data.cv_count;
        response.data.states_request.map((value) => {
          this.statesRequestCount[value.type_action] = {
            name: value.name,
            count: value.count,
          };
        });
        response.data.states_work.map((value) => {
          this.statesWorkCount[value.type_action] = {
            name: value.name,
            count: value.count,
          };
        });
        this.bestRequestsCount = response.data.best_requests_count;
      }

    });
  }
}
