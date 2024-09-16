import { Component, inject, OnInit } from '@angular/core';
import { ListingFilterService } from '../../../listing.filter.service';
import { FiletersObject } from '../../../types';

@Component({
  selector: 'app-filteres-container',
  standalone: true,
  imports: [],
  templateUrl: './filteres-container.component.html',
  styleUrl: './filteres-container.component.css'
})
export class FilteresContainerComponent  {
  service=inject(ListingFilterService);
fetchedObject=window.localStorage.getItem('savedObject')
filteresObj?:FiletersObject|string
 
  ngOnInit(): void {
    if(this.fetchedObject){
      this.filteresObj=JSON.parse(this.fetchedObject)
      console.log(this.filteresObj)

    }
    else this.filteresObj=this.service.savedFilteresObj
    console.log(this.service.savedFilteresObj)
    console.log(this.fetchedObject)
  }
}
