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
handleClickeventLeft=this.service.handleClickeventLeft
handleClickeventRight=this.service.handleClickeventRight;
updateFiltersObjectstorage=this.service.updateFiltersObjectstorage;
allowToClear=this.service.allowToClear
chosenField=this.service.chosenField
handleAreasSubmission(event:Event, field:string, array:string[]){
  event.preventDefault();
  if(this.minAreaInput()===" " || this.maxAreaInput() === " ")
    window.alert("გთხოვთ მიუთითოთ ფართობი")
  else if(Number(this.minAreaInput().replace(",", ""))>=Number(this.maxAreaInput().replace(",", ""))){
      window.alert("მინიმალური ფართობი არ შეიძლება იყოს მაქსიმალურ ფარტობზე მეტი, გთხოვთ შეასწორეთ!");
      return
  } else {

     this.updateFiltersObjectstorage(field, array)
  }
}

}
