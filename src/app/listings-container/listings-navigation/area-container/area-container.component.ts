import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { MainService } from '../../../core/main-service.service'; 
import { minimumAreaArray, maximumAreaArray } from '../../../core/data-array';
import { MinimumAreaItemComponent } from './minimum-area-item/minimum-area-item.component';
import { MaximumAreaItemComponent } from './maximum-area-item/maximum-area-item.component';
import { ReceivedListingObject } from '../../../core/types';
import { AreaService } from './area-service.service';

@Component({
  selector: 'app-area-container',
  standalone: true,
  imports: [MinimumAreaItemComponent, MaximumAreaItemComponent],
  templateUrl: './area-container.component.html',
  styleUrl: './area-container.component.css',
  providers:[AreaService]
})
export class AreaContainerComponent {
service=inject(MainService);
areaService=inject(AreaService);
minAreaInput=signal('')
maxAreaInput=signal('')
minimumAreaArray=minimumAreaArray;
maximumAreaArray=maximumAreaArray;
selectedAreaArrays=this.service.selectedAreaArrays;
filteringListings=this.service.filteringListings;
updateFiltersObjectstorage=this.service.updateFiltersObjectstorage;
allowToClear=this.service.allowToClear
chosenField=this.service.chosenField;
stateObject=this.service.stateObject


handleAreasSubmission( field:string){
  this.minAreaInput.set(this.areaService.minArea());
  this.maxAreaInput.set(this.areaService.maxArea());


  if(this.minAreaInput()===" " || this.maxAreaInput() === '')
    window.alert("გთხოვთ მიუთითოთ ფართობი")
  else if(Number(this.minAreaInput())>=Number(this.maxAreaInput())){
      window.alert("გთხოვთ შეიყვანოთ ვალიდური რიცხვები");
      return
  } else {

this.selectedAreaArrays.set([this.minAreaInput(), this.maxAreaInput()])
let newarray=this.filteringListings().filter((listing:ReceivedListingObject)=>{
  return (listing.area >= Number(this.minAreaInput()) && listing.area <= Number(this.maxAreaInput())) 
    })
    this.filteringListings.set(newarray)
    this.updateFiltersObjectstorage(field, this.selectedAreaArrays())
  }
}

}
