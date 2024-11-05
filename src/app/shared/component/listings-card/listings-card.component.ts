import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listings-card',
  standalone: true,
  imports: [],
  templateUrl: './listings-card.component.html',
  styleUrl: './listings-card.component.css'
})
export class ListingsCardComponent {
@Input() listing:any;
}
