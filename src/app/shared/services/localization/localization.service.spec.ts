import { TestBed } from '@angular/core/testing';
import {TranslateModule} from "@ngx-translate/core";

import { LocalizationService } from './localization.service';

describe('LocalizationService', () => {
  let service: LocalizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[TranslateModule.forRoot()]
    });
    service = TestBed.inject(LocalizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
