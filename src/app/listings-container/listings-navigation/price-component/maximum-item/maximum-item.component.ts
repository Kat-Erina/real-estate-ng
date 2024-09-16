import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-maximum-item',
  standalone: true,
  imports: [],
  templateUrl: './maximum-item.component.html',
  styleUrl: './maximum-item.component.css'
})
export class MaximumItemComponent {
@Input() price!:string
}
