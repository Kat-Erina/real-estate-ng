import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RegionCheckboxComponent } from './region-checkbox/region-checkbox.component';
import { RegionObject } from '../../../types';


@Component({
  selector: 'app-regions-form',
  standalone: true,
  imports: [RegionCheckboxComponent],
  templateUrl: './regions-form.component.html',
  styleUrl: './regions-form.component.css'
})
export class RegionsFormComponent {
httpRequest=inject(HttpClient);
destroyRef=inject(DestroyRef);
regions=signal<RegionObject []>([])


ngOnInit(): void {
 let subscription= this.httpRequest.get<RegionObject[]>('https://api.real-estate-manager.redberryinternship.ge/api/regions').subscribe(
    {next:(response)=>{console.log(response);
      this.regions.set(response)
    }})


this.destroyRef.onDestroy(()=>{subscription.unsubscribe()})
}

}

