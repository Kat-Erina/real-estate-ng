import { Component, inject } from '@angular/core';
import { ListingsNavigationComponent } from './listings-navigation/listings-navigation.component';
import { CommonModule } from '@angular/common';
import { Service } from '../core/services.service';
import { AllListingsComponent } from './all-listings/all-listings.component';
// import { MainService } from '../core/main-service.service';

@Component({
  selector: 'app-listings-container',
  standalone: true,
  imports: [ListingsNavigationComponent, CommonModule, AllListingsComponent],
  templateUrl: './listings-container.component.html',
  styleUrl: './listings-container.component.css'
})
export class ListingsContainerComponent {
service=inject(Service)

}
