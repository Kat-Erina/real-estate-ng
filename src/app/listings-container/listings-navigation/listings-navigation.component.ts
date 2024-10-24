import { Component, inject } from '@angular/core';
import { FilteresContainerComponent } from './filteres-container/filteres-container.component';
import { RegionsFormComponent } from './regions-form/regions-form.component';
import { CommonModule } from '@angular/common';
import { MainService } from '../../core/main-service.service'; 
import { PriceComponentComponent } from './price-component/price-component.component';
import { AreaContainerComponent } from './area-container/area-container.component';
import { BedroomFilterComponentComponent } from './bedroom-filter-component/bedroom-filter-component.component';
import { RouterLink } from '@angular/router';
import { Service } from '../../core/services.service';

@Component({
  selector: 'app-listings-navigation',
  standalone: true,
  imports: [FilteresContainerComponent, RegionsFormComponent, CommonModule, PriceComponentComponent, AreaContainerComponent, BedroomFilterComponentComponent, RouterLink],
  templateUrl: './listings-navigation.component.html',
  styleUrl: './listings-navigation.component.css'
})
export class ListingsNavigationComponent {
agentService=inject(Service)
mainService=inject(MainService);
 stateObject=this.mainService.stateObject;
 chosenField=this.mainService.chosenField

toggle(target:string){
this.chosenField.set(target)
let allkeys=Object.keys(this.stateObject);
allkeys.forEach((el)=>{
    if(el===target){
        if(this.stateObject[el]){
            this.chosenField.set("")
        }
        this.stateObject[target]=!this.stateObject[target];
    }else if(this.stateObject[el])  {this.stateObject[el]=!this.stateObject[el]}
})
            }}
