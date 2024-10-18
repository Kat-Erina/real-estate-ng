import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { MainService } from '../../../../core/main-service.service';
import { AreaService } from '../area-service.service';

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


handleClick(e:Event){
  console.log('kii')
    const target=e.target as HTMLElement;
    console.log(target)
    let content=target.textContent;
    if(content!=null){
        this.minArea.nativeElement.value=content;
        this.areaService.minArea.set(content)
        console.log(this.minArea.nativeElement.value)
    }}
}
