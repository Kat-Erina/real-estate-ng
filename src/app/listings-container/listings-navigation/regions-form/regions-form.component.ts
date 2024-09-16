import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RegionCheckboxComponent } from './region-checkbox/region-checkbox.component';
import { RegionObject } from '../../../types';
import { ListingFilterService } from '../../../listing.filter.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-regions-form',
  standalone: true,
  imports: [RegionCheckboxComponent, CommonModule],
  templateUrl: './regions-form.component.html',
  styleUrl: './regions-form.component.css'
})
export class RegionsFormComponent implements OnInit {
service=inject(ListingFilterService)
destroyRef=inject(DestroyRef);
regions=signal<RegionObject []>([]);
selectedRegionsarray=this.service.selectedRegionsarray;
savedFilteresObj=this.service.savedFilteresObj;
updateFiltersObjectstorage=this.service.updateFiltersObjectstorage;


ngOnInit(): void {
 let subscription= this.service.handleSubmit().subscribe(
    {next:(response)=>{console.log(response);
      this.regions.set(response)
    }})


this.destroyRef.onDestroy(()=>{subscription.unsubscribe()})
}

toggle(el:any){
  let value=el.target.value;
  console.log(value)
  if(value===null)return 
  else if(!this.selectedRegionsarray.includes(value)){
    this.selectedRegionsarray.push(value);
} else {
  this.selectedRegionsarray=this.selectedRegionsarray.filter((el)=>{return value!=el});
}
}

handleRegionSubmit=(event:Event, field:string, array:string[])=>{
  console.log("davachire")
    event.preventDefault();
  this.updateFiltersObjectstorage(field, array)
}}

