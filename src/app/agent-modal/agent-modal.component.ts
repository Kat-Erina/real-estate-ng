import { Component, DestroyRef, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Service } from '../core/services.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddedAgent } from '../core/types';


@Component({
  selector: 'app-agent-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './agent-modal.component.html',
  styleUrl: './agent-modal.component.css'
})
export class AgentModalComponent implements OnInit{
formsubmitted=false;
dialogRef=inject(MatDialogRef<AgentModalComponent>);
service=inject(Service);
previewImage=this.service.previewImage
agentInfo!:AddedAgent
form!:FormGroup;
destroyRef=inject(DestroyRef);


  ngOnInit(): void {
    // localStorage.clear()

let fetchedData=localStorage.getItem('agentInfo');
if(fetchedData!=null){
   this.agentInfo=JSON.parse(fetchedData);
 } else {
this.agentInfo={name:'', surname:'', email:'', phone:'', avatar:''}
localStorage.setItem('agentInfo', JSON.stringify(this.agentInfo))}

this.form=new FormGroup({
  name:new FormControl(this.agentInfo.name|| '', {validators:[Validators.required, Validators.minLength(2), Validators.pattern('^(?:[ა-ჰ]+(?: [ა-ჰ]+)*|[a-zA-Z]+(?: [a-zA-Z]+)*|[ა-ჰa-zA-Z]+(?: [ა-ჰa-zA-Z]+)*)$')]}),
  surname:new FormControl(this.agentInfo.surname||'', {validators:[Validators.required, Validators.minLength(2), Validators.pattern('^(?:[ა-ჰ]+(?: [ა-ჰ]+)*|[a-zA-Z]+(?: [a-zA-Z]+)*|[ა-ჰa-zA-Z]+(?: [ა-ჰa-zA-Z]+)*)$')]}),
  email: new FormControl(this.agentInfo.email||null,  {validators:[Validators.required, Validators.email, Validators.pattern('^[a-zA-Z]+@redberry\.ge$')]}),
  phone:new FormControl(this.agentInfo.phone||'', [ Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^5\\d*$')]),
  avatar:new FormControl('', Validators.required),
})

let fetchedAgentPhoto=localStorage.getItem('agentPhoto');
if(fetchedAgentPhoto!=null){
  this.previewImage.set(JSON.parse(fetchedAgentPhoto));
  this.service.hide=true;
}

let subscription=this.form.valueChanges.subscribe((updatedValues) => {
  this.agentInfo = { ...this.agentInfo, ...updatedValues };
  localStorage.setItem('agentInfo', JSON.stringify(this.agentInfo));
});

this.destroyRef.onDestroy(()=>{subscription.unsubscribe()})
}


@ViewChild('fileInput') fileInput!:ElementRef;

uploadAgentPhoto(){
  this.fileInput.nativeElement.click()
  }
closeDialog() {
  this.dialogRef.close();
  this.service.agentDialogOpen=false;

}
postAgentInfo(){
let {name, surname, phone, email}=this.form.value;
let formData=new FormData();
this.formsubmitted=true
  formData.append('name', name);
  formData.append('surname', surname);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('avatar',this.service.agentPhoto(), this.service.agentPhoto().name ); 
  this.service.postData('agents', formData).subscribe(response=>{console.log(response)});

  this.closeDialog()
}

}
