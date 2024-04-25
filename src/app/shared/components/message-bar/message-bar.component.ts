import {Component, Inject, OnInit} from '@angular/core';
import {MessageBarData} from "shared/models/message-bar.model";
import {MessageBarIcon} from "shared/enums/message-bar";
import {MAT_SNACK_BAR_DATA, MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrl: './message-bar.component.scss'
})
export class MessageBarComponent implements OnInit {
  public messageIcon: MessageBarIcon = MessageBarIcon.success;

  constructor(
    private snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: MessageBarData
  ) {}

  public ngOnInit(): void {
    this.messageIcon = MessageBarIcon[this.data.type];
  }

  public onClose(): void {
    this.snackBar.dismiss();
  }
}
