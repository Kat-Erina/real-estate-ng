import { Component, inject, Input, input } from '@angular/core';
import { RegionObject } from '../../../../types';
import { ListingFilterService } from '../../../../listing.filter.service';

@Component({
  selector: 'app-region-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './region-checkbox.component.html',
  styleUrl: './region-checkbox.component.css'
})
export class RegionCheckboxComponent {
  @Input() region!:RegionObject;
  service=inject(ListingFilterService);
  selectedRegionsarray=this.service.selectedRegionsarray;

  selectedRegionValue='';
  isChecked=false;

toggle(el:any){
  let value=el.target.value;
  console.log(value)
  if(!this.selectedRegionsarray.includes(value)){
    this.selectedRegionsarray.push(value);
    console.log(this.selectedRegionsarray)
} else {
 this.selectedRegionsarray=this.selectedRegionsarray.filter((el)=>{return value!=el});
  console.log(this.selectedRegionsarray)
}
}

handleSubmit(){}

}
