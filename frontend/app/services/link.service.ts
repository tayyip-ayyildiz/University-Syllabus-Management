import { Link } from './../../Entity/Link';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { apiResponse, LinkResponse, LinkWithId } from '../../api.interface';

import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private server: string = "http://localhost:8080/api/links";

  private server1: string = ""

  constructor(private http: HttpClient) { }

  private LinkToLinkResponse(matiere: LinkWithId | Link): LinkResponse {
    let n = matiere as LinkWithId
    return {

      id: n.id ? n.id : undefined,
      matiere:n.matiere,
      hcm:n.hcm,
      htd:n.htd,
      htp:n.htp,
      forNivGroupe:n.forNivGroupe,
      coutHTD:n.coutHTD,
      coutTotal:n.coutTotal,
      tabc:n.tabc
      
    }
  }

  public all(): Observable<Array<LinkWithId>> {
    return this.http.get<apiResponse<LinkWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public getAllFormationFromId(id: number): Observable<Array<LinkWithId>> {
    return this.http.get<apiResponse<LinkWithId>>("http://localhost:8080/api/formationsWithLinks"+"/"+id,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public getLinkWithAll(id:number){

    return this.http.get<apiResponse<LinkWithId>>("http://localhost:8080/api/linkWithAll/"+id,  
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))

  }



  public deleteLinkFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server+"/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public modifyLink(link: LinkWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+link.id.toString(),
    link,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }

  public createLink(link: Link) : Observable<LinkWithId> {
    
    return this.http.post<LinkWithId|null> (this.server, link, {observe: 'response', responseType: 'json'})

      .pipe(
        filter((response) => response.status === 201 && response.body !== null),  
        map((response)=>{
          
          if (response.body) {
            return response.body as LinkWithId;
          } 
          
          else {

            throw new Error('Failed to create Link');
          
          }

        })

      );
  }



  public linkFromId(id: number): Observable<LinkWithId> {
    return this.http.get<LinkWithId>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((n: LinkWithId): LinkWithId => (
        {
          id: n.id === undefined ? -1 : n.id,
          matiere:n.matiere,
          hcm:n.hcm,
          htd:n.htd,
          htp:n.htp,
          forNivGroupe:n.forNivGroupe,
          coutHTD:n.coutHTD,
          coutTotal:n.coutTotal,
          tabc:n.tabc
        })))
  }
}
