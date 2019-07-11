import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BackendUrlService } from 'src/app/shared/services/backendUrl.service';

@Injectable({
  providedIn: "root",
})
export class QuizService {
  
  constructor(private _HTTP: HttpClient,private URL: BackendUrlService) {}


  returnUrl() {
    if (window.location.host === "localhost:4200") {
      return "http://localhost:3000/api";
    } else {
      return this.URL.returnBackendUrl();
    }
  }

  fetchUserData(id): Observable<any> {
    return this._HTTP.get(`${this.returnUrl()}/user/${id}`);
  }

  getAllQuestions(): Observable<any> {
    return this._HTTP.get(`${this.returnUrl()}/questions`);
  }

  updateUserTotalScore(id, data): Observable<any> {
    return this._HTTP.put(`${this.returnUrl()}/user/score/${id}`, data);
  }

  updateUserTotalQuestionsAnwsered(id, question): Observable<any> {
    const data = {
      question,
    };
    return this._HTTP.put(
      `${this.returnUrl()}/user/anwseredquestions/${id}`,
      data
    );
  }

  updateTotalCorrectQuestionsAnwsered(id): Observable<any> {
    return this._HTTP.put(`${this.returnUrl()}/user/correctanwser/${id}`, "");
  }

  updateUserPreferences(id,data): Observable<any> {
    const preferences = {
      "userPreferences": [
        ...data
      ]
    };
    return this._HTTP.put(`${this.returnUrl()}/user/preferences/${id}`, preferences);
  }
}
