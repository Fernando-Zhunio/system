import { Component, Inject, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { Observable } from "rxjs"
import { IChatbot } from "../../../../../interfaces/ichatbot"
import { MethodsHttpService } from "../../../../../services/methods-http.service"
import { SharedService } from "../../../../../services/shared/shared.service"
import { SwalService } from "../../../../../services/swal.service"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"

@Component({
  selector: "app-chat-bots-create-or-edit",
  templateUrl: "./dialog-chat-bots-create-or-edit.component.html",
  styleUrls: ["./dialog-chat-bots-create-or-edit.component.css"],
})
export class ChatBotsCreateOrEditComponent implements OnInit {
  public urlSave: string = "admin/chatbot"
  isLoading: boolean = false
  status: "create" | "edit" = "create"

  constructor(
    protected act_router: ActivatedRoute,
    protected methodsHttp: MethodsHttpService,
    @Inject(MAT_DIALOG_DATA) public data: IChatbot,
    private dialogRef: MatDialogRef<ChatBotsCreateOrEditComponent>,
    protected router: Router
  ) {}

  title: string = "Chatbot"
  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
  })
  img: { file: File | null; base64: string | null } = { file: null, base64: "assets/img/img_not_available.png" }

  ngOnInit(): void {
    if (this.data) {
      this.form.get("name")?.setValue(this.data.info.name)
      this.img.base64 = this.data.info.photo || "assets/img/img_not_available.png"
    }
  }

  getBase64(event): void {
    this.img.file = event.target.files[0]
    this.img.base64 = SharedService.getBase64(event, this.callbackImg.bind(this))
  }

  callbackImg(e): void {
    this.img.base64 = e.srcElement.result
  }

  removeImg(): void {
    this.img = { file: null, base64: "assets/img/img_not_available.png" }
  }

  getDataForSendServer() {
    let formData: FormData = new FormData()
    if (this.form.valid) {
      if (this.img.base64 && this.img.file) {
        formData.append("photo", this.img.file)
      }
      formData.append("name", this.form.get("name")?.value)
      this.data && formData.append("_method", "PUT")
      return formData
    }
    SwalService.swalToast("Faltan datos por llenar", "error")
    return false
  }

  close(data: any): void {
    this.dialogRef.close(data)
  }

  setData(data: any): void {
    if (this.data) {
      this.form.get("name")?.setValue(data.info.name)
      this.img.base64 = data.info.photo || "assets/img/img_not_available.png"
    }
  }

  saveInServer() {
    const data_send = this.getDataForSendServer()
    if (data_send) {
      this.isLoading = true
      let url = this.urlSave
      let observable: Observable<any>
      if (this.data) {
        url += `/${this.data._id}`
        observable = this.methodsHttp.methodPost(url, data_send)
      } else {
        observable = this.methodsHttp.methodPost(url, data_send)
      }
      observable.subscribe({
        next: (data) => {
          this.isLoading = false
          this.close(data)
        },
        error: () => {
          this.isLoading = false
        },
      })
    }
  }
}
