import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  dialogRef=inject(MatDialogRef<ConfirmDialogComponent>);
  dialogData=inject(MAT_DIALOG_DATA)

  closeDialog(){
    this.dialogRef.close(false);
    console.log('dialog has been clsoed')
    console.log(this.dialogData)
    
  }
  confirmdDelete(){
    this.dialogRef.close(true)
  }
}
