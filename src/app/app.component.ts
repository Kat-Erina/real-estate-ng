import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { HeaderComponent } from './listings-container/header/header.component';
import { ListingsContainerComponent } from './listings-container/listings-container.component';
import { ListingsModalComponent } from './listings-modal/listings-modal.component';
import { HeaderComponent } from './listings-container/header/header.component';
import { Service } from './core/services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListingsContainerComponent, ListingsModalComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'real-estate-project-ng';
  service=inject(Service);
}
