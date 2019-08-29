import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
/*import { Search } from 'src/app/Models/search/search';
import { PaginatedResult } from 'src/app/Models/search/PaginatedResult';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { LookupsFilter } from 'src/app/Models/Lookups/lookupsFilter';
*/

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  constructor(private http:HttpClient) { }

  private apiUrl = environment.apiBaseUrl + 'LkpLookup';
  //apiUrl='http://localhost:64838/api/LkpLookup';
/*
  getAPi(): Observable<lkplookup[]>{
    return this.http.get<lkplookup[]>(this.apiUrl);
  }
 */
  /*
  ListStores(model: Search<StoresFilter>): Observable<PaginatedResult<Store>> {
    return this.http.post<PaginatedResult<Store>>(this.apiUrl + '/List', model, environment.httpOptions);
  }
*/
  /*
ListStoresx(model: Search<StoresFilter>): Observable<PaginatedResult<Store>> {
  return this.http.post<PaginatedResult<Store>>(this.apiUrl + '/List', model, environment.httpOptions);
}
*/

/*  ListLookups(model: Search<LookupsFilter>): Observable<PaginatedResult<Lkplookup>> {
    return this.http.get<PaginatedResult<Lkplookup>>(this.apiUrl,  environment.httpOptions);
  }
*/
  /*
LookupApi():Observable<lkplookup[]>{
  return this.http.get<lkplookup[]>(this.link);
}
*/

}
