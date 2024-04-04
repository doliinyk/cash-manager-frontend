import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  constructor(private readonly translateService: TranslateService) {}

  public setLocalization(language: string): void {
    localStorage.setItem('language', language);
    this.translateService.use(language);
  }

  public getLocalization(): string {
    return localStorage.getItem('language') || 'uk';
  }
}
