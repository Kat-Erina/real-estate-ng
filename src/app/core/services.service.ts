import { inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CityObject, RegionObject } from "./types";
import { MatDialog } from "@angular/material/dialog";
import { AgentModalComponent } from "../agent-modal/agent-modal.component";
import { allowedTypes } from "./data-array";
import { tap } from "rxjs";
import { FormGroup } from "@angular/forms";

@Injectable({'providedIn':"root"})
export class Service{
httpRequest=inject(HttpClient)
myToken='9d21d719-0787-4dc4-b20d-a1e819ada6b4';
api='https://api.real-estate-manager.redberryinternship.ge/api/';
dialog=inject(MatDialog);
agentDialogOpen=false;
agentPhoto=signal<any>({});
validImageType=signal(true);
previewImage=signal('');
hide=false

//es sheidzleba gavushva listing modalshi
fetchData(param:string){
let newApi=this.api+param
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

addAgent(){
    this.agentDialogOpen=true;
    let dialogRef=this.dialog.open(AgentModalComponent, {
         height: '400px',
            width: '600px',
          
    })
    dialogRef.afterClosed().subscribe(() => {
       this.agentDialogOpen=false;
      });
    
  }



  updateInfoStorage(param:string,form: FormGroup, information:any,localstorageName:string){
    
let data=localStorage.getItem(localstorageName);

if(data!=null){
  let updatedData=JSON.parse(data);
  let updatedInformation={...updatedData, [param]:form.get(param)?.value}
  localStorage.setItem(localstorageName, JSON.stringify(updatedInformation))
}

   
    // localStorage.setItem(localstorageName, JSON.stringify(updatedInformation))
  }
  uploadPhoto(e:Event){
    console.log(e)
     const target=e.target as HTMLInputElement;
     console.log(target)
    if (target.files && target.files.length > 0 && target.files[0]){

 
 if(allowedTypes.includes(target.files[0].type))
{
  const reader = new FileReader();
  reader.onload = () => {
    this.previewImage.set(reader.result as string);
    localStorage.setItem('agentPhoto', JSON.stringify(this.previewImage()));
  }
  reader.readAsDataURL(target.files[0]);
  this.validImageType.set(false)
  this.agentPhoto.set(target.files[0]);

this.hide=true
  

}
 else {alert("please upload image only, no other document"); return}
     

 }
  }}