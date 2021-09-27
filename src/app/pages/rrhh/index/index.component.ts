import { Component, OnInit } from "@angular/core";
import { StandartSearchService } from "../../../services/standart-search.service";

enum EnumStatus {
  //TIPOS DE ESTADOS
  // TYPE_WORK = 'work',
  // TYPE_REQUEST = 'request',

  // //ACCIONES DE TRABAJO
  ACTION_WORK_AVAILABLE = 'work_available',
  ACTION_WORK_EXPIRED = 'work_expired',

  //ACCIONES DE SOLICITUDES
  ACTION_REQUEST_SENDED = "request_sended",
  ACTION_REQUEST_ACEPTED = "request_acepted",
  ACTION_REQUEST_REJECTED = "request_rejected",
}
@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"],
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
    request_sended: { name: "enviada", count: 0 },
    request_acepted: { name: "aceptada", count: 0 },
    request_rejected: { name: "rechazada", count: 0 },
  };
  statesWorkCount: object = {
    work_available: { name: "disponible", count: 0 },
    work_expired: { name: "expirada", count: 0 },
  };
  bestRequestsCount =[];


  ngOnInit(): void {
    this.s_standart.show("rrhh/dashboard").subscribe((response) => {
      if (response.hasOwnProperty("data")) {
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
