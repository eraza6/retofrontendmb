import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  
  private http = inject(HttpClient);
  private exchangeUrl = environment.API_EXCHANGE_URL;

  
  exchangeLatest(base: string, symbols: string): Observable<any> {
    let params = new HttpParams()
    .set('base', base)
    .set('symbols', symbols)

    return this.http.get(
      `${this.exchangeUrl}?app_id=${environment.APP_ID_EXCHANGE}`, { params }
    );
  }
  
}
