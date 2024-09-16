import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { RegionObject } from "./types";
import { FiletersObject } from "./types";

@Injectable({'providedIn':"root"})
export class ListingFilterService{
    chosenField?:string
    httpRequest=inject(HttpClient);
    selectedRegionsarray:string[]=[];

    stateObject:{[key:string]:boolean}= {
        region:false,
        prices:false,
        area:false,
        bedroom:false
       }
       savedFilteresObj!:FiletersObject

minPriceInput=' '
maxPriceInput=' '
minAreaInput=' '
maxAreaInput=' '
selectedPricesarray:string[]=[this.minPriceInput, this.maxPriceInput]
selectedAreaArrays:string[]=[this.minAreaInput, this.maxAreaInput];

selectedBedroom=""



       toggle(target:string){
        this.chosenField=target
        let allkeys=Object.keys(this.stateObject);
        allkeys.forEach((el)=>{
        if(el===target){
            if(this.stateObject[el]){
                this.chosenField="";
            }
            this.stateObject[target]=!this.stateObject[target];
        }else if(this.stateObject[el])  {this.stateObject[el]=!this.stateObject[el]}
    })
                return this.chosenField
      }

      handleSubmit() {
        return  this.httpRequest.get<RegionObject[]>('https://api.real-estate-manager.redberryinternship.ge/api/regions')
}

handleClickeventLeft(e:Event){
   const target=e.target as HTMLElement;
    let content=target.textContent;
    if(content!=null){
           this.minPriceInput=content;
           this.selectedPricesarray[0]=content}
}

handleClickeventLeftArea(e:Event){
    const target=e.target as HTMLElement;
     let content=target.textContent;
    if(content!=null){
            this.minAreaInput=content;
           this.selectedAreaArrays[0]=content}
 }

handleClickeventRight(e:Event){
    const target=e.target as HTMLElement;
     let content=target.textContent;
     if(content!=null){
            this.maxPriceInput=content;
            this.selectedPricesarray[1]=content
        }
 }

 handleClickeventRightArea(e:Event){
   const target=e.target as HTMLElement;
     let content=target.textContent;
    if(content!=null){
            this.maxAreaInput=content;
            this.selectedAreaArrays[1]=content
        }
 }

updateFiltersObjectstorage(field:string, array:string[]){
    if(this.minPriceInput===" " || this.maxPriceInput === " ")
        window.alert("გთხოვთ მიუთითოთ ფასები")
    else{ let obj=window.localStorage.getItem('savedObject');
        if(obj){
            let fetchedObj= JSON.parse(obj);
            let updatedObj={...fetchedObj, [field]:array}
      window.localStorage.setItem('savedObject',JSON.stringify(updatedObj))
    }
    else {
        let updatedObj={...this.savedFilteresObj, [field]:array}
          window.localStorage.setItem('savedObject',JSON.stringify(updatedObj))
    }}

}

updateFiltersWithAreaObjectstorage(field:string, array:string[]){
    if(this.minAreaInput===" " || this.maxAreaInput === " ")
        window.alert("გთხოვთ მიუთითოთ ფართობი")
    else{ let obj=window.localStorage.getItem('savedObject');
        if(obj){
            let fetchedObj= JSON.parse(obj);
            let updatedObj={...fetchedObj, [field]:array}
      window.localStorage.setItem('savedObject',JSON.stringify(updatedObj))
    }
    else {
        let updatedObj={...this.savedFilteresObj, [field]:array}
          window.localStorage.setItem('savedObject',JSON.stringify(updatedObj))
    }}

}

updateFilterObjectWithBedroom(field:string, selectedBedroomAmount:string){
    let obj=window.localStorage.getItem('savedObject');
        if(obj){
            let fetchedObj= JSON.parse(obj);
            let updatedObj={...fetchedObj, [field]:selectedBedroomAmount}
      window.localStorage.setItem('savedObject',JSON.stringify(updatedObj))
    }
    else {
        let updatedObj={...this.savedFilteresObj, [field]:selectedBedroomAmount}
          window.localStorage.setItem('savedObject',JSON.stringify(updatedObj))
    }
}
}