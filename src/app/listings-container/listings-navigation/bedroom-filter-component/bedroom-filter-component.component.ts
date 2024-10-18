import {  Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { MainService } from '../../../core/main-service.service'; 
import { ReceivedListingObject } from '../../../core/types';

@Component({
  selector: 'app-bedroom-filter-component',
  standalone: true,
  imports: [],
  templateUrl: './bedroom-filter-component.component.html',
  styleUrl: './bedroom-filter-component.component.css'
})
export class BedroomFilterComponentComponent {
  service=inject(MainService);
  allowToClear=this.service.allowToClear
  chosenField=this.service.chosenField
  selectedBedroom=this.service.selectedBedroom;
  stateObject=this.service.stateObject;
  updateFiltersObjectstorage=this.service.updateFiltersObjectstorage;
  listings=this.service.listings;
  filteringListings=this.service.filteringListings;
  @ViewChild('bedroom') bedroom!: ElementRef

  handleBedroomSelection(e:Event){ 
  const inputValue=this.bedroom.nativeElement.value;
  console.log(inputValue)
  this.selectedBedroom.set(inputValue)
   e.preventDefault()
  if(this.selectedBedroom().length===0){
  window.alert("გთხოვთ მიუთითოთ საძინებლების რაოდენობა");
 
} 
else if(!Number(this.selectedBedroom())){window.alert("გთხოვთ მიუთითეთ ციფრი")}
else {

let newArray=this.filteringListings().filter((el:ReceivedListingObject)=>{
  return el.bedrooms==Number(this.selectedBedroom())});
this.filteringListings.set(newArray)
this.updateFiltersObjectstorage('bedrooms', this.selectedBedroom());
}
}
}
