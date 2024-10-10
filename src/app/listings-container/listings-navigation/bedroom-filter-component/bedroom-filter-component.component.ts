import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ListingFilterService } from '../../../core/listing.filter.service'; 

@Component({
  selector: 'app-bedroom-filter-component',
  standalone: true,
  imports: [],
  templateUrl: './bedroom-filter-component.component.html',
  styleUrl: './bedroom-filter-component.component.css'
})
export class BedroomFilterComponentComponent {
  service=inject(ListingFilterService);
  allowToClear=this.service.allowToClear
  chosenField=this.service.chosenField
  selectedBedroom=this.service.selectedBedroom;
  updateFiltersObjectstorage=this.service.updateFiltersObjectstorage
  @ViewChild('bedroom') bedroom!: ElementRef


onChange(e:Event){
  e.preventDefault()
  const inputValue=this.bedroom.nativeElement.value;
  this.selectedBedroom.set(inputValue)
}


handleBedroomSelection() {
  // event.preventDefault()
  if(this.selectedBedroom().length===0){
  window.alert("გთხოვთ მიუთითოთ საძინებლების რაოდენობა");
 
} 
else if(!Number(this.selectedBedroom())){window.alert("გთხოვთ მიუთითეთ ციფრი")}
else {this.updateFiltersObjectstorage('bedroom', this.selectedBedroom());
}
}
}
