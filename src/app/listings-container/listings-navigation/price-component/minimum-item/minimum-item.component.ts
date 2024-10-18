import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { PriceService } from '../priceService.service';

@Component({
  selector: 'app-minimum-item',
  standalone: true,
  imports: [],
  templateUrl: './minimum-item.component.html',
  styleUrl: './minimum-item.component.css'
})
export class MinimumItemComponent {
@Input() price!:string
priceService=inject(PriceService);
@ViewChild('minimumPrice') minimumPrice!: ElementRef;

handleClick(e:Event){
 

  const target=e.target as HTMLElement;
  console.log(target)
  let content=target.textContent;
  console.log(content)
    if(content!=null){
        this.minimumPrice.nativeElement.value=content;
        this.priceService.minPrice.set(content)
    }
}}
