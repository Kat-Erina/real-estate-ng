import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../core/confirm-dialog/confirm-dialog.component';
import { MainService } from '../core/main-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-item.component.html',
  styleUrl: './listing-item.component.css'
})
export class ListingItemComponent implements OnInit {
router=inject(Router);
activatedRoute=inject(ActivatedRoute);
itemId=signal('');
apiService=inject(ApiService);
mainService=inject(MainService);
item=signal<any>({});
dialog=inject(MatDialog);
isDeleted=signal(false);
deletedItemsArray=signal<string[]>([])


fetchData(name:string, ){
this.apiService.fetchDataWithToken(name).subscribe({
  next:(response)=> this.item.set(response),
   error:(error:Error)=>{console.log(error)}
})}

ngOnInit(): void {

 
 this.activatedRoute.paramMap.subscribe(
    {
    next:(paramMap:ParamMap)=>this.itemId.set(paramMap.get('id')!)
  })
let fetchedDeletedItems=window.localStorage.getItem('deletedItems');

if(fetchedDeletedItems){
 this.deletedItemsArray.set(JSON.parse(fetchedDeletedItems));
if(this.deletedItemsArray().includes(this.itemId()))  this.isDeleted.set(true)
   else  this.fetchData(`real-estates/${this.itemId()}`);
}
else {window.localStorage.setItem('deletedItems', JSON.stringify([]));
  this.fetchData(`real-estates/${this.itemId()}`);
}
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
    let subscriptions=this.apiService.fetchDataWithToken('real-estates').
    subscribe({
    next:(response)=>{
    this.mainService.listings.set(response);
    this.mainService.filteringListings.set(response)  ;
     },
  })
}})
}


}
