import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { LoginWithId, apiResponse } from 'src/api.interface';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/Entity/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private server = 'http://localhost:8080/api/logins'

  constructor(private http: HttpClient) { }

  public all(): Observable<Array<LoginWithId>> {
    return this.http.get<apiResponse<LoginWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public async getId(email: string): Promise<number> {   //décrit
    return new Promise<number>((resolve, reject) => {

      let foundId = -1;

      let subscription = this.all().subscribe((t) => {

        t.forEach((elem) => {

          if (elem.email === email) {

            foundId = elem.id;
            subscription.unsubscribe();
            resolve(foundId);
          }
        });

        if (foundId === -1) {
          subscription.unsubscribe();
          resolve(-1);
        }
      });
    });
  }


  public deleteLoginFromId(id: number): Observable<boolean> {
    return this.http.delete(this.server+"/"+id.toString(),
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===204))
  }

  public modifyLogin(login: LoginWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+login.id.toString(),
    login,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }

  public createLogin(login: Login) : Observable<boolean> {
    return this.http.post(this.server,
      login,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===201))
  }



  public loginFromId(id: number): Observable<LoginWithId> {
    return this.http.get<LoginWithId>(this.server + "/" + id.toString(),
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((n: LoginWithId): LoginWithId => (
        {
          id: n.id === undefined ? -1 : n.id,
          nom: n.nom,
          prenom:n.prenom,
          email:n.email,
          mdp:n.mdp,
          datedenaissance:n.datedenaissance,
          tel:n.tel,
          roles:n.roles
        })))
  }


}
