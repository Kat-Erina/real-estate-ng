import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ListingFilterService } from '../listing.filter.service';
import { CityObject, RegionObject } from '../types';
import { Service } from '../services.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-listings-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
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

form=this.formBuilder.group({
  address:"raghac",

})

onSubmit(){
  console.log('raghac')
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

     let agentsFetch= this.cityService.fetchDataWithToken('agents', this.cityService.myToken).subscribe((response)=>console.log(response))
       
  
 
 this.destroyRef.onDestroy(()=>{regionsSubscription.unsubscribe()
  citiesSubscription.unsubscribe();
  agentsFetch.unsubscribe()
}
);
 }

// form=new FormGroup({

// })

 handleRegionChange(e:Event){
  const value=(e.target as HTMLSelectElement).value
  this.regionId.set(Number(value));
  let newcitiesArray=this.cities().filter((el)=>el.region_id===this.regionId());
  this.fileteredcities.set(newcitiesArray)
 }


 
}
