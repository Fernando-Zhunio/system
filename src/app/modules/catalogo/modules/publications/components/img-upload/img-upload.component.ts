import { MethodsHttpService } from './../../../../../../services/methods-http.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResponseApi } from '../../../../../../shared/interfaces/response-api';
import { SwalService } from '../../../../../../services/swal.service';

type StatusImg = 'loading' | 'error' | 'success';
interface ImgUploadData { status: StatusImg, url: string, id: any, message?: string }

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent {

  constructor(private mh: MethodsHttpService) { }
  @Input() images: ImgUploadData[] = [];
  @Input() pathPost: string;
  @Input() pathDelete: string;
  @Output() upload = new EventEmitter<File>();
  @Output() add = new EventEmitter<ResponseApi>();

  convertFileToUrl(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  public uploadFileTypeImage(file, id, name = 'image') {
    if (!file.type.includes('image')) {
      SwalService.swalToast(
        'Este tipo de archivo no es una imagen valida',
        'error'
      );
      return;
    }
    const formData = new FormData();
    formData.append(name, file);
    this.mh.methodPost(this.pathPost, formData)
      .subscribe(
        {
          next: (res: ResponseApi) => {
            if (res?.success) {
              const img = this.images.find((img) => img.id === id)!;
              img.status = 'success';
              img.id = res.data.id;
            }
          }, error: () => {
            const img = this.images.find((img) => img.id === id)!;
            img.status = 'error';
          }
        }
      );
  }

  public getImages(): ImgUploadData[] {
    return this.images.filter((img) => img.status === 'success');
  }

  async addImage(dataSend: File, id?: any, name = 'image'): Promise<void> {
    const data: ImgUploadData = {
      status: 'loading',
      url: await this.convertFileToUrl(dataSend),
      id: id || Symbol()
    }
    this.images.push(data);
    this.uploadFileTypeImage(dataSend, data.id, name);
  }

  trackByFn(_index, img: ImgUploadData): string {
    return img.id;
  }

  public removeImage(id) {
    const imgIndex = this.images?.findIndex((x) => x.id == id)!;
    if (imgIndex != -1) {
      this.mh
        .methodDelete(
          // 'catalogs/publications/' + this.publication.id + '/images/' + id
          `${this.pathDelete}/${id}`
        )
        .subscribe((res: ResponseApi) => {
          if (res.success) {
            this.images?.splice(imgIndex, 1);
          }
        });
    }
  }

}
