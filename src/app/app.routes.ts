import { Routes } from '@angular/router';
import { AddListingComponent } from './add-listing/add-listing.component';


export const routes: Routes = [
    {path:"", 
        loadComponent:()=>
            import('./listings-container/listings-container.component').then((comp)=>comp.ListingsContainerComponent)
    },
    {path:"listing-modal", 
        // component:ListingsModalComponent
        loadComponent:()=>import('./add-listing/add-listing.component').then((comp)=>comp.AddListingComponent)
    }
];
