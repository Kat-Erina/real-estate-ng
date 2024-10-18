import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MainService } from '../../../core/main-service.service'; 
import { FiletersObject } from '../../../core/types';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-filteres-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filteres-container.component.html',
  styleUrl: './filteres-container.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FilteresContainerComponent {
service=inject(MainService);

fetchedObject!:string|null;
selectedRegionsarray=this.service.selectedRegionsarray;
selectedPricesarray=this.service.selectedPricesarray;
selectedAreaArrays=this.service.selectedAreaArrays;
selectedBedroom=this.service.selectedBedroom;
allowToClear=this.service.allowToClear;
fetchedFilteredObject=signal({})
filteringListings=this.service.filteringListings;
getFilterCriteria=this.service.getFilterCriteria;
// objectKeys=signal([])

filterListings=this.service.filterListings;
listings=this.service.listings;
satestoData=this.service.satestoData;





ngOnInit(): void {
  // localStorage.clear()
    this.fetchedObject=window.localStorage.getItem("savedObject")

if(this.fetchedObject){
      let parsedObject=JSON.parse(this.fetchedObject);
      this.fetchedFilteredObject.set(parsedObject);
      this.allowToClear.set(true);
if(parsedObject.hasOwnProperty("region")){
      this.selectedRegionsarray.set(parsedObject.region)
      }
      if(parsedObject.hasOwnProperty("price_range")){
       this.selectedPricesarray.set(parsedObject.price_range)
      }
      if(parsedObject.hasOwnProperty("area")){
       this.selectedAreaArrays.set(parsedObject.area)
      }
      if(parsedObject.hasOwnProperty("bedrooms")){
        this.selectedBedroom.set(parsedObject.bedrooms)
      }
      }
   }

 
clearAll(){
  this.selectedPricesarray.set([]) ;
   this.selectedRegionsarray.set([]);
   this.selectedAreaArrays.set([])
   this.selectedBedroom.set("");
  localStorage.removeItem('savedObject');
  this.filterListings(this.listings());
  this.allowToClear.set(false)
}

  clearSelectedfilter(e:Event, field:string, value:WritableSignal<string | string[]>){
  
let target=(e.target as HTMLElement).getAttribute('data-value')||'';
this.fetchedObject=window.localStorage.getItem("savedObject")||null;
if(this.fetchedObject){
let parsedObject=JSON.parse(this.fetchedObject);
let keys=Object.keys(parsedObject);
keys.length>1?this.allowToClear.set(true):this.allowToClear.set(false);
if(field!=="bedrooms"){
value.set([]);
}
else { value.set("");}
delete parsedObject[target];
window.localStorage.setItem("savedObject", JSON.stringify(parsedObject)) ;
this.filterListings(this.listings());
}
}
}
