import { inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Agent, CityObject, RegionObject } from "./types";
import { MatDialog } from "@angular/material/dialog";
import { AgentModalComponent } from "../agent-modal/agent-modal.component";
import { allowedTypes } from "./data-array";
import { tap } from "rxjs";
import { FormGroup } from "@angular/forms";
import { environment } from "../../environment/environment.prod";

@Injectable({'providedIn':"root"})
export class Service{
httpRequest=inject(HttpClient)
myToken=environment.MY_KEY
api='https://api.real-estate-manager.redberryinternship.ge/api/';
dialog=inject(MatDialog);
agentDialogOpen=false;
agentPhoto=signal<any>({});

previewImage=signal('');
hide=false;
listingImagehidden=false
agents=signal<Agent[]>([]);
listingImage=signal<any>({});
previewListingPhoto=signal('')
formInvalid=signal(true);
agentFormInvalid=signal(true);

fetchData(param:string){
let newApi=this.api+param
return this.httpRequest.get<CityObject[]>(newApi)
}


fetchCities(param:string){
  let newApi=this.api+param;
  return this.httpRequest.get<CityObject[]>(newApi)
}
//es sheidzleba gavushva listing modalshi
fetchDataWithToken(param:string, token: string){
    let headers=new HttpHeaders().set('Authorization', `Bearer ${token}`)
    let newApi=this.api+param;
    return this.httpRequest.get<any>(newApi,{headers} )
}


postData(param: string,  data:any){
    let newApi=this.api+param
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.myToken}`, 
        'accept': 'application/json',
        
      });
      return this.httpRequest.post(newApi, data, { headers })
}

openAgentModal(){
    this.agentDialogOpen=true;
    let dialogRef=this.dialog.open(AgentModalComponent, {
         height: '400px',
            width: '600px',
          
    })
    dialogRef.afterClosed().subscribe(() => {
       this.agentDialogOpen=false;
      });}



  updateInfoStorage(param:string,form: FormGroup, information:any,localstorageName:string){
    
let data=localStorage.getItem(localstorageName);

if(data!=null){
  let updatedData=JSON.parse(data);
  let updatedInformation={...updatedData, [param]:form.get(param)?.value}
  localStorage.setItem(localstorageName, JSON.stringify(updatedInformation))
} }
 
uploadPhoto(e:Event){
const target=(e.target as HTMLInputElement);

if (target.files && target.files.length > 0 && target.files[0]){
  
  console.log(target.files[0].type)
  // this.uploadeImagetype.set(target.files[0].type)
if(allowedTypes.includes(target.files[0].type)){
  // this.formInvalid.set(false);
 
const reader = new FileReader();
  reader.onload = () => {
    
 const   listingImageString=reader.result as string;
if(target.classList.contains('listing-photo-upload-input')){
  this.formInvalid.set(false);
  this.previewListingPhoto.set(listingImageString);
}
else {this.agentFormInvalid.set(false);
  this.previewImage.set(listingImageString)}
}
reader.readAsDataURL(target.files[0]);

if(target.classList.contains('listing-photo-upload-input')){
this.listingImage.set(target.files[0]);
  this.listingImagehidden=true; }
else{
  this.agentPhoto.set(target.files[0]);
  this.hide=true
  }

}
 else { 
  this.formInvalid.set(true);
  console.log('cudia')
 
  return;
  }
      }
  }}