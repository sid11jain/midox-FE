import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeRolesComponent } from './add-employee-roles.component';

describe('AddEmployeeRolesComponent', () => {
  let component: AddEmployeeRolesComponent;
  let fixture: ComponentFixture<AddEmployeeRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
