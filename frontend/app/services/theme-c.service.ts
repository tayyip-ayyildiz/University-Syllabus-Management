import { ThemeC } from './../../Entity/ThemeC';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { apiResponse, ThemeCResponse, ThemeCWithId } from '../../api.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeCService {

  private server: string = "http://localhost:8080/api/theme_cs";

  constructor(private http: HttpClient) { }

  private ThemeCToThemeCResponse(themeC: ThemeCWithId | ThemeC): ThemeCResponse {
    let n = themeC as ThemeCWithId
    return {

      id: n.id ? n.id : undefined,
      nom:themeC.nom,
      compets:n.compets
      
    }
  }

  public all(): Observable<Array<ThemeCWithId>> {
    return this.http.get<apiResponse<ThemeCWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public deleteThemeCFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server+"/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public modifyThemeC(themeC: ThemeCWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+themeC.id.toString(),
    themeC,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }

  public createThemeC(themeC: ThemeC) : Observable<ThemeCWithId> {
    return this.http.post<ThemeCWithId|null> (this.server, themeC, {observe: 'response', responseType: 'json'})

      .pipe(
        filter((response) => response.status === 201 && response.body !== null),  
        map((response)=>{
          
          if (response.body) {
            return response.body as ThemeCWithId;
          } 
          
          else {

            throw new Error('Failed to create ThemeC');
          
          }

        })

      );
  }

  public themeCFromId(id: number): Observable<ThemeCWithId> {
    return this.http.get<ThemeCWithId>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((themeC: ThemeCWithId): ThemeCWithId => (
        {
          id: themeC.id === undefined ? -1 : themeC.id,
          nom:themeC.nom,
          compets:themeC.compets
          
        })))
  }
}
