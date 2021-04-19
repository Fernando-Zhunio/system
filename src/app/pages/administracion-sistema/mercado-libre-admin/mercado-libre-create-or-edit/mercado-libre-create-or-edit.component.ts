import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { observable, Observable } from "rxjs";
import { Icity } from "../../../../interfaces/iml-info";
import { StandartSearchService } from "../../../../services/standart-search.service";
import { SwalService } from "../../../../services/swal.service";
// var meli = require('mercadolibre');
// import * as meli from 'mercadolibre';

@Component({
  selector: "app-mercado-libre-create-or-edit",
  templateUrl: "./mercado-libre-create-or-edit.component.html",
  styleUrls: ["./mercado-libre-create-or-edit.component.css"],
})
export class MercadoLibreCreateOrEditComponent implements OnInit {
  constructor(
    private location: Location,
    private active_route: ActivatedRoute,
    private s_standart: StandartSearchService
  ) {}

  window_ml:any;
  window_ml2:any;
  // meliObject = new meli.Meli(client_id, client_secret, [access_token], [refresh_token]);
  // meliObject = new meli.Meli();

  form_ml: FormGroup = new FormGroup({
    status: new FormControl(null, [Validators.required]),
    user_name: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    user_id: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    server_code: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    access_token: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    refresh_token: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    city_id: new FormControl(null, [Validators.required]),
  });
  title: string = "Creando Cuenta de mercado libre";
  cities: any = {};
  companies: any[] = [];
  login_url: string;
  statuses: any = {};
  isLoad:boolean = false;
  id:number;
  state:'create'|'edit' = 'create';

  ngOnInit(): void {
    this.active_route.data.subscribe((data) => {
      if (data.isEdit) {
        this.state = "edit";
        this.title = "Editando Persona";
        this.id = Number.parseInt(
          this.active_route.snapshot.paramMap.get("id")
          );
        const url = "admin/ml/accounts/"+this.id+"/edit";
        // const url = "admin/people/" + id + "/edit";
        this.s_standart.show(url).subscribe((res) => {
          console.log(res);
          if (res.hasOwnProperty("success") && res.success) {
            this.cities = res.data.cities;
            this.companies = res.data.companies;
            this.statuses = res.data.statuses;
            this.companies = res.data.companies;
            this.login_url = res.data.login_url;
            this.isLoad = false;
            const {status,user_name,user_id,server_code,access_token,refresh_token,city_id} = res.data.account
            this.form_ml.setValue({status,user_name,user_id,server_code,access_token,refresh_token,city_id:city_id.toString()});
          }
        });
      } else {
        const url = "admin/ml/accounts/create";
        this.isLoad = true;
        this.s_standart.create(url).subscribe((res) => {
          if (res && res.hasOwnProperty("success") && res.success) {
            console.log(res);
            this.cities = res.data.cities;
            this.companies = res.data.companies;
            this.statuses = res.data.statuses;
            this.companies = res.data.companies;
            this.login_url = res.data.login_url;
            this.isLoad = false;
          } else {
            SwalService.swalToast(
              "A ocurrido un error, recarge la pagina",
              "error"
              );
            }
          });
      }
    });
  }

  observerWindow:Observable<boolean>;
  openDialog(): void {

    let w = 500,
      h = 600;
    var dualScreenLeft =
      window.screenLeft != undefined ? window.screenLeft : window.screenX;
    var dualScreenTop =
      window.screenTop != undefined ? window.screenTop : window.screenY;

    var width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    var height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    var left = width / 2 - w / 2 + dualScreenLeft;
    var top = height / 2 - h / 2 + dualScreenTop;
    // var retVals = { address: null, delivery: null };

     this.window_ml = window.open(
      this.login_url,
      "login ml",
      "scrollbars=yes, width=500, height=600, top=" + top + ", left=" + left
    );

    // console.log(this.window_ml);


    console.log(this.window_ml);
      this.window_ml.onunload = () =>{
      const urlOutHash = this.window_ml.location.href.replace('#','fz');
      console.log(urlOutHash);

      const url = new URL(urlOutHash);
      const params = new URLSearchParams(url.search);
      if(params.get('code')){
        this.isLoad = true;
        this.s_standart.show('admin/ml/accounts/callback?code='+params.get('code')).subscribe((res)=>{
          console.log(res);
          if(res && res.hasOwnProperty('success') && res.success){
            this.form_ml.get('user_name').setValue(res.data.user_name);
            this.form_ml.get('user_id').setValue(res.data.user_id);
            this.form_ml.get('server_code').setValue(res.data.server_code);
            this.form_ml.get('access_token').setValue(res.data.access_token);
            this.form_ml.get('refresh_token').setValue(res.data.refresh_token);
          }
          this.isLoad = false;
        },err=>this.isLoad = false)
      }
      console.log({url});
      console.log(params);

        //  if()
        //  var win = this.window_ml.opener;
        // //  console.log(win);
        // if (win.closed) {
        //   console.log('ventana cerrada');

        // }
        // else{
        //   console.log('no cerrada');

        // }
    };
    // this.window_ml.onload =  ()=> {
    //   // newWindow.RunCallbackFunction = myFunc;
    //   // alert('cargada');

    // };

    // window.execute_data('data')




    // window.closeWindow =  ()=> {
    // this.window_ml2 =   window.opener;
    //   window.opener.focus();
    //   window.close();

    // }


    // var RunCallbackFunction = function() { }; //reference holder only

    //to actually open the window..
    // var win = window.open("window.html");
    // newWindow.onload = function (data) {
    //   // newWindow.RunCallbackFunction = myFunc;
    //   alert(data);
    // };

    // // Puts focus on the newWindow
    // if (window.focus) {
    //   newWindow.focus();
    // }

    // let data;

    // window.opener.fun(data);
    // window.opener.focus();
    // window.close();
  }

  // GetMlLoginData(data): void {
  //   console.log(data);
  //   // $('[name=user_name]').val(data.user_name);
  //   // $('[name=user_id]').val(data.user_id);
  //   // $('[name=server_code]').val(data.server_code);
  //   // $('[name=access_token]').val(data.access_token);
  //   // $('[name=refresh_token]').val(data.refresh_token);
  // }

  saveInServer():void{
    if(this.form_ml.valid){
      this.isLoad = true;
      if(this.state == "create"){
        this.s_standart.store('admin/ml/accounts',this.form_ml.getRawValue()).subscribe(res=>{
          if(res && res.hasOwnProperty('success') && res.success){
            this.goBack();
          }
          this.isLoad = false;
        },err=>this.isLoad=false)
      }
      else if(this.state == "edit"){
        this.s_standart.updatePut('admin/ml/accounts/'+this.id,this.form_ml.getRawValue()).subscribe(res=>{
          if(res && res.hasOwnProperty('success') && res.success){
            this.goBack();
          }
          this.isLoad = false;
        },err=>this.isLoad=false)
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
