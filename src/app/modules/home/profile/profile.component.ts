import { Component, OnInit } from '@angular/core';
// import { User } from '../../../clases/user';
// import { IuserSystem } from '../../../interfaces/iuser-system';
import { StandartSearchService } from '../../../services/standart-search.service';
import { StorageService } from '../../../services/storage.service';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private s_standard: StandartSearchService, private s_storage: StorageService) { }

  user: User | null = null;
  ngOnInit(): void {
    const user: User = this.s_storage.getCurrentUser()!;
    this.s_standard.index(`user/people/${user.id}/profile`).subscribe(
      (response) => {
        this.user = response.data;
        console.log(response);
      }
    );
  }

}
