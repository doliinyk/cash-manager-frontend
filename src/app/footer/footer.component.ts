import { Component } from '@angular/core';
import { DevinfoComponent } from '../devinfo/devinfo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private dialog: MatDialog) {}

  openAboutUsDialog() {
    this.dialog.open(DevinfoComponent);
  }
}
