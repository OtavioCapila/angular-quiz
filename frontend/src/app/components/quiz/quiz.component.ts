import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { QuizService } from "./quiz.service";
import Swal from "sweetalert2";
import { MatStepper } from "@angular/material/stepper";
import { MatDialog } from "@angular/material/dialog";
import { FeedbackComponent } from "./components/feedback/feedback.component";
import { Router } from '@angular/router';

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.scss"],
  providers: [QuizService],
})
export class QuizComponent implements OnInit {
  @ViewChild("stepper") stepper;
  showButtonGoBack = true;
  loadingQuestions = false;
  isLinear = true;
  quizForm: FormGroup;
  userData: any;
  allQuestionsAnwsered: any;
  allQuestions: any;
  AllQuestionsFiltered: any;
  userId: string;
  actualQuestionIndex: string;
  showCorrectAnwser = false;
  showRanking = false;
  showLastScreen = false;
  sendingData = false;
  stepperCont = 0;
  articleObj = [];
  articleArray = [];
  disableSendQuestionBtn = true;
  actualSelectedAnwser = { anwser: '', correct_anwser: 0 };
  constructor(
    private _FB: FormBuilder,
    private _QUIZ: QuizService,
    private _DIALOG: MatDialog,
    private _ROUTER: Router
  ) {
    this.userId = localStorage.getItem("user_id");
  }

  async ngOnInit() {
    await this.fetchAllQuestions();
    this.instantiateForm();
  }

  instantiateForm() {
    this.quizForm = this._FB.group({
      question: new FormControl("", Validators.required),
      anwser_options: this._FB.array([]),
      correct_anwser: new FormControl("", Validators.required),
      points: new FormControl(0, Validators.required),
      article: new FormControl(""),
      descriptive_text: new FormControl(""),
    });
    return true;
  }

  fetchAllQuestions() {
    this.loadingQuestions = true;
    this._QUIZ.getAllQuestions().subscribe(
      accept => {
        this.createArrayWithArticles(accept.data);
        this.loadingQuestions = false;
        this.allQuestions = accept.data.sort();
        this.allQuestions = this.sortArray();
        this.fetchUserData();
        return true;
      },
      reject => {
        this.loadingQuestions = false;
        this.fetchAllQuestions();
      }
    );
  }

  createArrayWithArticles(data) {
    
    const reg1 = /global_innovation/;
    const reg2 = /industria_4_0|industria40.gov.br/;
    const reg3 = /oft/;
    const reg4 = /flow_stratification/;
    const reg5 = /mitos_e_verdades/;
    const reg6 = /2027/;
    data.forEach(element => {
      if (element.article) {
        if (element.article.match(reg1)) {
          this.articleObj.push({ title: 'Índice Global de Inovação', article: element.article });
        }
        if (element.article.match(reg2)) {
          this.articleObj.push({ title: 'Tecnologia da Indústria 4.0', article: element.article });
        }
        if (element.article.match(reg3)) {
          this.articleObj.push({ title: 'OFT - Otimização de chama', article: element.article });
        }
        if (element.article.match(reg4)) {
          this.articleObj.push({ title: 'Coprocessamento', article: element.article });
        }
        if (element.article.match(reg5)) {
          this.articleObj.push({ title: 'NOx e CO', article: element.article });
        }
        if (element.article.match(reg6)) {
          this.articleObj.push({ title: 'Projeto Indústria 2027', article: element.article });
        }
      }
    });
    const groupByTitle = this.groupBy('title');
    this.articleArray = groupByTitle(this.articleObj);
    
    this.articleArray['NOx e CO'].splice(1, 1);
    this.articleArray['OFT - Otimização de chama'].splice(1, 3);
  }

  groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  changeStep(index: number) {
    this.stepper.selectedIndex = index;
  }

  onChangeAnwserSelected(evt, index) {
    this.disableSendQuestionBtn = false;
    this.actualSelectedAnwser.anwser = evt.anwser;
    this.actualSelectedAnwser.correct_anwser = evt.correct_anwser;
    this.actualQuestionIndex = index;
  }

  async verifySelectedQuestion() {
    this.sendingData = true;
    this.showCorrectAnwser = true;
    if (this.actualSelectedAnwser.correct_anwser === 1) {
      this.correctAnwser(
        this.AllQuestionsFiltered[this.actualQuestionIndex].points
      );
      await this.updateUserTotalQuestion(
        this.AllQuestionsFiltered[this.actualQuestionIndex]
      );
      await this.updateUserTotalScore(
        this.AllQuestionsFiltered[this.actualQuestionIndex]
      );
      await this.updateTotalCorrectQuestionsAnwsered();
    } else {
      /* if (
        this.AllQuestionsFiltered[this.actualQuestionIndex].article ||
        this.AllQuestionsFiltered[this.actualQuestionIndex].descriptive_text
      ) {
        this.openFeedBackModal(
          this.AllQuestionsFiltered[this.actualQuestionIndex]
        );
      } */
      await this.updateUserTotalQuestion(
        this.AllQuestionsFiltered[this.actualQuestionIndex]
      );
    }
  }

  openFeedBackModal(data) {
    this._DIALOG.open(FeedbackComponent, {
      disableClose: true,
      data,
    });
  }

  onClickNextQuestion() {
    this.disableSendQuestionBtn = true;
    this.showCorrectAnwser = false;
  }

  async updateUserTotalQuestion(data) {
    this._QUIZ.updateUserTotalQuestionsAnwsered(this.userId, data).subscribe(
      accept => {
        this.sendingData = false;
      },
      reject => {
        this.sendingData = false;
      }
    );
    return true;
  }

  async updateTotalCorrectQuestionsAnwsered() {
    this._QUIZ.updateTotalCorrectQuestionsAnwsered(this.userId).subscribe(
      accept => {

        this.sendingData = false;
      },
      reject => {

        this.sendingData = false;
      }
    );
    return true;
  }

  sortArray() {
    const shuffled = this.allQuestions
      .map(a => ({
        sort: Math.random(),
        value: a,
      }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value);
    return shuffled;
  }
  async fetchUserData() {
    this._QUIZ.fetchUserData(localStorage.getItem("user_id")).subscribe(
      accept => {
        this.userData = accept.data;
        this.allQuestionsAnwsered = this.userData.questions_anwsered;
        if (this.allQuestionsAnwsered.length === 0) {
          this.AllQuestionsFiltered = this.allQuestions.sort();
        } else {
          this.filterAllQuestions();
        }
      },
      reject => {
        alert('Falha ao buscar dados do usuário');
        this._ROUTER.navigate(['/']);
        localStorage.clear();
      }
    );
  }

  async filterAllQuestions() {
    if (this.allQuestionsAnwsered.length >= this.allQuestions.length) {
      this.showLastScreen = true;
    } else {
      const arr = [];
      this.allQuestionsAnwsered.forEach(element => {
        arr.push(element._id);
      });
      const uniq = await this.removeDuplicates(arr);
      this.AllQuestionsFiltered = await this.allQuestions.filter(
        el => !uniq.includes(el._id)
      );
    }
  }

  removeDuplicates(arr) {
    const s = new Set(arr);
    const it = s.values();
    return Array.from(it);
  }

  async updateUserTotalScore(data) {
    this._QUIZ
      .updateUserTotalScore(this.userId, data)
      .subscribe(accept => { }, reject => { });
    return true;
  }

  onAnwserLastQuestion() {
    this.showLastScreen = true;
  }

  correctAnwser(value) {
    Swal.fire({
      title: `Você ganhou +${value} pontos pela resposta!`,
      text: "",
      type: "success",
      confirmButtonText: "OK",
    })/* .then(() => {
      if (
        this.AllQuestionsFiltered[this.actualQuestionIndex].article ||
        this.AllQuestionsFiltered[this.actualQuestionIndex].descriptive_text
      ) {
        this.openFeedBackModal(
          this.AllQuestionsFiltered[this.actualQuestionIndex]
        );
      }
    }) */
  }

  wrongAnwser() {
    Swal.fire({
      title: "Você não pontuou",
      text: "Resposta Incorreta",
      type: "error",
      confirmButtonText: "OK"
    });
  }

  goForward(stepper: MatStepper) {
    stepper.next();
    this.stepperCont++;
    if (this.stepperCont === 5) {
      this.showRanking = true;
      this.stepperCont = 0;
    }
  }

  handlerUserClickedGoBack(evt) {
    if (evt === true) {
      this.showRanking = false;
    }
  }

  verifyIfIsNeededToOpenModal() {
    if (
      this.AllQuestionsFiltered[this.actualQuestionIndex].article ||
      this.AllQuestionsFiltered[this.actualQuestionIndex].descriptive_text
    ) {
      this.openFeedBackModal(
        this.AllQuestionsFiltered[this.actualQuestionIndex]
      );
    }
  }
}
