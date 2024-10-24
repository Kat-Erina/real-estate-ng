import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { MainService } from '../../core/main-service.service';
import { CommonModule } from '@angular/common';
import { ListingsCardComponent } from './listings-card/listings-card.component';
import { Router, RouterLink } from '@angular/router';
import { ReceivedListingObject } from '../../core/types';


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
  destroyRef=inject(DestroyRef);
  isBeingLoaded=signal(false);
  router=inject(Router);
  sliderListings=this.mainService.sliderListings;
  noDataFound=signal(false);
  noFilteredListings=this.mainService.noFilteredListings

 
ngOnInit(): void {
  this.isBeingLoaded.set(true);
let subscriptions=this.apiService.fetchDataWithToken('real-estates').
subscribe({
next:(response)=>{
  if(response.length<1){
    this.noDataFound.set(true)
  }
this.listings.set(response);
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
  let newArray=this.filteringListings().filter((listing:ReceivedListingObject)=>listing.id!=id);
  this.sliderListings.set(newArray);
this.router.navigate(['card', id, { replaceUrl: true }])
}
}
