import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLoginCreateComponent } from './account-login-create.component';

describe('AccountLoginCreateComponent', () => {
  let component: AccountLoginCreateComponent;
  let fixture: ComponentFixture<AccountLoginCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountLoginCreateComponent]
    });
    fixture = TestBed.createComponent(AccountLoginCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
