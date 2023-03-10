import { Component, OnInit } from '@angular/core';
import { User } from '../../../class/fast-data';
// import { StandartSearchService } from '../../../services/standart-search.service';
// import { StorageService } from '../../../services/storage.service';
import { User as UserSystem } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  user: UserSystem | null = null;
  ngOnInit(): void {
    // const user: User = this.s_storage.getCurrentUser()!;
    this.user = User.getUser();
    console.log(this.user)
    // this.s_standard.index(`user/people/${user.id}/profile`).subscribe(
    //   (response) => {
    //     this.user = response.data;
    //   }
    // );
  }
}
