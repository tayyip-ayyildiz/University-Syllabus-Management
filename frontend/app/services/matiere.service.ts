import { Matiere } from './../../Entity/Matiere';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { apiResponse, MatiereResponse, MatiereWithId } from '../../api.interface';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  private server: string = "http://localhost:8080/api/matieres";

  constructor(private http: HttpClient) { }

  private MatiereToMatiereResponse(matiere: MatiereWithId | Matiere): MatiereResponse {
    let n = matiere as MatiereWithId
    return {

      id: n.id ? n.id : undefined,
      nom: n.nom,
      themeM:n.themeM,
      description:n.description,
      linkMatiere:n.linkMatiere,
      
    }
  }

  public all(): Observable<Array<MatiereWithId>> {
    return this.http.get<apiResponse<MatiereWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public deleteMatiereFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server+"/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public modifyMatiere(matiere: MatiereWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+matiere.id.toString(),
    matiere,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }

  public createMatiere(matiere: Matiere) : Observable<MatiereWithId> {
    return this.http.post<MatiereWithId|null> (this.server, matiere, {observe: 'response', responseType: 'json'})

      .pipe(
        filter((response) => response.status === 201 && response.body !== null),  
        map((response)=>{
          
          if (response.body) {
            return response.body as MatiereWithId;
          } 
          
          else {

            throw new Error('Failed to create Matiere');
          
          }

        })

      );
  }



  public matiereFromId(id: number): Observable<MatiereWithId> {
    return this.http.get<MatiereWithId>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((n: MatiereWithId): MatiereWithId => (
        {
          id: n.id === undefined ? -1 : n.id,
          nom: n.nom,
          themeM:n.themeM,
          description:n.description,
          linkMatiere:n.linkMatiere,
        })))
  }
}
