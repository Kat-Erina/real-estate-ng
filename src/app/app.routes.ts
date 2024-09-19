import { Routes } from '@angular/router';
import { ListingsContainerComponent } from './listings-container/listings-container.component';
import { ListingsModalComponent } from './listings-modal/listings-modal.component';

export const routes: Routes = [
    {path:"", 
        component:ListingsContainerComponent
    },
    {path:"listing-modal", 
        component:ListingsModalComponent
    }
];
