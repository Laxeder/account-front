import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninAuthComponent } from './signin-auth.component';

describe('SigninAuthComponent', () => {
  let component: SigninAuthComponent;
  let fixture: ComponentFixture<SigninAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigninAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
