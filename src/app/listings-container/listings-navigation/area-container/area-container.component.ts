import { Component, inject } from '@angular/core';
import { ListingFilterService } from '../../../core/listing.filter.service'; 
import { minimumAreaArray, maximumAreaArray } from '../../../core/data-array';
import { MinimumAreaItemComponent } from './minimum-area-item/minimum-area-item.component';
import { MaximumAreaItemComponent } from './maximum-area-item/maximum-area-item.component';

@Component({
  selector: 'app-area-container',
  standalone: true,
  imports: [MinimumAreaItemComponent, MaximumAreaItemComponent],
  templateUrl: './area-container.component.html',
  styleUrl: './area-container.component.css'
})
export class AreaContainerComponent {
service=inject(ListingFilterService);
minAreaInput=this.service.minAreaInput;
maxAreaInput=this.service.maxAreaInput;
minimumAreaArray=minimumAreaArray;
maximumAreaArray=maximumAreaArray;

selectedAreaArrays=this.service.selectedAreaArrays;
listings=this.service.listings;
filteringListings=this.service.filteringListings;
areaPreviousData=this.service.areaPreviousData
// previousData=this.service.previousData;
handleClickeventLeft=this.service.handleClickeventLeft
handleClickeventRight=this.service.handleClickeventRight;
updateFiltersObjectstorage=this.service.updateFiltersObjectstorage;
allowToClear=this.service.allowToClear
chosenField=this.service.chosenField;

handleAreasSubmission( field:string, array:string[]){
  if(this.minAreaInput()===" " || this.maxAreaInput() === " ")
    window.alert("გთხოვთ მიუთითოთ ფართობი")
  else if(Number(this.minAreaInput().replace(",", ""))>=Number(this.maxAreaInput().replace(",", ""))){
      window.alert("გთხოვთ შეიყვანოთ ვალიდური რიცხვები");
      return
  } else {
   
const minArea = Number(this.minAreaInput());
const maxArea = Number(this.maxAreaInput());

this.areaPreviousData.set(this.filteringListings());
console.log('area data', this.areaPreviousData())
let newarray=this.filteringListings().filter((listing:any)=>{
  return (listing.area >= minArea && listing.area <= maxArea) 
    })
   console.log(newarray)
    this.filteringListings.set(newarray)
    this.updateFiltersObjectstorage(field, array)
  }
}

}
