import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoodTruckComponent } from './list-food-truck.component';

describe('ListFoodTruckComponent', () => {
  let component: ListFoodTruckComponent;
  let fixture: ComponentFixture<ListFoodTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFoodTruckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFoodTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
