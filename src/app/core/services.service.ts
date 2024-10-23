import { inject, Injectable, signal } from "@angular/core";
import { Agent } from "./types";
import { MatDialog } from "@angular/material/dialog";
import { AgentModalComponent } from "../agent-modal/agent-modal.component";
import { allowedTypes } from "./data-array";

@Injectable({'providedIn':"root"})
export class Service{
dialog=inject(MatDialog);
agentDialogOpen=false;
agentPhoto=signal<any>({});
previewImage=signal('');
agentFormValid=signal(false);
agents=signal<Agent[]>([]);
listingImage=signal<any>({});
previewListingPhoto=signal('')
formInvalid=signal(true);
listingImageValidType=signal(false);


openAgentModal(){
this.agentDialogOpen=true;
let dialogRef=this.dialog.open(AgentModalComponent, {
    height: '400px',
    width: '600px',
      
})
dialogRef.afterClosed().subscribe(() => {
    this.agentDialogOpen=false;
  });}

 
uploadAgentPhoto(e:Event){
const target=(e.target as HTMLInputElement);
if(target.files && target.files.length > 0 && target.files[0]){
  
if(allowedTypes.includes(target.files[0].type)){
this.agentFormValid.set(true);
const reader = new FileReader();
reader.onload = () => {
const imageString=reader.result as string;
this.previewImage.set(imageString)
}
reader.readAsDataURL(target.files[0]);
this.agentPhoto.set(target.files[0]);
 }
   else { 
       this.agentFormValid.set(false);
         }
  }}

  uploadListingPhoto(e:Event){
  const target=(e.target as HTMLInputElement);
if(target.files && target.files.length > 0 && target.files[0]){
 
if(allowedTypes.includes(target.files[0].type)){
  this.formInvalid.set(false);
  this.listingImageValidType.set(true);

const reader = new FileReader();
reader.onload = () => {
const listingImageString=reader.result as string;
this.previewListingPhoto.set(listingImageString)
}
reader.readAsDataURL(target.files[0]);
this.listingImage.set(target.files[0]);
 }
      else { 
        this.formInvalid.set(true);
        this.listingImageValidType.set(false);
         }
  }
  }
}