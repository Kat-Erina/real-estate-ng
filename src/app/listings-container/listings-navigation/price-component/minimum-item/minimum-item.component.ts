import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { PriceService } from '../priceService.service';
import { MainService } from '../../../../core/main-service.service';

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
mainService=inject(MainService);
noFilteredListings=this.mainService.noFilteredListings

}
