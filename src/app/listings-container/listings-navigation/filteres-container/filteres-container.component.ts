import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ListingFilterService } from '../../../core/listing.filter.service'; 
import { FiletersObject } from '../../../core/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filteres-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filteres-container.component.html',
  styleUrl: './filteres-container.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FilteresContainerComponent {
service=inject(ListingFilterService);

fetchedObject!:string|null;
selectedRegionsarray=this.service.selectedRegionsarray;
selectedPricesarray=this.service.selectedPricesarray;
selectedAreaArrays=this.service.selectedAreaArrays;
selectedBedroom=this.service.selectedBedroom;
allowToClear=this.service.allowToClear

filteresObj=signal<FiletersObject>({regions:[],
  price_range:[],
  area:[],
  bedroom:""});



ngOnInit(): void {
    this.fetchedObject=window.localStorage.getItem("savedObject");
if(this.fetchedObject){
      let parsedObject=JSON.parse(this.fetchedObject);
     this.selectedPricesarray.set(parsedObject.price_range) ;
      this.selectedRegionsarray.set(parsedObject.regions);
      this.selectedAreaArrays.set(parsedObject.area)
      this.selectedBedroom.set(parsedObject.bedroom);
      }
    else {this.filteresObj.set({regions:[],
      price_range:[],
      area:[],
      bedroom:""})    
  }
   }

 
clearAll(){
  this.selectedPricesarray.set([]) ;
   this.selectedRegionsarray.set([]);
   this.selectedAreaArrays.set([])
   this.selectedBedroom.set("");
  window.localStorage.setItem('savedObject', JSON.stringify({regions:[],
    price_range:[],
    area:[],
    bedroom:""}))
    this.allowToClear.set(false)
}

  clearSelectedfilter(e:Event, field:string, value:WritableSignal<string | string[]>){
    e.preventDefault();
    this.fetchedObject=window.localStorage.getItem("savedObject")||null;
    if(this.fetchedObject){
      let parsedObject=JSON.parse(this.fetchedObject);
if(value()!="bedroom"){
  value.set([]);
  let revisedObject={...parsedObject, [field]:value()};
  window.localStorage.setItem("savedObject", JSON.stringify(revisedObject))
} else if(value()==="bedroom"){
  value.set("");
  let revisedObject={...parsedObject, [field]:value()};
  window.localStorage.setItem("savedObject", JSON.stringify(revisedObject))
} }
 }
  
}
