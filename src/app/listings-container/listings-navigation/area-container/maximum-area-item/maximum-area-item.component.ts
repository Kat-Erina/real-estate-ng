import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { AreaService } from '../area-service.service';
import { MainService } from '../../../../core/main-service.service';

@Component({
  selector: 'app-maximum-area-item',
  standalone: true,
  imports: [],
  templateUrl: './maximum-area-item.component.html',
  styleUrl: './maximum-area-item.component.css'
})
export class MaximumAreaItemComponent {
@Input() area!:string;
areaService=inject(AreaService);
@ViewChild('maxArea') maxArea!: ElementRef;
mainService=inject(MainService);
noFilteredListings=this.mainService.noFilteredListings

}
