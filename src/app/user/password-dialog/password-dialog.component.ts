import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrl: './password-dialog.component.scss'
})
export class PasswordDialogComponent {
  userPasswordCurrent = ""
  userPasswordNew = ""

  constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>) {}
}
