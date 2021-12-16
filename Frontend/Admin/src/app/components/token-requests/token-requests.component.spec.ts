import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenRequestsComponent } from './token-requests.component';

describe('TokenRequestsComponent', () => {
  let component: TokenRequestsComponent;
  let fixture: ComponentFixture<TokenRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
