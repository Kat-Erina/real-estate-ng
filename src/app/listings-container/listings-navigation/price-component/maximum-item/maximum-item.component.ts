import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { PriceService } from '../priceService.service';
import { MainService } from '../../../../core/main-service.service';

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
mainService=inject(MainService);
noFilteredListings=this.mainService.noFilteredListings

}
