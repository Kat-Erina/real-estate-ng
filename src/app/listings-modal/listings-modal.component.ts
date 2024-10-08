import { Component, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ListingFilterService } from '../core/listing.filter.service'; 
import {  CityObject, ListingObject, RegionObject } from '../core/types';
import { Service } from '../core/services.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { map, pipe } from 'rxjs';
import { allowedTypes } from '../core/data-array';



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
// regionId=signal(0);
fileteredcities=signal<CityObject[]>([]);
formBuilder=inject(FormBuilder);
agents=this.cityService.agents;
form!:FormGroup;
uploadPhoto=this.cityService.uploadPhoto;

@ViewChild('fileInput') fileInput!:ElementRef;

listingInfo:ListingObject={address:'',
zip_code:'', 
city_id:0, 
price:"", 
bedrooms:"",
area:"", 
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
  city_id:[this.listingInfo.city_id || '', Validators.required],
  price:[this.listingInfo.price, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  area:[this.listingInfo.area, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  bedrooms:[this.listingInfo.bedrooms, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  description:[this.listingInfo.description, [Validators.required, Validators.pattern(/^([a-zA-Zა-ჰ]+(\s+|$)){5,}$/)]],
  agent_id:[this.listingInfo.agent_id, Validators.required],
  is_rental:[this.listingInfo.is_rental, Validators.required],
  image:["", Validators.required],
  region_id:[this.listingInfo.region_id || '', Validators.required],
})
 
  
let subscription=this.form.valueChanges.subscribe((value)=>{

  let updatedListingValues={...this.listingInfo, ...value};
localStorage.setItem('listingInfo', JSON.stringify(updatedListingValues))
  })

let regionsSubscription=this.cityService.fetchData('regions').subscribe(
     {next:(response)=>{ this.regions.set(response);
     }})
 
     let citiesSubscription= this.cityService.fetchData('cities').pipe(
      map((response)=>response.filter((el)=>el.region_id===Number(this.listingInfo.region_id)))
     ).subscribe({
      next:(response)=>{
this.cities.set(response)
 }
     })

let agentsFetch= this.cityService.fetchDataWithToken('agents', this.cityService.myToken).subscribe((response)=>{
  this.agents.set(response)})
      
  this.destroyRef.onDestroy(()=>{regionsSubscription.unsubscribe()
  citiesSubscription.unsubscribe();
  agentsFetch.unsubscribe();
  subscription.unsubscribe()
});

 }

 get agentsArray() {
  return this.agents();
}

 handleRegionChange(e:Event){
  const value=(e.target as HTMLSelectElement).value;
  let regionId=Number(value);
  this.cityService.fetchCities('cities').pipe(map((response)=>
    response.filter((el)=>el.region_id===regionId)
  )).subscribe((response)=>{
     this.cities.set(response)
   })

 }

 onAddAgent(e:Event){
  const targetValue=(e.target as HTMLSelectElement).value;
if(targetValue==='addAgent'){
   this.cityService.openAgentModal()
 }
}


uploadListingPhoto(e:Event){ 
  this.fileInput.nativeElement.click()
 }

onSubmit(){
  console.log('kato')
console.log(this.form.valid)
  if(this.form.valid && !this.cityService.formInvalid()){
    let formData=new FormData();
    let {address, zip_code, city_id, price, bedrooms, area, description, agent_id, is_rental, image, region_id}=this.form.value;
    console.log(this.form.value)
    formData.append('address', address);
    formData.append('zip_code', zip_code);
    formData.append('city_id', city_id);
    formData.append('price', price);
    formData.append('bedrooms', bedrooms);
    formData.append('area', area);
    formData.append('description', description);
    formData.append('agent_id', agent_id);
    formData.append('is_rental', is_rental);
    formData.append('image',this.cityService.listingImage(), this.cityService.listingImage().name);
    formData.append('region_id', region_id);
    this.cityService.postData('real-estates', formData).subscribe((response)=>{
      console.log(response)

      // if(response){
      //   this.cityService.fetchDataWithToken('listings', this.cityService.myToken).subscribe((response)=>{
      //     this.cityService.listings.set(response)
      //   })
      // }
    })}
    else alert('Please fill in all the fields')
  }
  
// }


}
