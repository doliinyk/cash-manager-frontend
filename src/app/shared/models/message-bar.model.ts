import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MessageBarType } from 'shared/enums/message-bar';

export interface MessageBarData {
  message: string;
  type: MessageBarType;
  verticalPosition?: MatSnackBarVerticalPosition;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  info?: string;
  duration?: number;
  infinityDuration?: boolean;
  unclosable?: boolean;
}
