import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import {log} from "node:util";

interface AuthForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})

export class FooterComponent {
  loginStatus = false; //example
}
