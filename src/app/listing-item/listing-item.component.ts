import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { ApiService } from '../core/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../core/confirm-dialog/confirm-dialog.component';
import { MainService } from '../core/main-service.service';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../slider/slider.component';
import { ReceivedListingObject, FetchedListingObject, defaultReceivedObject } from '../core/types';


@Component({
  selector: 'app-listing-item',
  standalone: true,
  imports: [CommonModule, SliderComponent, RouterModule],
  templateUrl: './listing-item.component.html',
  styleUrl: './listing-item.component.css'
})
export class ListingItemComponent implements OnInit {
router=inject(Router);
activatedRoute=inject(ActivatedRoute);
itemId=signal<any>('');
apiService=inject(ApiService);
mainService=inject(MainService);
item=signal<FetchedListingObject>(defaultReceivedObject);
dialog=inject(MatDialog);
isDeleted=signal(false);
deletedItemsArray=signal<string[]>([]);
destroyRef=inject(DestroyRef);
sliderListings=this.mainService.sliderListings;
filteringListings=this.mainService.filteringListings;
day=signal('');
month=signal('');
year=signal('');




fetchData(name:string){
let subscribion=this.apiService.fetchDataWithToken(name).subscribe({
  next:(response)=> {this.item.set(response);
  console.log(this.item())
const date = new Date(this.item().created_at);
this.day.set(String(date.getUTCDate()).padStart(2, '0')); 
this.month.set(String(date.getUTCMonth() + 1).padStart(2, '0'));
this.year.set(String(date.getUTCFullYear()))



  },
   error:(error:Error)=>{console.log(error)}
})

this.destroyRef.onDestroy(()=>subscribion.unsubscribe())}

loadallListings(){
 let subscription= this.apiService.fetchDataWithToken('real-estates').subscribe(response=>{
    this.sliderListings.set(response.filter((listing:ReceivedListingObject)=>listing.id!=Number(this.itemId())));
  })

  this.destroyRef.onDestroy(()=>subscription.unsubscribe())
}
ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(
    {
    next:(paramMap:ParamMap)=>{this.itemId.set(paramMap.get('id')),
       this.fetchData(`real-estates/${this.itemId()}`)
       this.loadallListings();
 }
  })
let fetchedDeletedItems=window.localStorage.getItem('deletedItems');

if(fetchedDeletedItems){
 this.deletedItemsArray.set(JSON.parse(fetchedDeletedItems));
if(this.deletedItemsArray().includes(this.itemId())) this.router.navigate(['']);
   else  this.fetchData(`real-estates/${this.itemId()}`);
}
else  this.fetchData(`real-estates/${this.itemId()}`);
 }

openConfimDialog(){
 let dialog=this.dialog.open(ConfirmDialogComponent, {
    height: '100px',
    width: '600px',
       data:{question: 'გსურს წაშალო ლისტინგი?'}
}, )

dialog.afterClosed().subscribe((result)=>{
  if(result){
   this.isDeleted.set(result)
   let deletSubscription=this.apiService.deleteListing(this.itemId()).subscribe({
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
    },
  })

  this.destroyRef.onDestroy(()=>{subscription.unsubscribe(), deletSubscription.unsubscribe()})
  }})
}

navigate(){
  this.router.navigate(['']);
}
}
