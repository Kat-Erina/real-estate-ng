import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { AreaService } from '../area-service.service';
import { MainService } from '../../../../core/main-service.service';

@Component({
  selector: 'app-minimum-area-item',
  standalone: true,
  imports: [],
  templateUrl: './minimum-area-item.component.html',
  styleUrl: './minimum-area-item.component.css'
})
export class MinimumAreaItemComponent {
@Input() area!:string
@ViewChild('minArea') minArea!: ElementRef;

areaService=inject(AreaService);
mainService=inject(MainService)
noFilteredListings=this.mainService.noFilteredListings


}
