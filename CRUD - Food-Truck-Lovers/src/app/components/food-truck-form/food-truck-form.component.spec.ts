import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTruckFormComponent } from './food-truck-form.component';

describe('FoodTruckFormComponent', () => {
  let component: FoodTruckFormComponent;
  let fixture: ComponentFixture<FoodTruckFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodTruckFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodTruckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
