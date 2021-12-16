import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishNewTokenComponent } from './publish-new-token.component';

describe('PublishNewTokenComponent', () => {
  let component: PublishNewTokenComponent;
  let fixture: ComponentFixture<PublishNewTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishNewTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishNewTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
