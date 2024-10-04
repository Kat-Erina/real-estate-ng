import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ListingFilterService } from '../core/listing.filter.service'; 
import { Agent, CityObject, ListingObject, RegionObject } from '../core/types';
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
form!:FormGroup;

listingInfo:ListingObject={address:'',
zip_code:'', 
city_id:0, 
price:0, 
bedrooms:0,
area:0, 
description:'',
agent_id:0, 
is_rental:'0', 
image:'',
region_id:0
    }


ngOnInit(): void {
// localStorage.clear()
let fetchedData=localStorage.getItem('listingInfo');
if(fetchedData!=null){
  this.listingInfo=JSON.parse(fetchedData);
}
  localStorage.setItem('listingInfo', JSON.stringify(this.listingInfo))


this.form=this.formBuilder.group({
  address:[this.listingInfo.address, [Validators.required, Validators.minLength(2)]],
  zip_code:[this.listingInfo.zip_code, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  city_id:[this.listingInfo.city_id, Validators.required],
  price:[this.listingInfo.price, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  area:[this.listingInfo.area, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  bedrooms:[this.listingInfo.bedrooms, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  description:[this.listingInfo.description, [Validators.required, Validators.pattern(/^([a-zA-Zა-ჰ]+(\s+|$)){5,}$/)]],
  agent_id:[this.listingInfo.agent_id, Validators.required],
  is_rental:[this.listingInfo.is_rental, Validators.required],
  image:[this.listingInfo.image, Validators.required],
  region_id:[this.listingInfo.region_id, Validators.required],
})
 
  
 
  let regionsSubscription=this.cityService.fetchData('regions').subscribe(
     {next:(response)=>{console.log(response);
       this.regions.set(response);
     }})
 
     let citiesSubscription= this.cityService.fetchData('cities').subscribe({
      next:(response)=>{

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

updateListinInfoStorage(name:string){
  this.cityService.updateInfoStorage(name, this.form, this.listingInfo, 'listingInfo')
}

 handleRegionChange(e:Event){
  const value=(e.target as HTMLSelectElement).value
  this.regionId.set(Number(value));
  let newcitiesArray=this.cities().filter((el)=>el.region_id===this.regionId());
 this.fileteredcities.set(newcitiesArray)
 }

 onAddAgent(e:Event){
  const targetValue=(e.target as HTMLSelectElement).value;
if(targetValue==='addAgent'){
   this.cityService.addAgent()
 }
else {console.log("sxva avarchie")} 
}

onSubmit(){
 
  console.log('hi')
  console.log(this.form.value)
  
}

}
