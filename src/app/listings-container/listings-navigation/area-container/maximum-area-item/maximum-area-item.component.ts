import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { MainService } from '../../../../core/main-service.service';
import { AreaService } from '../area-service.service';

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

handleClick(e:Event){
  const target=e.target as HTMLElement;
let content=target.textContent;
  if(content!=null){
      this.maxArea.nativeElement.value=content;
      this.areaService.maxArea.set(content)
  }}
}
