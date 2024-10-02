import { Component, inject } from '@angular/core';
import { FilteresContainerComponent } from './filteres-container/filteres-container.component';
import { RegionsFormComponent } from './regions-form/regions-form.component';
import { CommonModule } from '@angular/common';
import { ListingFilterService } from '../../core/listing.filter.service'; 
import { PriceComponentComponent } from './price-component/price-component.component';
import { AreaContainerComponent } from './area-container/area-container.component';
import { BedroomFilterComponentComponent } from './bedroom-filter-component/bedroom-filter-component.component';
import { RouterLink } from '@angular/router';
import { Service } from '../../core/services.service';

@Component({
  selector: 'app-listings-navigation',
  standalone: true,
  imports: [FilteresContainerComponent, RegionsFormComponent, CommonModule, PriceComponentComponent, AreaContainerComponent, BedroomFilterComponentComponent, RouterLink],
  templateUrl: './listings-navigation.component.html',
  styleUrl: './listings-navigation.component.css'
})
export class ListingsNavigationComponent {
agentService=inject(Service)
 listingFilterService=inject(ListingFilterService);
 stateObject=this.listingFilterService.stateObject;
 chosenField=this.listingFilterService.chosenField
 toggle=this.listingFilterService.toggle

}
