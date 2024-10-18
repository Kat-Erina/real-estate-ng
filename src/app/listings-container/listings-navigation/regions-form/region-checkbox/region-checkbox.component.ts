import { Component, inject, Input, input } from '@angular/core';
import { RegionObject } from '../../../../core/types';
import { MainService } from '../../../../core/main-service.service';

@Component({
  selector: 'app-region-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './region-checkbox.component.html',
  styleUrl: './region-checkbox.component.css'
})
export class RegionCheckboxComponent {
  @Input() region!:RegionObject;
  service=inject(MainService);
  selectedRegionsarray=this.service.selectedRegionsarray;
    isChecked=false;
}
