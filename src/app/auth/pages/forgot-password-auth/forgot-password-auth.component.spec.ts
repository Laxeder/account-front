import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordAuthComponent } from './forgot-password-auth.component';

describe('ForgotPasswordAuthComponent', () => {
  let component: ForgotPasswordAuthComponent;
  let fixture: ComponentFixture<ForgotPasswordAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
