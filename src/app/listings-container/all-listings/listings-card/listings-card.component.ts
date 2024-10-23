import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listings-card',
  standalone: true,
  imports: [],
  templateUrl: './listings-card.component.html',
  styleUrl: './listings-card.component.css'
})
export class ListingsCardComponent {
@Input() listing:any;

handleClick(id:string){
  console.log(id);
  console.log('lala')
}
}
