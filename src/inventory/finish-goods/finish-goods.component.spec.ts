import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishGoodsComponent } from './finish-goods.component';

describe('FinishGoodsComponent', () => {
  let component: FinishGoodsComponent;
  let fixture: ComponentFixture<FinishGoodsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishGoodsComponent]
    });
    fixture = TestBed.createComponent(FinishGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
