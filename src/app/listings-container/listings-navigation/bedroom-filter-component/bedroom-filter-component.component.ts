import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ListingFilterService } from '../../../listing.filter.service';

@Component({
  selector: 'app-bedroom-filter-component',
  standalone: true,
  imports: [],
  templateUrl: './bedroom-filter-component.component.html',
  styleUrl: './bedroom-filter-component.component.css'
})
export class BedroomFilterComponentComponent implements OnInit {
  service=inject(ListingFilterService);
  updateFilterObjectWithBedroom=this.service.updateFilterObjectWithBedroom;
  selectedBedroom=this.service.selectedBedroom;
  @ViewChild('bedroom') bedroom!: ElementRef


onChange(e:Event){
  e.preventDefault()
  const inputValue=this.bedroom.nativeElement.value;
  this.selectedBedroom=inputValue
}

ngOnInit(): void {
  // window.localStorage.clear()
}
handleBedroomSelection(event:Event) {
  event.preventDefault()
  if(this.selectedBedroom.length===0){
  window.alert("გთხოვთ მიუთითოთ საძინებლების რაოდენობა");
 
} 
else if(!Number(this.selectedBedroom)){window.alert("გთხოვთ მიუტითეთ ციფრი")}
else {this.updateFilterObjectWithBedroom('bedroom', this.selectedBedroom);
}
}
}
