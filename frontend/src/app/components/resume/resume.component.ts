import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-resume",
  templateUrl: "./resume.component.html",
  styleUrls: ["./resume.component.scss"],
})
export class ResumeComponent implements OnInit {
  userName: string;
  constructor(private _ROUTER: Router) {
    this.userName = localStorage.getItem("user_name");
  }

  ngOnInit() {}

  onClickStartQuiz() {
    if (localStorage.getItem("hasPreferences") === "true") {
      this._ROUTER.navigate(["quiz"]);
    } else {
      this._ROUTER.navigate(["preferencias"]);
    }
  }
}
