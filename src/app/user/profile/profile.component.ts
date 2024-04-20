import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  hasAvatar: boolean = false;
  isEditMode: boolean = false;
  userName: string = 'Witold';
  userEmail: string = 'witalikspelina@gmail.com';
  userPassword: string = '12345678';
  tempUserName: string = '';
  tempUserEmail: string = '';
  tempUserPassword: string = '';

  toEditMode() {
    this.tempUserName = this.userName;
    this.tempUserEmail = this.userEmail;
    this.tempUserPassword = this.userPassword;
    this.isEditMode = true;
  }

  saveChanges() {
    this.isEditMode = false;
  }

  declineChanges() {
    this.userName = this.tempUserName;
    this.userEmail = this.tempUserEmail;
    this.userPassword = this.tempUserPassword;
    this.isEditMode = false;
  }
}
