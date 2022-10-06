import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderFzComponent } from './header-fz.component';

describe('HeaderFzComponent', () => {
  let component: HeaderFzComponent;
  let fixture: ComponentFixture<HeaderFzComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
