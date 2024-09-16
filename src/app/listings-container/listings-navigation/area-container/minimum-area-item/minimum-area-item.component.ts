import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-minimum-area-item',
  standalone: true,
  imports: [],
  templateUrl: './minimum-area-item.component.html',
  styleUrl: './minimum-area-item.component.css'
})
export class MinimumAreaItemComponent {
@Input() area!:string
}
