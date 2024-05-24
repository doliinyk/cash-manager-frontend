import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {LocalizationService} from "shared/services/localization/localization.service";
import {catchError, tap} from "rxjs";
import {F} from "@angular/cdk/keycodes";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "shared/services/auth/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private localizationService: LocalizationService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  notEquals = false;
  newPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(40),
    Validators.nullValidator
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(40),
    Validators.nullValidator
  ]);
  forgotGroup = this.formBuilder.group({
    newPassword: this.newPassword,
    confirmPassword: this.confirmPassword
  });

  id: string | null = null;
  securityCode: string | null = null;


  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('userId');
      this.securityCode = params.get('activationToken');
    });
  }

  sendData() {
    const passwordData = this.forgotGroup.value;
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      this.notEquals = true;
      return null;
    }
    return this.authService.resetPassword(this.id, this.securityCode, passwordData.newPassword);
  }
}
