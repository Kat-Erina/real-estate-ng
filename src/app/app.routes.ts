import { Routes } from '@angular/router';
import { ListingsModalComponent } from './listings-modal/listings-modal.component';


export const routes: Routes = [
    {path:"", 
        loadComponent:()=>
            import('./listings-container/listings-container.component').then((comp)=>comp.ListingsContainerComponent)
    },
    {path:"listing-modal", 
        // component:ListingsModalComponent
        loadComponent:()=>import('./listings-modal/listings-modal.component').then((comp)=>comp.ListingsModalComponent)
    }
];
