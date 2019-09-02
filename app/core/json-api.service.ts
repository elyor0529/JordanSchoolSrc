import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class JsonApiService {
  private urlPrefix = environment.urlPrefix + '/' ;
  constructor(private http: HttpClient) { }


  // public fetch(url): Observable<any> {
  //   return this.http.get(this.getBaseUrl() + environment.jsonAPI + url);
  // }


  // public fetchLanguages(): Observable<any> {
  //   return this.http.get(this.getBaseUrl() + environment.jsonAPI + '/langs/languages.json');
  // }


  // public fetchKeys(): Observable<any> {
  //   return this.http.get(this.getBaseUrl() + environment.jsonAPI + '/langs/replaceKeys.json');
  // }

  // public fetchMenu(): Observable<any> {
  //   return this.http.get(this.getBaseUrl() + environment.jsonAPI + '/menu-items.json');
  // }

  // public fetchSettings(): Observable<any> {
  //   return this.http.get(this.getBaseUrl() + environment.jsonAPI + '/settings/settings.json');
  // }

  // public getBaseUrl() {
  //   const path = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + this.urlPrefix;
  //   return path;
  // } 
}
