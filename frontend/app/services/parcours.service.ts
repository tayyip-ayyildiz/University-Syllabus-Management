import { Parcours } from './../../Entity/Parcours';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { apiResponse, ParcoursResponse, ParcoursWithId } from '../../api.interface';

@Injectable({
  providedIn: 'root'
})
export class ParcoursService {

  private server: string = "http://localhost:8080/api/parcours";

  constructor(private http: HttpClient) { }

  private ParcoursToParcoursResponse(parcours: ParcoursWithId | Parcours): ParcoursResponse {
    let n = parcours as ParcoursWithId
    return {

      id: n.id ? n.id : undefined,
      nom: n.nom,
      description:n.description,
      nbG:n.nbG
      
    }
  }

  public all(): Observable<Array<ParcoursWithId>> {
    return this.http.get<apiResponse<ParcoursWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public deleteParcoursFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server+"/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public modifyParcours(parcours: ParcoursWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+parcours.id.toString(),
    parcours,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }

  public createParcours(parcours: Parcours) : Observable<ParcoursWithId> {
    return this.http.post<ParcoursWithId|null> (this.server, parcours, {observe: 'response', responseType: 'json'})

      .pipe(
        filter((response) => response.status === 201 && response.body !== null),  
        map((response)=>{
          
          if (response.body) {
            return response.body as ParcoursWithId;
          } 
          
          else {

            throw new Error('Failed to create Parcours');
          
          }

        })

      );
  }
  



  public parcoursFromId(id: number): Observable<ParcoursWithId> {
    return this.http.get<ParcoursWithId>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((n: ParcoursWithId): ParcoursWithId => (
        {
          id: n.id === undefined ? -1 : n.id,
          nom: n.nom,
          description:n.description,
          nbG:n.nbG
        })))
  }
}
