import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-minimum-item',
  standalone: true,
  imports: [],
  templateUrl: './minimum-item.component.html',
  styleUrl: './minimum-item.component.css'
})
export class MinimumItemComponent {
@Input() price!:string
}
