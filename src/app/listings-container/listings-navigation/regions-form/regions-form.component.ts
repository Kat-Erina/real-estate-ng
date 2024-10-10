// import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RegionCheckboxComponent } from './region-checkbox/region-checkbox.component';
import { RegionObject } from '../../../core/types';
import { ListingFilterService } from '../../../core/listing.filter.service'; 
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
service=inject(ListingFilterService);
apiService=inject(ApiService)
destroyRef=inject(DestroyRef);
chosenField=this.service.chosenField
regions=signal<RegionObject []>([]);
selectedRegionsarray=this.service.selectedRegionsarray;
allowToClear=this.service.allowToClear
updateFiltersObjectstorage=this.service.updateFiltersObjectstorage;
minPriceInput=this.service.minPriceInput;
maxPriceInput=this.service.maxPriceInput


ngOnInit(): void {
 let subscription= this.apiService.fetchData('regions').subscribe(
    {next:(response)=>{console.log(response);
      this.regions.set(response)
    }})


this.destroyRef.onDestroy(()=>{subscription.unsubscribe()})
}

toggle(el:any){
  let value=el.target.value;
  console.log(value)
  if(value===null)return 
  else if(!this.selectedRegionsarray().includes(value)){
    this.selectedRegionsarray.set([...this.selectedRegionsarray(), value]);
    console.log(this.selectedRegionsarray())
} else {
  this.selectedRegionsarray.set(this.selectedRegionsarray().filter((el)=>{return value!=el}));
  console.log(this.selectedRegionsarray())
}
}

handleRegionSubmit=(field:string, array:string[])=>{
 
  this.updateFiltersObjectstorage(field, array)
}}

