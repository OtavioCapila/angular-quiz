import { Router } from "@angular/router";
import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { UserService } from '../admin-user-register/user.service';
import { QuizService } from 'src/app/components/quiz/quiz.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit {
  @Output() userClickedGoBack = new EventEmitter();
  @Input() showButtonGoBack = false;
  view: any[] = [700, 700];
  allUsers: any = [];
  allUsersModified: any = [];
  xAxisLabel = "Pontuação";
  yAxisLabel = "Jogadores";
  legendTitle = "Legenda";
  myPosition: any;
  colorScheme = {
    domain: ['#007BFF']
  };
  constructor(
    private _USER: UserService,
    private _QUIZ: QuizService
  ) {}

  ngOnInit() {
    this.fetchAllUsers();
    setInterval(() => {
      this.fetchAllUsers();
    }, 10000);
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
}
