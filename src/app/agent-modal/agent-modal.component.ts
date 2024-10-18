import { Component, DestroyRef, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Service } from '../core/services.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddedAgent } from '../core/types';
import { ApiService } from '../core/api.service';


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
apiService=inject(ApiService);
service=inject(Service);
previewImage=this.service.previewImage
agentInfo!:AddedAgent
form!:FormGroup;
destroyRef=inject(DestroyRef);
agents=this.service.agents;
agentFormValid=this.service.agentFormValid


ngOnInit(): void {
  this.form=new FormGroup({
  name:new FormControl('', {validators:[Validators.required, Validators.minLength(2), Validators.pattern('^(?:[ა-ჰ]+(?: [ა-ჰ]+)*|[a-zA-Z]+(?: [a-zA-Z]+)*|[ა-ჰa-zA-Z]+(?: [ა-ჰa-zA-Z]+)*)$')]}),
  surname:new FormControl('', {validators:[Validators.required, Validators.minLength(2), Validators.pattern('^(?:[ა-ჰ]+(?: [ა-ჰ]+)*|[a-zA-Z]+(?: [a-zA-Z]+)*|[ა-ჰa-zA-Z]+(?: [ა-ჰa-zA-Z]+)*)$')]}),
  email: new FormControl(null,  {validators:[Validators.required, Validators.email, Validators.pattern('^[a-zA-Z]+@redberry\.ge$')]}),
  phone:new FormControl('', [ Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^5\\d*$')]),
  avatar:new FormControl('', Validators.required),
})

let subscription=this.form.valueChanges.subscribe((updatedValues) => {
  this.agentInfo = { ...this.agentInfo, ...updatedValues };
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
  this.agentFormValid.set(false);

}
postAgentInfo(){
this.formsubmitted=true;
if(this.form.valid && this.service.agentFormValid()){
  let {name, surname, phone, email}=this.form.value;
let formData=new FormData();
  formData.append('name', name);
  formData.append('surname', surname);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('avatar',this.service.agentPhoto(), this.service.agentPhoto().name ); 
  this.apiService.postData('agents', formData).subscribe(
    {next:response=>{
      if(response){
        this.apiService.fetchDataWithToken('agents', this.apiService.myToken).subscribe((response)=>{this.agents.set(response)})
      }
    },
    error:(error:Error)=>{console.log(error.message)},
   });
   this.closeDialog();
   this.agentFormValid.set(false);
}

}

}
