import { Router } from "@angular/router";
import { QuizService } from "./../quiz/quiz.service";
import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { UserService } from "../admin-panel/components/admin-user-register/user.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @Output() userClickedGoBack = new EventEmitter();
  @Input() showButtonGoBack = false;
  view: any[] = [700, 700];
  allUsers: any = [];
  myData: any;
  customColors = [];
  allUsersModified: any = [];
  xAxisLabel = "Pontuação";
  yAxisLabel = "Jogadores";
  legendTitle = "Legenda";
  myPosition: any;
  colorScheme = {
    domain: ["#c9c9c9"],
  };
  constructor(
    private _USER: UserService,
    private _QUIZ: QuizService,
    private _ROUTER: Router
  ) {}

  ngOnInit() {
    this.fetchAllUsers();
    setInterval(() => {
      this.fetchAllUsers();
    }, 10000);
    this.fetchMyData();
  }

  fetchAllUsers() {
    this._USER.getAllUsers().subscribe(
      accept => {
        this.allUsers = accept.data;
        this.modifyAllUsersArray();
      },
      reject => {}
    );
  }

  fetchMyData() {
    this._QUIZ.fetchUserData(localStorage.getItem("user_id")).subscribe(
      accept => {
        this.myData = accept.data;
        this.customColors.push({
          name: accept.data.name,
          value: "#007BFF",
        });

      },
      reject => {
        /* alert('Falha ao buscar dados do usuário');
        this._ROUTER.navigate(['/']);
        localStorage.clear(); */
      }
    );
  }

  compare(a, b) {
    if (a.total_points < b.total_points) {
      return -1;
    }
    if (a.total_points > b.total_points) {
      return 1;
    }
    return 0;
  }

  getMyRankingPosition() {
    this.myPosition = this.allUsersModified.findIndex(
      x => x._id === localStorage.getItem("user_id")
    );
  }

  setCustomColor() {
    this.allUsersModified.forEach(element => {});
  }

  async modifyAllUsersArray() {
    this.allUsers.forEach(element => {
      element.series = [];
      element.value = element.total_points;
      const value = {
        name: element.name,
        value: element.total_points,
      };
      element.series.push(value);
      return element;
    });
    this.allUsersModified = this.allUsers;
    this.allUsersModified.sort((a, b) => {
      return b.value - a.value;
    });
    this.getMyRankingPosition();
    this.allUsersModified.splice(10, this.allUsersModified.length - 1);
  }

  onClickGoBack() {
    this.userClickedGoBack.emit(true);
  }

  onClickGoToQuiz() {
    this._ROUTER.navigate(["/quiz"]);
  }
}
