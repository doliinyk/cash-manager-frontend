import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { UserStateModel } from 'shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  protected user?: Observable<UserStateModel> = this.authService.user$;
  hasAvatar: boolean = false;
  isEditMode: boolean = false;
  userName?: string;
  userEmail?: string;
  userPassword: string = '12345678';
  tempUserName?: string = '';
  tempUserEmail?: string = '';
  tempUserPassword: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user?.subscribe(data => {
      this.userName = data.login?.toString();
      this.userEmail = data.email;
    });
  }

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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  }
}
