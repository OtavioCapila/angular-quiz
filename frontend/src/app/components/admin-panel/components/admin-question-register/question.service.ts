import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BackendUrlService } from 'src/app/shared/services/backendUrl.service';

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  constructor(private _HTTP: HttpClient,private URL: BackendUrlService) {}

  createQuestion(data): Observable<any> {
    return this._HTTP.post(`${this.URL.returnBackendUrl()}/question`, data);
  }

  getAllQuestions(): Observable<any> {
    return this._HTTP.get(`${this.URL.returnBackendUrl()}/questions`);
  }

  deleteQuestion(id): Observable<any> {
    return this._HTTP.delete(`${this.URL.returnBackendUrl()}/question/${id}`);
  }

  deleteAllQuestions(): Observable<any> {
    return this._HTTP.delete(`${this.URL.returnBackendUrl()}/questions`);
  }

  updateQuestion(id, data): Observable<any> {
    return this._HTTP.put(`${this.URL.returnBackendUrl()}/question/${id}`, data);
  }
}
