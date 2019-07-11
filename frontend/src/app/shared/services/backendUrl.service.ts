import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendUrlService {
  BASE_URL = "https://trie-quiz-backend.herokuapp.com/api"
  constructor() { }

  returnBackendUrl() {
    return this.BASE_URL;
  }
}
