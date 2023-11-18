import { ForNivGroupe } from './../../Entity/ForNivGroupe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { apiResponse, ForNivGroupeResponse, ForNivGroupeWithId } from '../../api.interface';

@Injectable({
  providedIn: 'root'
})
export class ForNivService {

  private server: string = "http://localhost:8080/api/for_niv_groupes";

  constructor(private http: HttpClient) { }

  private ForNivGroupeToForNivGroupeResponse(forN: ForNivGroupeWithId | ForNivGroupe): ForNivGroupeResponse {
    let n = forN as ForNivGroupeWithId
    return {

      id: n.id ? n.id : undefined,
      formation:n.formation,
      niveauF:n.niveauF,
      specialite:n.specialite,
      parcours:n.parcours,
      coutTotal:n.coutTotal,
      nbgroupetd:n.nbgroupetd,
      nbgroupetp:n.nbgroupetp,
      linkForNivG:n.linkForNivG,
      crespeB:n.crespeB,
      tabA:n.tabA
      
    }
  }

  public all(): Observable<Array<ForNivGroupeWithId>> {
    return this.http.get<apiResponse<ForNivGroupeWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public getForNFromFNPS(id:number,id1:number,id2:number,id3:number): Observable<Array<ForNivGroupeWithId>> {
    return this.http.get<apiResponse<ForNivGroupeWithId>>("http://localhost:8080/api/forniv/"+id+"/"+id1+"/"+id2+"/"+id3,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public getLinkWithAll(){

    return this.http.get<apiResponse<ForNivGroupeWithId>>("http://localhost:8080/api/ForNivWithAll/",
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))


  }

  public deleteForNivGroupeFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server+"/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public modifyForNivGroupe(forN: ForNivGroupeWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+forN.id.toString(),
    forN,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }

  public createForNivGroupe(forN: ForNivGroupe) : Observable<ForNivGroupeWithId> {
    return this.http.post<ForNivGroupeWithId|null> (this.server, forN, {observe: 'response', responseType: 'json'})

      .pipe(
        filter((response) => response.status === 201 && response.body !== null),  
        map((response)=>{
          
          if (response.body) {
            return response.body as ForNivGroupeWithId;
          } 
          
          else {

            throw new Error('Failed to create ForNivGroupe');
          
          }

        })

      );
  }

  
  



  public forNivGroupeFromId(id: number): Observable<ForNivGroupeWithId> {
    return this.http.get<ForNivGroupeWithId>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((n: ForNivGroupeWithId): ForNivGroupeWithId => (
        {
          id: n.id === undefined ? -1 : n.id,
          formation:n.formation,
          niveauF:n.niveauF,
          specialite:n.specialite,
          parcours:n.parcours,
          coutTotal:n.coutTotal,
          nbgroupetd:n.nbgroupetd,
          nbgroupetp:n.nbgroupetp,
          linkForNivG:n.linkForNivG,
          crespeB:n.crespeB,
          tabA:n.tabA
          
        })))
  }
}
