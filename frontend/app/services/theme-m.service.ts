import { ThemeM } from './../../Entity/ThemeM';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { apiResponse, ThemeMResponse, ThemeMWithId } from '../../api.interface';
@Injectable({
  providedIn: 'root'
})
export class ThemeMService {

  private server: string = "http://localhost:8080/api/theme_ms";

  constructor(private http: HttpClient) { }

  private ThemeMToThemeMResponse(themeM: ThemeMWithId | ThemeM): ThemeMResponse {
    let n = themeM as ThemeMWithId
    return {

      id: n.id ? n.id : undefined,
      nom:n.nom,
      matieres:n.matieres
      
    }
  }

  public all(): Observable<Array<ThemeMWithId>> {
    return this.http.get<apiResponse<ThemeMWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public deleteThemeMFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server+"/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public modifyThemeM(themeM: ThemeMWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+themeM.id.toString(),
    themeM,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }

  public createThemeM(themeM: ThemeM) : Observable<ThemeMWithId> {
    return this.http.post<ThemeMWithId|null> (this.server, themeM, {observe: 'response', responseType: 'json'})

      .pipe(
        filter((response) => response.status === 201 && response.body !== null),  
        map((response)=>{
          
          if (response.body) {
            return response.body as ThemeMWithId;
          } 
          
          else {

            throw new Error('Failed to create ThemeM');
          
          }

        })

      );
  }
  



  public themeMFromId(id: number): Observable<ThemeMWithId> {
    return this.http.get<ThemeMWithId>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((themeM: ThemeMWithId): ThemeMWithId => (
        {
          id: themeM.id === undefined ? -1 : themeM.id,
          nom:themeM.nom,
          matieres:themeM.matieres
          
        })))
  }
}
