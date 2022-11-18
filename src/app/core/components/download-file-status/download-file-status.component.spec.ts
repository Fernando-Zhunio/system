import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadFileStatusComponent } from './download-file-status.component';

describe('DownloadFileStatusComponent', () => {
  let component: DownloadFileStatusComponent;
  let fixture: ComponentFixture<DownloadFileStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadFileStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadFileStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
