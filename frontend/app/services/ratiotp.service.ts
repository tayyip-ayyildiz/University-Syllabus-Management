import { Tarif } from './../../Entity/Tarif';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { apiResponse, TarifResponse, TarifWithId } from '../../api.interface';

@Injectable({
  providedIn: 'root'
})
export class RatiotpService {

  private server: string = "http://localhost:8080/api/tarifs";

  constructor(private http: HttpClient) { }

  private TarifToTarifResponse(tarif: TarifWithId | Tarif): TarifResponse {
    let n = tarif as TarifWithId
    return {

      id: n.id ? n.id : undefined,
      ratioTP: n.ratioTP,
      formationsT:n.formationsT
    }
  }

  public all(): Observable<Array<TarifWithId>> {
    return this.http.get<apiResponse<TarifWithId>>(this.server,
      { observe: 'body', responseType: 'json' })
      .pipe(tap(console.log), map((data) => data['hydra:member']))
  }

  public modifyTarif(tarif: TarifWithId): Observable<boolean> {
    return this.http.put(this.server+"/"+tarif.id.toString(),
    tarif,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===200))
  }

  public createTarif(tarif: Tarif) : Observable<boolean> {
    return this.http.post(this.server,
      tarif,
      {observe: 'response', responseType: 'json'})
      .pipe(map((response)=>response.status===201))
  }

  //enlever supp et from id car que pour le ratioTP à moins que plus tard d'autres ratios viendront se rajouter

}
