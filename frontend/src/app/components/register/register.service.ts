import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BackendUrlService } from 'src/app/shared/services/backendUrl.service';

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor(private _HTTP: HttpClient,private URL: BackendUrlService) {}

  returnUrl() {
    if (window.location.host === "localhost:4200") {
      return "http://localhost:3000/api";
    } else {
      return this.URL.returnBackendUrl();
    }
  }

  userRegister(data): Observable<any> {
    return this._HTTP.post(`${this.returnUrl()}/user`, data);
  }
}
