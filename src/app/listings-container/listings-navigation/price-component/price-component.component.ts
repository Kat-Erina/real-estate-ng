import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { minimumPricesArray, maximumPricesArray } from '../../../core/data-array';
import { ListingFilterService } from '../../../core/listing.filter.service'; 
import { MinimumItemComponent } from './minimum-item/minimum-item.component';
import { MaximumItemComponent } from './maximum-item/maximum-item.component';

@Component({
  selector: 'app-price-component',
  standalone: true,
  imports: [MinimumItemComponent, MaximumItemComponent],
  templateUrl: './price-component.component.html',
  styleUrl: './price-component.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PriceComponentComponent{
service=inject(ListingFilterService);
chosenField=this.service.chosenField
minimumPricesArray=minimumPricesArray;
maximumPricesArray=maximumPricesArray;

minPriceInput=this.service.minPriceInput
maxPriceInput=this.service.maxPriceInput;
selectedPricesarray=this.service.selectedPricesarray;


handleClickeventLeft=this.service.handleClickeventLeft;
handleClickeventRight=this.service.handleClickeventRight;
updateFiltersObjectstorage=this.service.updateFiltersObjectstorage;
allowToClear=this.service.allowToClear;

listings=this.service.listings;
filteringListings=this.service.filteringListings;


handlePricesSubmission( field:string, array:string[]){
  if(this.minPriceInput()===" " || this.maxPriceInput() === " ")
       { window.alert("გთხოვთ მიუთითოთ ფასები")}
  

  else if(Number(this.minPriceInput().replace(",", ""))>=Number(this.maxPriceInput().replace(",", ""))){
      window.alert("გთხოვთ შეიყვანოთ ვალიდური რიცხვები");
      return
  } else {

     this.updateFiltersObjectstorage(field, array)
    
  }
}


}
