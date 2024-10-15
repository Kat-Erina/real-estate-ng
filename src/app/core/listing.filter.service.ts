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
    bedroomsPreviousData=signal([]);
    areaPreviousData=signal([]);
    pricePreviousData=signal([]);
    regionsPreviousData=signal([]);
stateObject:{[key:string]:boolean}= {
region:false,
prices:false,
area:false,
bedrooms:false
}
fetchedFilteredObject=signal({})




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
    // let updatedObj={regions:[],
    //         price_range:[],
    //         area:[],
    //         bedrooms:""}
    let updatedObj={}

    let obj=window.localStorage.getItem('savedObject');
        if(obj){
            let fetchedObj= JSON.parse(obj)
            updatedObj={...fetchedObj, [field]:array}
            // console.log(array, field)
            console.log(updatedObj)
         window.localStorage.setItem('savedObject',JSON.stringify(updatedObj))
    }
    else {
        
        updatedObj={...updatedObj, [field]:array};
      
        window.localStorage.setItem('savedObject',JSON.stringify(updatedObj));

    }
   
    
   
this.allowToClear.set(true)
this.chosenField.set("");

}









}