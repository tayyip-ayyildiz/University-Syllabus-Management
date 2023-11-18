import { Competence } from '../../Entity/Competence';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { apiResponse, CompetenceResponse, CompetenceWithId } from '../../api.interface';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  private server: string = "http://localhost:8080/api/competences";

  constructor(private http: HttpClient) { }

  private CompetenceToFormationResponse(competences: CompetenceWithId | Competence): CompetenceResponse {
    let n = competences as CompetenceWithId
    return {

      id: n.id ? n.id : undefined,
      nom:n.nom,
      description:n.description,
      linkCompetences:n.linkCompetences,
      themeC:n.themeC,
      tabcs:n.tabcs,
      tabAs:n.tabAs
      
    }
  }

  public all(): Observable<Array<CompetenceWithId>> {
    return this.http.get<apiResponse<CompetenceWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public deleteCompetenceFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server+"/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public modifyCompetence(competence: CompetenceWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+competence.id.toString(),
    competence,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }

  public createCompetence(competence: Competence) : Observable<CompetenceWithId> {
    return this.http.post<CompetenceWithId|null> (this.server, competence, {observe: 'response', responseType: 'json'})

      .pipe(
        filter((response) => response.status === 201 && response.body !== null),  
        map((response)=>{
          
          if (response.body) {
            return response.body as CompetenceWithId;
          } 
          
          else {

            throw new Error('Failed to create Compétence');
          
          }

        })

      );
  }
  



  public competenceFromId(id: number): Observable<CompetenceWithId> {
    return this.http.get<CompetenceWithId>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((competence: CompetenceWithId): CompetenceWithId => (
        {
          id: competence.id === undefined ? -1 : competence.id,
          nom: competence.nom,
          description:competence.description,
          linkCompetences:competence.linkCompetences,
          themeC:competence.themeC,
          tabcs:competence.tabcs,
          tabAs:competence.tabAs
        })))
  }
}
