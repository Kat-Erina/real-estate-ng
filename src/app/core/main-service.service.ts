import { Injectable, signal } from "@angular/core";
import { FiletersObject, ReceivedListingObject } from "./types";

@Injectable({'providedIn':"root"})
export class MainService{
chosenField=signal("")
selectedRegionsarray=signal<string[]>([])
selectedPricesarray=signal<string[]>([])
selectedAreaArrays=signal<string[]>([])
selectedBedroom=signal<string>('')
allowToClear=signal<boolean>(false);
listings=signal([]);
filteringListings=signal<ReceivedListingObject[]>([]);
// satestoData=signal<ReceivedListingObject[]>([]);
sliderListings=signal<ReceivedListingObject[]>([]);
noFilteredListings=signal<boolean>(false);
stateObject:{[key:string]:boolean}= {
region:false,
price_range:false,
area:false,
bedrooms:false
};



updateFiltersObjectstorage(field:string, array:string[]|string){
   let updatedObj={}
let obj=window.localStorage.getItem('savedObject');
        if(obj){
            let fetchedObj= JSON.parse(obj)
            updatedObj={...fetchedObj, [field]:array}
          window.localStorage.setItem('savedObject',JSON.stringify(updatedObj))
    }
    else {
        updatedObj={...updatedObj, [field]:array};
      window.localStorage.setItem('savedObject',JSON.stringify(updatedObj));

    }
    this.stateObject[field]=!this.stateObject[field]; 
this.allowToClear.set(true)
this.chosenField.set("");
}

handleClick(e:Event, elementRef:HTMLLIElement, input:any){
  const target=e.target as HTMLElement;
let content=target.textContent;
  if(content!=null){
      elementRef.value=Number(content);
      input.set(content);
  }}

getFilterCriteria(): FiletersObject | null {
    const filterData = localStorage.getItem('savedObject');
    if(filterData)
    return JSON.parse(filterData) 
  else return null
  }

  filterListings(array:ReceivedListingObject[]){
    this.filteringListings.set(array)
    let filters=this.getFilterCriteria();
    if(filters){
      if(filters.price_range){
        this.filteringListings.set(this.filteringListings().filter((listing:ReceivedListingObject) => { 
    let minPrice=Number(filters.price_range[0].replace(/,/g, ''));
    let maxPrice=Number(filters.price_range[1].replace(/,/g, ''));
    return listing.price >= minPrice && listing.price <= maxPrice;
      }))
     
    }
      if(filters.area){
        this.filteringListings.set(this.filteringListings().filter((listing:ReceivedListingObject) => { 
          return listing.area >= Number(filters.area[0]) && listing.area <= Number(filters.area[1]);
            }))
            
          }
           if(filters.bedrooms){
                    this.filteringListings.set(this.filteringListings().filter((listing:ReceivedListingObject) => { 
                    return listing.bedrooms === Number(filters.bedrooms);
                      }))
                      }
                      if(filters.region){
                        this.filteringListings.set(this.filteringListings().filter((listing:ReceivedListingObject) => { 
                    return filters.region.includes(listing.city.region.name)
                      }))
                      
                    }
    else if(Object.keys(filters).length===0){
        this.filteringListings.set(this.listings())
    }

}
else{this.filteringListings.set(this.listings())}
  
  }






}