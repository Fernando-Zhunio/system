
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NgxPermissionsService } from 'ngx-permissions';

import { DefaultLayoutComponent } from '.';

describe('SheetFzComponent', () => {
  let component: DefaultLayoutComponent;

  beforeEach(async(() => {
    component = new DefaultLayoutComponent(null, null, null, null, null, null, null, null, null);
  }));

  beforeEach(() => {
  });
  afterEach(() => { 
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
