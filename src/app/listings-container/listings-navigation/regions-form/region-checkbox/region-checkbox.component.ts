import { Component, inject, Input, input } from '@angular/core';
import { RegionObject } from '../../../../core/types';
import { ListingFilterService } from '../../../../core/listing.filter.service';

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
