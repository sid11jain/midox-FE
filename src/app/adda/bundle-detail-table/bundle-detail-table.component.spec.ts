import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleDetailTableComponent } from './bundle-detail-table.component';

describe('BundleDetailTableComponent', () => {
  let component: BundleDetailTableComponent;
  let fixture: ComponentFixture<BundleDetailTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BundleDetailTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BundleDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
