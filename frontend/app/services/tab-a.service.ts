import { TabA } from 'src/Entity/TabA';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { apiResponse, TabAResponse, TabAWithId } from '../../api.interface';

@Injectable({
  providedIn: 'root'
})
export class TabAService {

  private server: string = "http://localhost:8080/api/tab_as";

  constructor(private http: HttpClient) { }

  private TabAToTabAResponse(tabca: TabAWithId | TabA): TabAResponse {
    let n = tabca as TabAWithId
    return {

      id: n.id ? n.id : undefined,
      comps:n.comps,
      tabForN:n.tabForN
     
      
    }
  }

  public all(): Observable<Array<TabAWithId>> {
    return this.http.get<apiResponse<TabAWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public deleteTabAFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server+"/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public modifyTaba(tabca: TabAWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+tabca.id.toString(),
    tabca,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }

  public getTabAAll(id:number){

    return this.http.get<apiResponse<TabAWithId>>("http://localhost:8080/api/TabAAll/"+id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))

  }


  public createTaba(tabca: TabA): Observable<TabAWithId> {
    return this.http.post<TabAWithId | null>(this.server, tabca, { observe: 'response', responseType: 'json' })
      .pipe(
        filter((response) => response.status === 201 && response.body !== null),
        map((response) => {
          if (response.body) {
            return response.body as TabAWithId;
          } else {
            throw new Error('Failed to create TabA');
          }
        })
      );
  }
  

  



  public tabAFromId(id: number): Observable<TabAWithId> {
    return this.http.get<TabAWithId>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((taba: TabAWithId): TabAWithId => (
        {
          id: taba.id === undefined ? -1 : taba.id,
          comps:taba.comps,
          tabForN:taba.tabForN
        })))
  }
}
