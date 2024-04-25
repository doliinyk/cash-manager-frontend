import {MessageBarData} from "shared/models/message-bar.model";

export class ShowMessageBar {
  static readonly type = '[app] show message bar';
  constructor(public payload: MessageBarData) {}
}

export class UserIsAuth{
  static readonly type = "[app] user is auth"
  constructor() {}
}
