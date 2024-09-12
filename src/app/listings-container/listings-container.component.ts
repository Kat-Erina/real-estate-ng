import { Component } from '@angular/core';
import { ListingsNavigationComponent } from './listings-navigation/listings-navigation.component';

@Component({
  selector: 'app-listings-container',
  standalone: true,
  imports: [ListingsNavigationComponent],
  templateUrl: './listings-container.component.html',
  styleUrl: './listings-container.component.css'
})
export class ListingsContainerComponent {

}