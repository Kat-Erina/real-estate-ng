import { Routes } from '@angular/router';


export const routes: Routes = [
    {path:"", 
        loadComponent:()=>
            import('./listings-container/listings-container.component').then((comp)=>comp.ListingsContainerComponent),
    },
    {path:"listing-modal", 

        loadComponent:()=>import('./add-listing/add-listing.component').then((comp)=>comp.AddListingComponent)
    }, 
    {path:"card/:id", 
        loadComponent:()=>import('./listing-item/listing-item.component').then((comp)=>comp.ListingItemComponent)
    }
];
