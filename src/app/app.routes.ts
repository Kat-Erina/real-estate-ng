import { Routes } from '@angular/router';


export const routes: Routes = [
    {path:"", 
        loadComponent:()=>
            import('./listings-container/listings-container.component').then((comp)=>comp.ListingsContainerComponent)
    },
    {path:"listing-modal", 
        loadComponent:()=>import('./listings-modal/listings-modal.component').then((comp)=>comp.ListingsModalComponent)
    }
];
