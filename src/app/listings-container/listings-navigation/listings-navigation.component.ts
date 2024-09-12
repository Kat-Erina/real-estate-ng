import { Component } from '@angular/core';
import { FilteresContainerComponent } from './filteres-container/filteres-container.component';
import { RegionsFormComponent } from './regions-form/regions-form.component';

@Component({
  selector: 'app-listings-navigation',
  standalone: true,
  imports: [FilteresContainerComponent, RegionsFormComponent],
  templateUrl: './listings-navigation.component.html',
  styleUrl: './listings-navigation.component.css'
})
export class ListingsNavigationComponent {

}
