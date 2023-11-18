import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  public getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  public setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
