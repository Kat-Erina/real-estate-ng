import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-maximum-area-item',
  standalone: true,
  imports: [],
  templateUrl: './maximum-area-item.component.html',
  styleUrl: './maximum-area-item.component.css'
})
export class MaximumAreaItemComponent {
@Input() area!:string
}
