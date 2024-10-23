import { Component, inject, OnInit } from '@angular/core';
import { MainService } from '../core/main-service.service';
import { ListingsCardComponent } from '../listings-container/all-listings/listings-card/listings-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [ListingsCardComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit {
mainService=inject(MainService);
sliderListings=this.mainService.sliderListings;
router=inject(Router)

ngOnInit(): void {
  console.log(this.sliderListings())
}

handleClick(id:string){
  console.log('lala')
  console.log(id);
this.router.navigate(['card', id], { replaceUrl: true })
}
}
