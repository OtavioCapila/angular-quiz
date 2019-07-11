import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

constructor(private _TOKEN: CookieService) { }

  SetToken(token: string) {
    this._TOKEN.set('auth_token', token);
  }

  GetToken() {
    return this._TOKEN.get('auth_token');
  }

  DeleteToken() {
    this._TOKEN.delete('auth_token');
  }
}
