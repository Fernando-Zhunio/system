import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Echo from 'laravel-echo';
import { EchoManager } from '../../../../../class/echo-manager';
import { Iresponse } from '../../../../../interfaces/Imports/invoice-item';
import { IpermissionStandart } from '../../../../../interfaces/ipermission-standart';
import { Publication } from '../../../../../interfaces/ipublication';
import { StandartSearchService } from '../../../../../services/standart-search.service';
import { CONST_ECHO_PUBLICATIONS_CHANNEL_PRIVATE } from '../../../../../shared/objects/constants';

@Component({
  selector: 'app-show-publication',
  templateUrl: './show-publication.component.html',
  styleUrls: ['./show-publication.component.css'],
})
export class ShowPublicationComponent implements OnInit, OnDestroy {
  constructor(
    private active_router: ActivatedRoute,
    private s_standart: StandartSearchService,
  ) {}

  publication: Publication | null = null;
  isLoadPublication: boolean = false;
  permission_page: IpermissionStandart;
  echo: Echo;
  ngOnInit(): void {
    this.active_router.data.subscribe((res: any) => {
      this.permission_page = res.permissions.all;
    });
    const idString = this.active_router.snapshot.paramMap.get('id')!;
    const id = Number.parseInt(idString);
    this.changePublication(id);
    this.echo = new EchoManager().get();
    this.echo
      .private(this.getChannelPublication())
      .listen('.publication', this.listener.bind(this));
  }

  listener(e): void {
    if (!this.publication) {return; }
    if (e.publication.id === this.publication.id) {
      if (e.event == 'updated') {
        this.publication = e.publication;
      } else if (e.event == 'deleted') {
        this.publication = null;
      }
    }
  }

  ngOnDestroy(): void {
    this.echo.leave(this.getChannelPublication());
  }

  getChannelPublication(): string {
    return CONST_ECHO_PUBLICATIONS_CHANNEL_PRIVATE;
  }

  changePublication(id): void {
    this.isLoadPublication = true;
    this.s_standart.show('catalogs/publications/' + id).subscribe(
      (res: Iresponse) => {
        this.publication = res.data;
        this.isLoadPublication = false;
      },
      (err) => {
        console.error(err);
        this.isLoadPublication = false;
      }
    );
  }

  destroyPublication(_event): void {
    this.publication = null;
  }
}
