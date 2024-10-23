import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../core/confirm-dialog/confirm-dialog.component';
import { MainService } from '../core/main-service.service';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-listing-item',
  standalone: true,
  imports: [CommonModule, SliderComponent],
  templateUrl: './listing-item.component.html',
  styleUrl: './listing-item.component.css'
})
export class ListingItemComponent implements OnInit {
router=inject(Router);
activatedRoute=inject(ActivatedRoute);
itemId=signal<any>('');
apiService=inject(ApiService);
mainService=inject(MainService);
item=signal<any>({});
dialog=inject(MatDialog);
isDeleted=signal(false);
deletedItemsArray=signal<string[]>([]);
destroyRef=inject(DestroyRef);
sliderListings=this.mainService.sliderListings;
filteringListings=this.mainService.filteringListings;



fetchData(name:string){
let subscribion=this.apiService.fetchDataWithToken(name).subscribe({
  next:(response)=> {console.log(response),this.item.set(response)},
   error:(error:Error)=>{console.log(error)}
})

this.destroyRef.onDestroy(()=>subscribion.unsubscribe())}

loadallListings(){
  this.apiService.fetchDataWithToken('real-estates').subscribe(response=>{console.log(response);
    this.sliderListings.set(response.filter((listing:any)=>listing.id!=Number(this.itemId())));
    console.log(this.sliderListings())
  })
}
ngOnInit(): void {
 
// localStorage.clear()
 this.activatedRoute.paramMap.subscribe(
    {
    next:(paramMap:ParamMap)=>{this.itemId.set(paramMap.get('id')), console.log('katoo'),
       console.log(this.itemId()), 
     this.fetchData(`real-estates/${this.itemId()}`)
       this.loadallListings();
 }
  })

let fetchedDeletedItems=window.localStorage.getItem('deletedItems');

if(fetchedDeletedItems){
 this.deletedItemsArray.set(JSON.parse(fetchedDeletedItems));
if(this.deletedItemsArray().includes(this.itemId()))  this.isDeleted.set(true)
   else  this.fetchData(`real-estates/${this.itemId()}`);
}
else  this.fetchData(`real-estates/${this.itemId()}`);

 }

openConfimDialog(){
 let dialog=this.dialog.open(ConfirmDialogComponent, {
    height: '400px',
    width: '600px',
       data:{question: 'გსურს წაშალო ლისტინგი?'}
}, )

dialog.afterClosed().subscribe((result)=>{
  if(result){
   this.isDeleted.set(result)
    this.apiService.deleteListing(this.itemId()).subscribe({
      next:()=>{
       this.deletedItemsArray.set([...this.deletedItemsArray(), this.itemId()])
          window.localStorage.setItem('deletedItems', JSON.stringify(this.deletedItemsArray()))
           },
      error:(error:Error)=>{console.log(error)}
    })
    let subscription=this.apiService.fetchDataWithToken('real-estates').
    subscribe({
    next:(response)=>{
    this.mainService.listings.set(response);
    // this.mainService.filteringListings.set(response)  ;
     },
  })

  this.destroyRef.onDestroy(()=>subscription.unsubscribe())
  

  
}})
}


}
