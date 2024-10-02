import { inject, Injectable, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CityObject, RegionObject } from "./types";
import { MatDialog } from "@angular/material/dialog";
import { AgentModalComponent } from "../agent-modal/agent-modal.component";
import { A } from "@angular/cdk/keycodes";

@Injectable({'providedIn':"root"})
export class Service{
httpRequest=inject(HttpClient)
myToken='9d21d719-0787-4dc4-b20d-a1e819ada6b4';
api='https://api.real-estate-manager.redberryinternship.ge/api/';
dialog=inject(MatDialog);
agentDialogOpen=false;
agentPhoto=signal<any>({})

// constructor(private dialog: MatDialog) {}
fetchData(param:string){
let newApi=this.api+param
return this.httpRequest.get<CityObject[]>(newApi)
}

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
        // 'Content-Type': 'multipart/form-data' 
      });
      return this.httpRequest.post(newApi, data, { headers })
}

addAgent(){
    this.agentDialogOpen=true;
    console.log(this.agentDialogOpen)
   
    console.log("swori aircha");
    let dialogRef=this.dialog.open(AgentModalComponent, {
        
            height: '400px',
            width: '600px',
          
    })

    dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
        this.agentDialogOpen=false;
      });
  }


  onAddAgent(e:Event){
     const targetValue=(e.target as HTMLSelectElement).value;
   if(targetValue==='addAgent'){
      this.addAgent()
    }
   else {console.log("sxva avarchie")} 
  }

  uploadPhoto(e:Event){
    const target=e.target as HTMLInputElement;
    if (target.files && target.files.length > 0 && target.files[0]){
  if(target.files[0]){
 console.log(target.files[0]);
this.agentPhoto.set(target.files[0])
        }
 }
  }}