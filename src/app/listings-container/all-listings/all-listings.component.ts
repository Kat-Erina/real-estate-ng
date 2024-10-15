import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { environment } from '../../../environment/environment.prod';
import { ListingFilterService } from '../../core/listing.filter.service';
import { map } from 'rxjs';
import { ReceivedListingObject } from '../../core/types';
import { JsonPipe } from '@angular/common';

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
  fetchedFilteredObject=this.mainService.fetchedFilteredObject;
  listings=this.mainService.listings;
  // filteredListings=this.mainService.filteringListings;
  filteringListings=this.mainService.filteringListings;

  getFilterCriteria(): any {
    const filterData = localStorage.getItem('savedObject');
    console.log(filterData)
    if(filterData)
    return JSON.parse(filterData) 
  }
loadAllListings(){
let subscriptions=this.apiService.fetchDataWithToken('real-estates', environment.MY_KEY).
subscribe((response)=>{
 console.log(response)
  this.listings.set(response);
  this.filteringListings.set(response);

  const filters = this.getFilterCriteria();
    console.log(filters);
    // if(filters){
    //  let keys=Object.keys(filters);
    //   console.log(keys)

    //  let datasth=response.filter((listing:ReceivedListingObject) => {
    //   console.log(listing)
    //   // Filter by region (assuming listing has a 'region' field)
    //   // for(let key of keys){
    //   //   console.log(key)
    //   //   if(key==="regions"){
    //   //     console.log('regions')
    //   //     return filters.regions.includes(listing.city.region);
    //   //   }
    //   //  else  if(key==="price_range"){
    //   //     console.log('price')
    //   //     console.log(listing.price)
    //   //     return listing.price >= Number(filters.price_range[0]) && listing.price <= Number(filters.price_range[1]);
    //   //   }
    //   // else  if(key==="area"){
    //   //     console.log('area')
    //   //     return listing.area >= filters.area[0] && listing.area <= filters.area[1];
    //   //   }
    //   // else  if(key==="bedrooms"){
    //   //     // console.log('bedrooms')
    //   //     console.log(listing.bedrooms)
    //   //     return listing.bedrooms == filters.bedrooms;
    //   //   }
    //   // }
    //  }
    // );
    // console.log(datasth);
    // this.filteringListings.set(datasth);
    // }

// console.log(this.listings())
})  
}

// getFilterCriteria(): any {
//   const filterData = localStorage.getItem('savedObject');
//   console.log(filterData)
//   return filterData ? JSON.parse(filterData) : null;
// }

ngOnInit(): void {
  let parsedData;
// localStorage.clear();

let fetched=localStorage.getItem('savedObject');
this.loadAllListings()

// console.log(fetched);
// console.log(this.filteringListings())
// console.log(this.listings())
if(fetched){
let parsedData=JSON.parse(fetched);
console.log(parsedData);

// console.log(this.filteringListings())
// let fileteredData=

}
// else{}
// this.applyFilters(this.mainService.listings(),parsedData )

}

applyFilters(listings: any, filters: any): any {
  console.log(listings, filters)
  // return this.filteringListings().filter(listing => {
  //   // Filter by region (assuming listing has a 'region' field)
  //   // const matchesRegion = filters.regions.includes(listing.city.region);

  //   console.log(listing)
  //   // const matchesPrice = listing.price >= filters.price_range[0] && listing.price <= filters.price_range[1];

 
  //   // const matchesArea = listing.area >= filters.area[0] && listing.area <= filters.area[1];

   
  //   // const matchesBedrooms = listing.bedrooms === filters.bedrooms;

  //   // // Return true if the listing matches all filters
  //   // return  matchesPrice && matchesArea && matchesBedrooms;
  // });
}

}
