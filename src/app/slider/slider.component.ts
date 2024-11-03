import { Component, inject, Input, signal } from '@angular/core';
import { MainService } from '../core/main-service.service';
import { ListingsCardComponent } from '../listings-container/all-listings/listings-card/listings-card.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReceivedListingObject } from '../core/types';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [ListingsCardComponent, CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
@Input() listing!:ReceivedListingObject;
mainService=inject(MainService);
sliderListings=this.mainService.sliderListings;
router=inject(Router);
index=0

handleClick(id:number){
this.router.navigate(['card', id], { replaceUrl: true })
}

moveSlide(){
if(this.sliderListings().length-1>this.index){this.index++; console.log(this.index)}
else this.index=this.index
}

moveSlideLeft(){
  if(this.index>0){this.index--; console.log(this.index)}
else this.index=this.index
}
}
