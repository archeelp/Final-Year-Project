import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTokensComponent } from './all-tokens.component';

describe('AllTokensComponent', () => {
  let component: AllTokensComponent;
  let fixture: ComponentFixture<AllTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
