import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginWithId, apiResponse } from 'src/api.interface';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private server = 'http://localhost:8080/api';
  private _error: boolean = false;

  public reset_error() {
    this._error = false;
  }

  public get error() {
    return this._error;
  }

  public get isAuthentified(): boolean {

    return this.sessionS.getItem('token')!==null?true:false;
  }

  public tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    const currentTimestamp = Math.floor((new Date).getTime() / 1000);
    const expirationThreshold = 30; // Temps d'expiration seuil en secondes
    
    return (expiry - currentTimestamp) <= expirationThreshold;
  }
  


  public get token(): string | null {
    
    return this.sessionS.getItem('token') || '';
  }

  constructor(private http: HttpClient, private sessionS: SessionStorageService) {}

  public login(email: string, password: string): Observable<boolean> {
    return this.http.post(this.server + '/login_check', { email, password }).pipe(
      map((response: any) => {
        if (response) {
          console.log(response);
          this.sessionS.setItem('token', response['token']);
          this.sessionS.setItem('refresh_token', response['refresh_token']);
          this._error = false; // Réinitialisez l'erreur lors d'une connexion réussie
          return true;
        } else {
          this._error = true;
          return false;
        }
      }),
      catchError((error) => {
        this._error = true;
        return of(false); // Retourne un Observable de valeur false en cas d'erreur
      })
    );
  }

  public renewToken(): void {

      this.http.post(this.server + '/token/refresh',{"refresh_token":this.sessionS.getItem('refresh_token')}).subscribe({
        next: (response: any) => {
          if (response) {
            this.sessionS.setItem('token', response['token']);
            this._error = false; // Réinitialisez l'erreur lors du renouvellement réussi du jeton
          } else {
            this._error = true;
          }
        },
        error: (error) => {
          this._error = true;
          console.log("ICI", error)
        },
      });
  }


}

