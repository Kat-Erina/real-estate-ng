// import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RegionCheckboxComponent } from './region-checkbox/region-checkbox.component';
import { ReceivedListingObject, RegionObject } from '../../../core/types';
import { MainService } from '../../../core/main-service.service'; 
import { CommonModule } from '@angular/common';
import { Service } from '../../../core/services.service';
import { ApiService } from '../../../core/api.service';


@Component({
  selector: 'app-regions-form',
  standalone: true,
  imports: [RegionCheckboxComponent, CommonModule],
  templateUrl: './regions-form.component.html',
  styleUrl: './regions-form.component.css'
})
export class RegionsFormComponent implements OnInit {
service=inject(MainService);
apiService=inject(ApiService)
destroyRef=inject(DestroyRef);
chosenField=this.service.chosenField
regions=signal<RegionObject []>([]);
selectedRegionsarray=this.service.selectedRegionsarray;
allowToClear=this.service.allowToClear;
stateObject=this.service.stateObject
updateFiltersObjectstorage=this.service.updateFiltersObjectstorage;
filteringListings=this.service.filteringListings;


array=signal<string[]>([])


ngOnInit(): void {
 let subscription= this.apiService.fetchData('regions').subscribe(
    {next:(response)=>{
      this.regions.set(response)
    }, 
    error:(error)=>{console.log(error.message)}})


this.destroyRef.onDestroy(()=>{subscription.unsubscribe()})
}

toggle(el:Event){
  let target=el.target as HTMLInputElement;
  let value=target.value;
  if(value===null)return 
  else if(!this.array().includes(value)){
    this.array.set([...this.array(), value]);
} else {
  this.array.set(this.array().filter((el)=>{return value!=el}));
}
}

handleRegionSubmit=(field:string, array:string[])=>{
  this.selectedRegionsarray.set(this.array());
  const filteredListingsWithRegions = this.filteringListings().filter((listing:ReceivedListingObject) => 
array.includes(listing.city.region.name)
 
);
this.filteringListings.set(filteredListingsWithRegions)
  this.updateFiltersObjectstorage(field, array)
}}

