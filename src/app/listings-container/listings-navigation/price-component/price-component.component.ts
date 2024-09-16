import { Component, inject } from '@angular/core';
import { minimumPricesArray, maximumPricesArray } from '../data-array';
import { ListingFilterService } from '../../../listing.filter.service';
import { MinimumItemComponent } from './minimum-item/minimum-item.component';
import { MaximumItemComponent } from './maximum-item/maximum-item.component';

@Component({
  selector: 'app-price-component',
  standalone: true,
  imports: [MinimumItemComponent, MaximumItemComponent],
  templateUrl: './price-component.component.html',
  styleUrl: './price-component.component.css'
})
export class PriceComponentComponent{
service=inject(ListingFilterService);
minimumPricesArray=minimumPricesArray;
maximumPricesArray=maximumPricesArray;

minPriceInput=this.service.minPriceInput
maxPriceInput=this.service.maxPriceInput;
selectedPricesarray=this.service.selectedPricesarray;

handleClickeventLeft=this.service.handleClickeventLeft;
handleClickeventRight=this.service.handleClickeventRight;
updateFiltersObjectstorage=this.service.updateFiltersObjectstorage


handlePricesSubmission(event:Event, field:string, array:string[]){
  event.preventDefault();
  if(Number(this.minPriceInput.replace(",", ""))>=Number(this.maxPriceInput.replace(",", ""))){
      window.alert("მინიმალური ფასი არ შეიძლება იყოს მაქსიმალურ ფასზე მეტი, გთხოვთ შეასწორეთ!");
      return
  } else {

     this.updateFiltersObjectstorage(field, array)
  }
}


}
