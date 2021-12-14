import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTokensComponent } from './view-all-tokens.component';

describe('ViewAllTokensComponent', () => {
  let component: ViewAllTokensComponent;
  let fixture: ComponentFixture<ViewAllTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
