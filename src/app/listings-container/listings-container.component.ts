import { Component, inject } from '@angular/core';
import { ListingsNavigationComponent } from './listings-navigation/listings-navigation.component';
import { CommonModule } from '@angular/common';
import { Service } from '../core/services.service';
// import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-listings-container',
  standalone: true,
  imports: [ListingsNavigationComponent, CommonModule],
  templateUrl: './listings-container.component.html',
  styleUrl: './listings-container.component.css'
})
export class ListingsContainerComponent {
service=inject(Service)
}
