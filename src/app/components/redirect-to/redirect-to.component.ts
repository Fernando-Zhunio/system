import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, SkipSelf } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Session } from '../../clases/session';
import { User } from '../../clases/user';
import { Iresponse } from '../../interfaces/Imports/invoice-item';
import { StorageService } from '../../services/storage.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-redirect-to',
  templateUrl: './redirect-to.component.html',
  styleUrls: ['./redirect-to.component.css'],
})
export class RedirectToComponent implements OnInit {
  constructor(
    private s_storage: StorageService,
    private router: Router,
    private act_router: ActivatedRoute,
    private http_backend: HttpBackend
  ) {
    this.http = new HttpClient(http_backend);
  }
  private http: HttpClient;

  ngOnInit(): void {
    const token = this.act_router.snapshot.queryParamMap.get('token');
    // console.log(token);
    const goto = this.act_router.snapshot.queryParamMap.get('goto');

    if (this.s_storage.isAuthenticated()) {
      if (goto) {
        this.router.navigate([goto]);
      } else {
        this.router.navigate(['/home/dashboard']);
      }
      return;
    }
    // console.log('token', token);

    // this.route.snapshot.queryParamMap.get
    if (token) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + token,
      });

      this.http
        .get(environment.server + 'auth/new-front', {
          headers,
        })
        .subscribe(
          (res: Iresponse) => {
            if (res.success) {
              const session: Session = new Session();
              session.token = token;
              session.expires_at = res.data.expires_at;
              session.token_type = res.data.token_type;
              const user: User = new User(
                res.data.user.id,
                res.data.user.name,
                res.data.permissions,
                res.data.roles,
                res.data.companies,
                res.data.company_company_id,
                res.data.user.person,
              );
              session.user = user;
              this.s_storage.setCurrentSession(session);
              if (goto) { this.router.navigate([goto]); } else { this.router.navigate(['/home/inicio']); }
            }
          },
          (err) => {
            SwalService.swalToast('Token invalido');
          }
        );
    } else {
      SwalService.swalToast('Token no valido');
    }
  }
}
