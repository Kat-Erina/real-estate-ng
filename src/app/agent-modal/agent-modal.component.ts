import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Service } from '../core/services.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-agent-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agent-modal.component.html',
  styleUrl: './agent-modal.component.css'
})
export class AgentModalComponent {

  dialogRef=inject(MatDialogRef<AgentModalComponent>);
  service=inject(Service);
  poatData=this.service.postData;
  form=new FormGroup({
    name:new FormControl('Kato'),
    surname:new FormControl('Nalchevanidze'),
    email: new FormControl('test@redberry.ge'),
    phone_number:new FormControl('555111111'),
    photo:new FormControl(''),
  })

@ViewChild('fileInput') fileInput!:ElementRef;

uploadAgentPhoto(e:Event){
  this.fileInput.nativeElement.click()
  
}
closeDialog() {
  this.dialogRef.close();
  this.service.agentDialogOpen=false;

}
postAgentInfo(){

  let formData=new FormData();

  formData.append('name', "kato");
  formData.append('surname', 'nalchevanidze');
  formData.append('email', 'kato@redberry.ge');
  formData.append('phone', '551111111');
  formData.append('avatar',this.service.agentPhoto(), this.service.agentPhoto().name ); 
  this.service.postData('agents', formData).subscribe(response=>{console.log(response)})
}

}
