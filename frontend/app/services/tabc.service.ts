import { Tabc } from './../../Entity/Tabc';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { apiResponse, TabcResponse, TabcWithId } from '../../api.interface';


@Injectable({
  providedIn: 'root'
})
export class TabcService {

  private server: string = "http://localhost:8080/api/tabcs";

  constructor(private http: HttpClient) { }

  private TabcToTabcResponse(tabc: TabcWithId | Tabc): TabcResponse {
    let n = tabc as TabcWithId
    return {

      id: n.id ? n.id : undefined,
      comps:n.comps,
      linkTabc:n.linkTabc
     
      
    }
  }

  public all(): Observable<Array<TabcWithId>> {
    return this.http.get<apiResponse<TabcWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public deleteTabcFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server+"/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public modifyTabc(tabc: TabcWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+tabc.id.toString(),
    tabc,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }


  public createTabc(tabc: Tabc): Observable<TabcWithId> {
    return this.http.post<TabcWithId | null>(this.server, tabc, { observe: 'response', responseType: 'json' })
      .pipe(
        filter((response) => response.status === 201 && response.body !== null),
        map((response) => {
          if (response.body) {
            return response.body as TabcWithId;
          } else {
            throw new Error('Failed to create Tabc');
          }
        })
      );
  }
  

  



  public tabcFromId(id: number): Observable<TabcWithId> {
    return this.http.get<TabcWithId>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((tabc: TabcWithId): TabcWithId => (
        {
          id: tabc.id === undefined ? -1 : tabc.id,
          comps:tabc.comps,
          linkTabc:tabc.linkTabc
        })))
  }
}
