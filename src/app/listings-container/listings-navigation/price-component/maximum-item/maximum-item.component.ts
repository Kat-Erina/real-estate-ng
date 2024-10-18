import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { PriceService } from '../priceService.service';

@Component({
  selector: 'app-maximum-item',
  standalone: true,
  imports: [],
  templateUrl: './maximum-item.component.html',
  styleUrl: './maximum-item.component.css'
})
export class MaximumItemComponent {
@Input() price!:string

priceService=inject(PriceService);
@ViewChild('maximumPrice') maximumPrice!: ElementRef;
handleClick(e:Event){
  const target=e.target as HTMLElement;
  let content=target.textContent;
  if(content!=null){
    this.maximumPrice.nativeElement.value=content;
    this.priceService.maxPrice.set(content)
  }}
}
