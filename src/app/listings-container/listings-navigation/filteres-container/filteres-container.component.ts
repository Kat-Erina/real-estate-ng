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
allowToClear=this.service.allowToClear;
fetchedFilteredObject=this.service.fetchedFilteredObject;
filteringListings=this.service.filteringListings;

filteresObj=signal<FiletersObject>({regions:[],
  price_range:[],
  area:[],
  bedrooms:""});



ngOnInit(): void {
  // localStorage.clear()
    this.fetchedObject=window.localStorage.getItem("savedObject");
if(this.fetchedObject){
      let parsedObject=JSON.parse(this.fetchedObject);
      this.fetchedFilteredObject.set(parsedObject);
      console.log(this.fetchedFilteredObject())
      if(parsedObject.hasOwnProperty("regions")){
        console.log('regions has')
        // this.filteringListings.set(this.previousData());
        // console.log(this.filteringListings())
        this.selectedRegionsarray.set(parsedObject.regions)
      }
      if(parsedObject.hasOwnProperty("price_range")){
        console.log('price has')
        this.selectedPricesarray.set(parsedObject.price_range)
      }
      if(parsedObject.hasOwnProperty("area")){
        console.log('area has')
        this.selectedAreaArrays.set(parsedObject.area)
      }
      if(parsedObject.hasOwnProperty("bedrooms")){
        console.log('bedroom has');
        // this.filteringListings.set(this.previousData());
        // console.log(this.filteringListings())
        this.selectedBedroom.set(parsedObject.bedrooms)
      }
    //  this.selectedPricesarray.set(parsedObject.price_range) ;
    //   this.selectedRegionsarray.set(parsedObject.regions);
    //   this.selectedAreaArrays.set(parsedObject.area)
    //   this.selectedBedroom.set(parsedObject.bedrooms);
    console.log(this.selectedAreaArrays(), this.selectedPricesarray(), this.selectedRegionsarray(), this.selectedBedroom())
      }
  //   else {this.filteresObj.set({regions:[],
  //     price_range:[],
  //     area:[],
  //     bedrooms:""})    
  // }
   }

 
clearAll(){
  this.selectedPricesarray.set([]) ;
   this.selectedRegionsarray.set([]);
   this.selectedAreaArrays.set([])
   this.selectedBedroom.set("");
  // window.localStorage.setItem('savedObject', JSON.stringify({regions:[],
  //   price_range:[],
  //   area:[],
  //   bedrooms:""}))
  //   this.allowToClear.set(false)
  localStorage.removeItem('savedObject')
}

  clearSelectedfilter(e:Event, field:string, value:WritableSignal<string | string[]>){
    // e.preventDefault();
    let target=(e.target as HTMLElement).getAttribute('data-value')||'';
    console.log(target)
  
    this.fetchedObject=window.localStorage.getItem("savedObject")||null;
    if(this.fetchedObject){
      let parsedObject=JSON.parse(this.fetchedObject);
// if(field!="bedrooms"){
//   console.log(value())
//   value.set([]);
  
 if(field==="regions"){
  value.set([]);
  
  this.filteringListings.set(this.service.regionsPreviousData());
  console.log('amovacale regions', this.filteringListings())
  }
  if(field==="area"){
    value.set([]);
    this.filteringListings.set(this.service.areaPreviousData());
    console.log('amovacale area', this.filteringListings())
    }
    if(field==="price_range"){
      value.set([]);
      this.filteringListings.set(this.service.pricePreviousData());
      console.log('amovacale price', this.filteringListings())
      }
   else if(field==="bedrooms"){
    console.log('Kato')
    this.filteringListings.set(this.service.bedroomsPreviousData());
    console.log('wavshale sawoli', this.filteringListings())
  value.set("");
 }

delete parsedObject[target];
  window.localStorage.setItem("savedObject", JSON.stringify(parsedObject)) 
}
//  }
  
}}
