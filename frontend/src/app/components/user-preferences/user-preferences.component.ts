import { QuizService } from "./../quiz/quiz.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-preferences",
  templateUrl: "./user-preferences.component.html",
  styleUrls: ["./user-preferences.component.scss"],
})
export class UserPreferencesComponent implements OnInit {
  userPreferences = [];
  sendingData = false;
  position = 'after';
  constructor(private _QUIZ: QuizService, private _ROUTER: Router) {}

  ngOnInit() {}

  onSelectPreference(evt) {
    if (evt.status === true) {
      this.userPreferences.push(evt.value);
    } else {
      this.userPreferences = this.userPreferences.filter(
        item => item !== evt.value
      );
    }
  }

  onClickSend() {
    this.sendingData = true;
    this._QUIZ
      .updateUserPreferences(
        localStorage.getItem("user_id"),
        this.userPreferences
      )
      .subscribe(
        accept => {
          this.sendingData = false;
          this._ROUTER.navigate(["quiz"]);
        },
        reject => {
          this.sendingData = false;
          this._ROUTER.navigate(["quiz"]);
        }
      );
  }
}
