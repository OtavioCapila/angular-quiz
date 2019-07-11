import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendUrlService } from 'src/app/shared/services/backendUrl.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _HTTP: HttpClient,private URL: BackendUrlService) { }

  createUser(data): Observable<any> {
    return this._HTTP.post(`${this.URL.returnBackendUrl()}/user`, data);
  }

  getAllUsers(): Observable<any> {
    return this._HTTP.get(`${this.URL.returnBackendUrl()}/users`);
  }

  updateUser(id,data): Observable<any> {
    return this._HTTP.put(`${this.URL.returnBackendUrl()}/user/${id}`,data);
  }

  deleteUser(id): Observable<any> {
    return this._HTTP.delete(`${this.URL.returnBackendUrl()}/user/${id}`);
  }

}
