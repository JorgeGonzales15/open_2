import { Component, Inject, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FoodTruckService } from 'src/app/services/food-truck.service';

@Component({
  selector: 'app-food-truck-form',
  templateUrl: './food-truck-form.component.html',
  styleUrls: ['./food-truck-form.component.scss']
})
export class FoodTruckFormComponent implements OnInit{
  foodTruckForm : FormGroup;
  isEdit: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder, 
    private foodTruckService: FoodTruckService, 
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    )
    {
      this.foodTruckForm = this.formBuilder.group({
        ownerFirstName: ['', Validators.required],
        ownerLastName: ['', Validators.required],
        brandName: ['', Validators.required],
        email: ['', Validators.required],
        address: ['', Validators.required],
        websiteUrl: '',
        menuUrl: ''
      });
    }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.foodTruckService.getItem(params['id']).subscribe((result: any) => {
          this.foodTruckForm.patchValue(result);
        });
      }
    });
  }
  onSubmit(){
    if(this.foodTruckForm.valid){
      if(this.isEdit){
        this.foodTruckService.updateItem(this.route.snapshot.params['id'], this.foodTruckForm.value).subscribe({
          next: (val: any) =>{
            this.router.navigate(['/food-trucks']);
            this.snackBar.open('Offer Truck updated successfully', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this.foodTruckService.createItem(this.foodTruckForm.value).subscribe({
          next: (val: any) =>{
            this.router.navigate(['/food-trucks']);
            this.snackBar.open('Food Truck created successfully', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end'
            });
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }
}
