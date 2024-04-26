import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {AuthService} from "shared/services/auth/auth.service";
import {UserIsAuth} from "shared/store/app/app.actions";
import {TokenState} from "shared/store/token/token.state";
import {GetTokens} from "shared/store/token/token.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetTokens());
    this.store.dispatch(new UserIsAuth());
  }
}
