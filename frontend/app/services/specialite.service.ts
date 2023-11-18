import { Specialite } from './../../Entity/Specialite';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { apiResponse, SpecialiteResponse, SpecialiteWithId } from '../../api.interface';


@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  private server: string = "http://localhost:8080/api/specialites";

  constructor(private http: HttpClient) { }

  private SpecialiteToSpecialiteResponse(specialite: SpecialiteWithId | Specialite): SpecialiteResponse {
    let n = specialite as SpecialiteWithId
    return {

      id: n.id ? n.id : undefined,
      nom: n.nom,
      description:n.description,
      nbG:n.nbG
      
    }
  }

  public all(): Observable<Array<SpecialiteWithId>> {
    return this.http.get<apiResponse<SpecialiteWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public deleteSpecialiteFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server+"/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public modifySpecialite(specialite: SpecialiteWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+specialite.id.toString(),
    specialite,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }

  public createSpecialite(specialite: Specialite) : Observable<SpecialiteWithId> {
    return this.http.post<SpecialiteWithId|null> (this.server, specialite, {observe: 'response', responseType: 'json'})

      .pipe(
        filter((response) => response.status === 201 && response.body !== null),  
        map((response)=>{
          
          if (response.body) {
            return response.body as SpecialiteWithId;
          } 
          
          else {

            throw new Error('Failed to create Spécialité');
          
          }

        })

      );
  }
  



  public specialiteFromId(id: number): Observable<SpecialiteWithId> {
    return this.http.get<SpecialiteWithId>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((n: SpecialiteWithId): SpecialiteWithId => (
        {
          id: n.id === undefined ? -1 : n.id,
          nom: n.nom,
          description:n.description,
          nbG:n.nbG
          
        })))
  }
}
