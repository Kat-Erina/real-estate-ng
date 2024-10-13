import { HttpClient } from "@angular/common/http";
import { inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";

@Injectable({'providedIn':"root"})
export class ListingFilterService{
    chosenField=signal("")
    httpRequest=inject(HttpClient);
    selectedRegionsarray=signal<string[]>([])

    minPriceInput=signal(' ')
    maxPriceInput=signal(' ')
    minAreaInput=signal(' ')
    maxAreaInput=signal(' ')
    selectedPricesarray=signal<string[]>([])
    selectedAreaArrays=signal<string[]>([])
    selectedBedroom=signal<string>('')
    allowToClear=signal<boolean>(false);
    listings=signal([]);
    filteringListings=signal([]);
stateObject:{[key:string]:boolean}= {
region:false,
prices:false,
area:false,
bedrooms:false
}




toggle(target:string, e:Event){
  let  eTarget=e.target as HTMLElement;
console.log(eTarget)
    console.log(target)
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
                return this.chosenField()
      }

togglechevron(e:Event){
    let target=e.target as HTMLElement;
    console.log(target)
}

handleClickeventLeft(e:Event,minInput:WritableSignal<string>, array:WritableSignal<string[]>, maxInput:WritableSignal<string> ){
   const target=e.target as HTMLElement;
    let content=target.textContent;
   if(content!=null){
            minInput.set(content);
           array.set([content, maxInput()])
           }
    }


handleClickeventRight(e:Event, maxInput:WritableSignal<string>, array:WritableSignal<string[]>, minInput:WritableSignal<string>){
    const target=e.target as HTMLElement;
     let content=target.textContent;
     if(content!=null){
        maxInput.set(content);
            array.set([minInput(), content])
        }
 }


updateFiltersObjectstorage(field:string, array:string[]|string){
    let updatedObj={regions:[],
            price_range:[],
            area:[],
            bedrooms:""}

    let obj=window.localStorage.getItem('savedObject');
        if(obj){
            let fetchedObj= JSON.parse(obj)
            updatedObj={...fetchedObj, [field]:array}
            console.log(array, field)
         window.localStorage.setItem('savedObject',JSON.stringify(updatedObj))
    }
    else {
        
        updatedObj={...updatedObj, [field]:array};
      
        window.localStorage.setItem('savedObject',JSON.stringify(updatedObj));

    }
    //  this.filteringListings=this.listings();
    console.log(array)
    if(field==='bedrooms'){
        let newListingsarray=this.listings().filter((el:any)=>{
            console.log(el[field])
           return el[field]==array});
            this.filteringListings.set(newListingsarray)
            console.log(this.filteringListings())
            console.log(newListingsarray)
    }
    else if(field==='area'){
       let [minArea, maxarea]=array;
       console.log(minArea, maxarea);
       let newListingsarray=this.listings().filter((el:any)=>{
        console.log(el[field])
       return el[field][0]==minArea || el[field][0]>minArea && el[field][1]<maxarea || el[field][1]==maxarea});
        this.filteringListings.set(newListingsarray)
        console.log(this.filteringListings())
        console.log(newListingsarray)
    }
    else if(field==='price'){
        let [minPrice, maxPice]=array;
        console.log(minPrice, maxPice);
        let newListingsarray=this.listings().filter((el:any)=>{
         console.log(el[field])
        return el[field][0]==minPrice || el[field][0]>minPrice && el[field][1]<maxPice || el[field][1]==maxPice});
         this.filteringListings.set(newListingsarray)
         console.log(this.filteringListings())
         console.log(newListingsarray)
     }
    //  else if(field==='regions'){
        
    //     console.log(array);
    //     console.log(array.length);
    //     for(let i=0; i<array.length; i++){}
    // //     let newListingsarray=this.listings().filter((el:any)=>{
          
    // //      console.log(field)
    // //      console.log(el.city.region)
    // //  });
    //     //  this.filteringListings.set(newListingsarray)
    //     //  console.log(this.filteringListings())
    //     //  console.log(newListingsarray)
    //  }

    
   
this.allowToClear.set(true)
this.chosenField.set("");

}



// filterListings(name:string, data:any[]){
//  console.log(name);
//  if(name==="bedrooms"){
    
//  }
// }




}