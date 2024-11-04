import { Component, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MainService } from '../core/main-service.service'; 
import { CityObject, ListingObject, RegionObject } from '../core/types';
import { Service } from '../core/services.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { ApiService } from '../core/api.service';
import { Router, RouterLink } from '@angular/router';
import { AgentModalComponent } from '../agent-modal/agent-modal.component';



@Component({
  selector: 'app-add-listing',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css'
})
export class AddListingComponent implements OnInit {
service=inject(MainService);
cityService=inject(Service)
apiService=inject(ApiService);
regions=signal<RegionObject[]>([]);
destroyRef=inject(DestroyRef);
cities=signal<CityObject[]>([]);
fileteredcities=signal<CityObject[]>([]);
formBuilder=inject(FormBuilder);
agents=this.cityService.agents;
form!:FormGroup;
listingFormSubmitted=signal<boolean>(false);
formInvalid=this.cityService.formInvalid;
listingAdded=signal(false);
router=inject(Router)

@ViewChild('fileInput') fileInput!:ElementRef;

listingInfo:ListingObject={address:'',
zip_code:'', 
city_id:'', 
price:"", 
bedrooms:"",
area:"", 
description:'',
agent_id:'', 
is_rental:'0', 
image:'',
region_id:0
    }
   

ngOnInit(): void {
  // localStorage.clear()

let fetchedData=localStorage.getItem('listingInfo');
this.cityService.previewListingPhoto.set(''),
this.cityService.listingImageValidType.set(false)
if(fetchedData!=null){
this.listingInfo=JSON.parse(fetchedData);
}


this.form=this.formBuilder.group({
address:[this.listingInfo.address, [Validators.required, Validators.minLength(2)]],
zip_code:[this.listingInfo.zip_code, [Validators.required, Validators.pattern(/^[0-9 ]+$/)]],
city_id:[this.listingInfo.city_id, Validators.required],
price:[this.listingInfo.price, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
area:[this.listingInfo.area, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
bedrooms:[this.listingInfo.bedrooms, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
description:[this.listingInfo.description, [Validators.required]],
agent_id:[this.listingInfo.agent_id===""?"":this.listingInfo.agent_id, Validators.required],
is_rental:[this.listingInfo.is_rental, Validators.required],
image:["", Validators.required],
region_id:[this.listingInfo.region_id || '', Validators.required],
})
 
let  subscription=this.form.valueChanges.subscribe((value)=>{
  if(value.agent_id!="add_new_agent"){
    let updatedListingValues={...this.listingInfo, ...value};
localStorage.setItem('listingInfo', JSON.stringify(updatedListingValues))
  }
} )

let regionsSubscription=this.apiService.fetchData('regions').subscribe(
    {next:(response)=>{ this.regions.set(response) },
    error:(error:Error)=>console.log(error.message)})
 
    let citiesSubscription= this.apiService.fetchData('cities').pipe(
    map((response)=>response.filter((el)=>el.region_id===Number(this.listingInfo.region_id)))
    ).subscribe({
    next:(response)=>{
this.cities.set(response)
},
error:(error:Error)=>console.log(error.message)
    })

let agentsFetch= this.apiService.fetchDataWithToken('agents').subscribe(
  {next:(response)=>{this.agents.set(response)},
  error:(error:Error)=>console.log(error.message)}
)


    
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
  this.form.patchValue({
    city_id: ''
  });
  
  const value=(e.target as HTMLSelectElement).value;
  let regionId=Number(value);
 let subscription= this.apiService.fetchCities('cities').pipe(map((response)=>
    response.filter((el)=>el.region_id===regionId)
  )).subscribe({
    next:(response)=>{this.cities.set(response)},
    error:(error:Error)=>console.log(error.message)
  })
  this.destroyRef.onDestroy(()=>{subscription.unsubscribe()})

 }



 openAgentModal(){
  this.cityService.agentDialogOpen=true;
  let dialogRef=this.cityService.dialog.open(AgentModalComponent, {
        height: '400px',
          width: '600px',
        
  })
  dialogRef.afterClosed().subscribe(() => {
      this.cityService.agentDialogOpen=false;
    });}

onAddAgent(e:Event){
const targetValue=(e.target as HTMLSelectElement).value;
if(targetValue==='add_new_agent'){
  this.cityService.agentDialogOpen=true;
  this.openAgentModal()
}
}


uploadListingPhoto(e:Event){ 
this.fileInput.nativeElement.click()
}

onSubmit(){
  this.listingFormSubmitted.set(true)
if(this.form.valid && this.formInvalid()){
  alert('გთხოვთ ატვირთოეთ მხოლოდ ფოტო')
}
 else  if(this.form.valid && !this.formInvalid()){
    let formData=new FormData();
    let {address, zip_code, city_id, price, bedrooms, area, description, agent_id, is_rental, image, region_id}=this.form.value;
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
 let subscription= this.apiService.postData('real-estates', formData).subscribe(
     {next:(response)=>{
      this.listingAdded.set(true)
     },
     error:(error:Error)=>{console.log(error.message)}}
     )
     this.destroyRef.onDestroy(()=>subscription.unsubscribe())
    
}
   }

   navigate(){
    this.router.navigate([""])
   }
   
  }
