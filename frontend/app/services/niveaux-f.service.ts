import { NiveauF } from './../../Entity/NiveauxF';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { apiResponse, NiveauFResponse, NiveauFWithId } from '../../api.interface';

@Injectable({
  providedIn: 'root'
})
export class NiveauxFService {

  private server: string = "http://localhost:8080/api/niveau_fs";

  constructor(private http: HttpClient) { }

  private NiveauxFToNiveauxFResponse(niveauxf: NiveauFWithId | NiveauF): NiveauFResponse {
    let n = niveauxf as NiveauFWithId
    return {

      id: n.id ? n.id : undefined,
      nom: n.nom,
      nbG:n.nbG
    }
  }

  public all(): Observable<Array<NiveauFWithId>> {
    return this.http.get<apiResponse<NiveauFWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public deleteNiveauxFFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server+"/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public modifyNiveauxF(niveauxf: NiveauFWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+niveauxf.id.toString(),
    niveauxf,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }

  public createNiveauxF(niveauxf: NiveauF) : Observable<NiveauFWithId> {
    return this.http.post<NiveauFWithId|null> (this.server, niveauxf, {observe: 'response', responseType: 'json'})

      .pipe(
        filter((response) => response.status === 201 && response.body !== null),  
        map((response)=>{
          
          if (response.body) {
            return response.body as NiveauFWithId;
          } 
          
          else {

            throw new Error('Failed to create Niveau');
          
          }

        })

      );
  }



  public niveauxFFromId(id: number): Observable<NiveauFWithId> {
    return this.http.get<NiveauFWithId>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((n: NiveauFWithId): NiveauFWithId => (
        {
          id: n.id === undefined ? -1 : n.id,
          nom: n.nom,
          nbG:n.nbG
        })))
  }
}
