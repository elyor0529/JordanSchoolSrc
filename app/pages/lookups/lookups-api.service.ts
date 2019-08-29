import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Search } from 'src/app/Models/search/search';
import { LookupsFilter } from 'src/app/Models/Lookups/lookupsFilter';
import { Observable, from } from 'rxjs';
import { PaginatedResult } from 'src/app/Models/search/PaginatedResult';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { LookupFilter } from 'src/app/Models/Lookups/LookupFilter';
import { map, groupBy, mergeMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LookupsApiService {

  public sTypeId: any;

  private apiUrl = environment.apiBaseUrl + 'LkpLookup';
  //apiUrl='http://localhost:64838/api/LkpLookup';
  //GetByParentId
  lookupFilter: LookupFilter;
  constructor(private http:HttpClient,  private dialog: MatDialog) {
    this.lookupFilter = new LookupFilter();
   }

  
  ListLookupsx(model: Search<LookupsFilter>): Observable<PaginatedResult<Lkplookup>> {
    return this.http.get<PaginatedResult<Lkplookup>>(this.apiUrl, environment.httpOptions);
  }

  ListLookups(): Observable<Lkplookup[]> {
    return this.http.get<Lkplookup[]>(this.apiUrl,  environment.httpOptions);
  }

  
  getLookupsByType(id): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/GetByParentId/'+id,  environment.httpOptions);
  } 

  
  getLookupsByType2(typeIds): Observable<any> {
    this.lookupFilter.ids = typeIds;
    return this.http.post<any>(this.apiUrl + '/GetLookups', this.lookupFilter, environment.httpOptions)
    .pipe(map(res => {
      const cc: Lkplookup[] = res;
      // emit each person
      const source = from(cc);
      // group by age
      const result = source.pipe(
        groupBy(lookup => lookup.typeId),
        // return each item in group as array
        mergeMap(group => group.pipe(toArray()))
      );
      return result;
    }));

  }
  
  openDeleteDialog(lookup: Lkplookup) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${lookup.aname}`
      }
    });
  }
  deleteLookup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

  
  addLookup(lookup: Lkplookup): Observable<Lkplookup> {
    return this.http.post<Lkplookup>(this.apiUrl, lookup, environment.httpOptions);
  }
  
  updateLookup(id: number, lookup: Lkplookup): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, lookup, environment.httpOptions);
  }

  
  getLookup(id: number): Observable<Lkplookup> {
    return this.http.get<Lkplookup>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }
  
  
}
