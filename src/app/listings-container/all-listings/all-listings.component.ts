import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { environment } from '../../../environment/environment.prod';
import { MainService } from '../../core/main-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-all-listings',
  standalone: true,
  imports: [CommonModule],
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

 
ngOnInit(): void {
  // localStorage.clear();
  this.isBeingLoaded.set(true);
let subscriptions=this.apiService.fetchDataWithToken('real-estates', environment.MY_KEY).
subscribe({
next:(response)=>{
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
}
