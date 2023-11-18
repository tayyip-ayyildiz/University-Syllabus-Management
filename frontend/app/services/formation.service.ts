import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { Formation } from 'src/Entity/Formation';
import { apiResponse, FormationResponse, FormationWithId } from '../../api.interface';



@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private server: string = "http://localhost:8080/api/formations";

  constructor(private http: HttpClient) { }

  private FormationToFormationResponse(formation: FormationWithId | Formation): FormationResponse {
    let n = formation as FormationWithId
    return {

      id: n.id ? n.id : undefined,
      nom: n.nom,
      description:n.description,
      ratioTarif:n.ratioTarif,
      nbG:n.nbG
      
    }
  }

  public all(): Observable<Array<FormationWithId>> {
    return this.http.get<apiResponse<FormationWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public deleteFormationFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server+"/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public modifyFormation(formation: FormationWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+formation.id.toString(),
    formation,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }

  public createFormation(formation: Formation) : Observable<FormationWithId> {
    return this.http.post<FormationWithId|null> (this.server, formation, {observe: 'response', responseType: 'json'})

      .pipe(
        filter((response) => response.status === 201 && response.body !== null),  
        map((response)=>{
          
          if (response.body) {
            return response.body as FormationWithId;
          } 
          
          else {

            throw new Error('Failed to create Formation');
          
          }

        })

      );
  }
  



  public formationFromId(id: number): Observable<FormationWithId> {
    return this.http.get<FormationWithId>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((n: FormationWithId): FormationWithId => (
        {
          id: n.id === undefined ? -1 : n.id,
          nom: n.nom,
          description:n.description,
          ratioTarif:n.ratioTarif,
          nbG:n.nbG
          
        })))
  }


}
