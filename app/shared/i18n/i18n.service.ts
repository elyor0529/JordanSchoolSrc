import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { languages } from './languages.model';
import { JsonApiService } from 'src/app/core/json-api.service';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  public data: {};
  public validationData: {};
  public state;
  public validationState: BehaviorSubject<any>;
  public currentLanguage: any;

  constructor(private jsonApiService: JsonApiService) {
    this.state = new Subject();
    this.data = this.state.asObservable();
    this.validationState = new BehaviorSubject<any>({});
    this.initLanguage(localStorage.getItem('locale') || 'en-US');
   // this.fetch(this.currentLanguage.key);
  }

  private initLanguage(locale: string) {
    const language = languages.find((it) => {
      return it.key === locale;
    });
    if (language) {
      this.currentLanguage = language;
    } else {
      throw new Error(`Incorrect locale used for I18nService: ${locale}`);
    }
  }

  // private fetch(locale: any) {
  //   this.jsonApiService.fetch(`/langs/${locale}/text.json`)
  //     .subscribe((data: any) => {
  //       localStorage.setItem('locale', locale);
  //       this.data = data;
  //       this.state.next(data);
  //     }, err => { }, () => {
  //       this.jsonApiService.fetch(`/langs/${locale}/validation.json`)
  //         .subscribe((data: any) => {
  //           localStorage.setItem('locale', locale);
  //           this.validationData = data;
  //           this.validationState.next(data);
  //         });
  //     });
  // }

  public getTranslation(phrase: string): string {
    return this.data && this.data[phrase] ? this.data[phrase] : phrase;
  }

  setLanguage(language) {
    this.currentLanguage = language;
   // this.fetch(language.key);
  }
}
