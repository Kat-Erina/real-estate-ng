import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ListingFilterService } from '../core/listing.filter.service'; 
import { Agent, CityObject, RegionObject } from '../core/types';
import { Service } from '../core/services.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-listings-modal',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './listings-modal.component.html',
  styleUrl: './listings-modal.component.css'
})
export class ListingsModalComponent implements OnInit {
service=inject(ListingFilterService);
cityService=inject(Service)
regions=signal<RegionObject[]>([]);
destroyRef=inject(DestroyRef);
cities=signal<CityObject[]>([]);
regionId=signal<number>(0);
fileteredcities=signal<CityObject[]>([]);
formBuilder=inject(FormBuilder);
agents=signal<Agent[]>([]);
agentDialogOpen=this.cityService.agentDialogOpen

form=new FormGroup({
  address:new FormControl('', {
    validators:[Validators.required, Validators.minLength(2)]
}), 
zip_code:new FormControl('', {validators:[Validators.required, Validators.pattern(/^[0-9]+$/
)]}), 
city_id:new FormControl('', {validators:[Validators.required]}), 
price:new FormControl('', {validators:[Validators.required,  Validators.pattern(/^[0-9]+$/)]}), 
area:new FormControl('', {validators:[Validators.required,  Validators.pattern(/^[0-9]+$/)]}), 
bedrooms:new FormControl('', {validators:[Validators.required,  Validators.pattern(/^[0-9]+$/)]}), 
description:new FormControl('', {validators:[Validators.required,  Validators.pattern(/^([a-zA-Zა-ჰ]+(\s+|$)){5,}$/)]}), 
agent_id:new FormControl('', {validators:Validators.required}),
is_rental:new FormControl('', {validators:Validators.required}),
image:new FormControl('', {validators:Validators.required}),
// created_at:new FormControl('', {validators:Validators.required}),
id:new FormControl('', {validators:Validators.required}),
region:new FormControl('', {validators:Validators.required}),
offer:new FormControl('ქირავდება')
})

onSubmit(){
  console.log(this.form.value)
}


ngOnInit(): void {
 
  let regionsSubscription=this.cityService.fetchData('regions').subscribe(
     {next:(response)=>{console.log(response);
       this.regions.set(response);
     }})
 
     let citiesSubscription= this.cityService.fetchData('cities').subscribe({
      next:(response)=>{
        console.log(response);
        this.cities.set(response)
      }
     })

     let agentsFetch= this.cityService.fetchDataWithToken('agents', this.cityService.myToken).subscribe((response)=>this.agents.set(response))
       
  this.destroyRef.onDestroy(()=>{regionsSubscription.unsubscribe()
  citiesSubscription.unsubscribe();
  agentsFetch.unsubscribe()
}
);
 }



 handleRegionChange(e:Event){
  const value=(e.target as HTMLSelectElement).value
  this.regionId.set(Number(value));
  let newcitiesArray=this.cities().filter((el)=>el.region_id===this.regionId());
  this.fileteredcities.set(newcitiesArray)
 }


 selectedAgent=""

}
