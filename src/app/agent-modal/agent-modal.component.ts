import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Service } from '../core/services.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


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
  poatData=this.service.postData;
form!:FormGroup
  ngOnInit(): void {
    this.form=new FormGroup({
      name:new FormControl('', {validators:[Validators.required, Validators.minLength(2), Validators.pattern('^(?:[ა-ჰ]+(?: [ა-ჰ]+)*|[a-zA-Z]+(?: [a-zA-Z]+)*|[ა-ჰa-zA-Z]+(?: [ა-ჰa-zA-Z]+)*)$')]}),
      surname:new FormControl('', {validators:[Validators.required, Validators.minLength(2), Validators.pattern('^(?:[ა-ჰ]+(?: [ა-ჰ]+)*|[a-zA-Z]+(?: [a-zA-Z]+)*|[ა-ჰa-zA-Z]+(?: [ა-ჰa-zA-Z]+)*)$')]}),
      email: new FormControl(null,  {validators:[Validators.required, Validators.email, Validators.pattern('^[a-zA-Z]+@redberry\.ge$')]}),
      phone:new FormControl('', [ Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^5\\d*$')]),
      avatar:new FormControl('', Validators.required),
    })
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
  this.service.postData('agents', formData).subscribe(response=>{console.log(response)})

}

}
