import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeTokenComponent } from './propose-token.component';

describe('ProposeTokenComponent', () => {
  let component: ProposeTokenComponent;
  let fixture: ComponentFixture<ProposeTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposeTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
