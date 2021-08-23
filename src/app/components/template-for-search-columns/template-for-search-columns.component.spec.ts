import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateForSearchColumnsComponent } from './template-for-search-columns.component';

describe('TemplateForSearchColumnsComponent', () => {
  let component: TemplateForSearchColumnsComponent;
  let fixture: ComponentFixture<TemplateForSearchColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateForSearchColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateForSearchColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
