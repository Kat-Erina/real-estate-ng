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
    isChecked=false;
}
