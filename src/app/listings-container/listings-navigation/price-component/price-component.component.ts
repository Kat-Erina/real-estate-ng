import {  Component,  inject, signal } from '@angular/core';
import { minimumPricesArray, maximumPricesArray } from '../../../core/data-array';
import { MainService } from '../../../core/main-service.service'; 
import { MinimumItemComponent } from './minimum-item/minimum-item.component';
import { MaximumItemComponent } from './maximum-item/maximum-item.component';
import { ReceivedListingObject } from '../../../core/types';
import { PriceService } from './priceService.service';

@Component({
  selector: 'app-price-component',
  standalone: true,
  imports: [MinimumItemComponent, MaximumItemComponent],
  templateUrl: './price-component.component.html',
  styleUrl: './price-component.component.css',
  providers:[PriceService],
})
export class PriceComponentComponent{
service=inject(MainService);
priceService=inject(PriceService);
chosenField=this.service.chosenField
minimumPricesArray=minimumPricesArray;
maximumPricesArray=maximumPricesArray;
stateObject=this.service.stateObject
minPriceInput=signal(" ");
maxPriceInput=signal(" ");
selectedPricesarray=this.service.selectedPricesarray;
updateFiltersObjectstorage=this.service.updateFiltersObjectstorage;
allowToClear=this.service.allowToClear;
filteringListings=this.service.filteringListings;
noFilteredListings=this.service.noFilteredListings


handlePricesSubmission( field:string){
this.minPriceInput.set(this.priceService.minPrice());
this.maxPriceInput.set(this.priceService.maxPrice());
this.selectedPricesarray.set([this.minPriceInput(), this.maxPriceInput()]);

  if(this.minPriceInput()===" " || this.maxPriceInput() === " ")
       { window.alert("გთხოვთ მიუთითოთ ფასები")}
  else if(Number(this.minPriceInput().replace(",", ""))>=Number(this.maxPriceInput().replace(",", ""))){
      window.alert("გთხოვთ შეიყვანოთ ვალიდური რიცხვები");
      return
  } else {
  const minPrice = Number(this.minPriceInput().split(",").join(""));
  const maxPrice = Number(this.maxPriceInput().split(",").join(""));
   let newarray=this.filteringListings().filter((listing:ReceivedListingObject)=>{
  return (listing.price >= minPrice && listing.price <= maxPrice) 
    })
    this.filteringListings.set(newarray);
    this.updateFiltersObjectstorage(field, this.selectedPricesarray());
    if(newarray.length==0){this.noFilteredListings.set(true);
    }
  }
}


}
