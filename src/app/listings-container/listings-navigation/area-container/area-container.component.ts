import { Component, inject } from '@angular/core';
import { ListingFilterService } from '../../../listing.filter.service';
import { minimumAreaArray, maximumAreaArray } from '../data-array';
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
selectedAreaArrays=this.service.selectedAreaArrays

handleClickeventLeftArea=this.service.handleClickeventLeftArea;
handleClickeventRightArea=this.service.handleClickeventRightArea;

updateFiltersWithAreaObjectstorage=this.service.updateFiltersWithAreaObjectstorage;

handleAreasSubmission(event:Event, field:string, array:string[]){
  event.preventDefault();
  if(Number(this.minAreaInput.replace(",", ""))>=Number(this.maxAreaInput.replace(",", ""))){
      window.alert("მინიმალური ფართობი არ შეიძლება იყოს მაქსიმალურ ფარტობზე მეტი, გთხოვთ შეასწორეთ!");
      return
  } else {

     this.updateFiltersWithAreaObjectstorage(field, array)
  }
}

}
