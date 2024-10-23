import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { environment } from '../../../environment/environment.prod';
import { MainService } from '../../core/main-service.service';
import { CommonModule } from '@angular/common';
import { ListingsCardComponent } from './listings-card/listings-card.component';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-all-listings',
  standalone: true,
  imports: [CommonModule, ListingsCardComponent, RouterLink],
  templateUrl: './all-listings.component.html',
  styleUrl: './all-listings.component.css'
})
export class AllListingsComponent implements OnInit {
  apiService=inject(ApiService);
  mainService=inject(MainService);
  listings=this.mainService.listings;
  filteringListings=this.mainService.filteringListings;
  getFilterCriteria=this.mainService.getFilterCriteria;
  filterListings=this.mainService.filterListings;
  satestoData=this.mainService.satestoData;
  destroyRef=inject(DestroyRef);
  isBeingLoaded=signal(false);
  router=inject(Router);
  sliderListings=this.mainService.sliderListings;

 
ngOnInit(): void {
  // localStorage.clear();
  this.isBeingLoaded.set(true);
let subscriptions=this.apiService.fetchDataWithToken('real-estates').
subscribe({
next:(response)=>{
  console.log(response)
this.listings.set(response);
console.log(this.listings())
this.filterListings(this.listings())  

},
error:(error:Error)=>{console.log(error)},
complete:()=>{
this.isBeingLoaded.set(false);
}
})
this.destroyRef.onDestroy(()=>subscriptions.unsubscribe())
}

handleClick(id:number){
  let newArray=this.filteringListings().filter((listing:any)=>listing.id!=id);
  console.log(newArray);
  this.sliderListings.set(newArray);
  console.log(this.sliderListings())
this.router.navigate(['card', id, { replaceUrl: true }])
  console.log(id)
}
}
