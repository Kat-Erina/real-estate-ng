import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { environment } from '../../../environment/environment.prod';
import { ListingFilterService } from '../../core/listing.filter.service';

@Component({
  selector: 'app-all-listings',
  standalone: true,
  imports: [],
  templateUrl: './all-listings.component.html',
  styleUrl: './all-listings.component.css'
})
export class AllListingsComponent implements OnInit {
  apiService=inject(ApiService);
  mainService=inject(ListingFilterService);
  
loadAllListings(){
let subscribtions=this.apiService.fetchDataWithToken('real-estates', environment.MY_KEY).subscribe((response)=>{console.log(response);
  this.mainService.listings.set(response)
})  
}

ngOnInit(): void {
// localStorage.clear();
  this.loadAllListings();

}
}
