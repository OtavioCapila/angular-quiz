import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { QuestionService } from "./question.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-admin-question-register",
  templateUrl: "./admin-question-register.component.html",
  styleUrls: ["./admin-question-register.component.css"],
  providers: [QuestionService],
})
export class AdminQuestionRegisterComponent implements OnInit {
  questionForm: FormGroup;
  showEditQuestionBtn = false;
  allQuestions = [];
  questionId = '';
  step = 0;
  constructor(
    private _FB: FormBuilder,
    private _QUESTION: QuestionService,
    private _TOASTR: ToastrService
  ) {}

  ngOnInit() {
    this.instantiateForm();
    this.fetchAllQuestions();
  }

  instantiateForm() {
    this.questionForm = this._FB.group({
      question: new FormControl("", Validators.required),
      anwser_options: this._FB.array([]),
      correct_anwser: new FormControl("", Validators.required),
      points: new FormControl(0, Validators.required),
      article: new FormControl(""),
      descriptive_text: new FormControl(""),
    });
    this.addItem();
  }

  onClickEditQuestion(evt) {
    console.log('evt: ', evt);
    this.showEditQuestionBtn = true;
    this.questionId = evt._id;
    this.questionForm.get("question").setValue(evt.question);
    this.questionForm.get("correct_anwser").setValue(evt.correct_anwser);
    this.questionForm.get("points").setValue(evt.points);
    this.questionForm.get("article").setValue(evt.article);
    this.questionForm.get("descriptive_text").setValue(evt.descriptive_text);
    this.clearFormArray();
    this.editQuestionAddItem(evt);
  }

  addItem(): void {
    const control = this.questionForm.controls.anwser_options as FormArray;
    control.push(
      this._FB.group({
        anwser: new FormControl("", Validators.required),
        correct_anwser: new FormControl(0),
      })
    );
  }

  editQuestionAddItem(evt) {
    evt.anwser_options.forEach(element => {
      const control = this.questionForm.controls.anwser_options as FormArray;
      control.push(
        this._FB.group({
          anwser: new FormControl(element.anwser, Validators.required),
          correct_anwser: new FormControl(element.correct_anwser),
        })
      );
    });
  }

  onClickSaveEditedQuestion(){
    this._QUESTION.updateQuestion(this.questionId,this.questionForm.value).subscribe(
      accept => {
        this.questionForm.reset();
        this.clearFormArray();
        this._TOASTR.success(accept.message);
        this.addItem();
        this.fetchAllQuestions();
        this.showEditQuestionBtn = false;

      },
      reject => {
        this.showEditQuestionBtn = false;
        this._TOASTR.error(reject.error.message);
      }
    )
  }

  clearFormArray() {
    const control = this.questionForm.controls.anwser_options as FormArray;
    control.controls = [];
    return true;
  }

  onCheckCorrectAnwser(evt) {
    const control = this.questionForm.controls.anwser_options as FormArray;
    control.controls.forEach(element => {
      element.value.correct_anwser = 0;
    });
    control.controls[evt].value.correct_anwser = 1;
    this.questionForm.controls["correct_anwser"].setValue(
      control.controls[evt].value
    );
  }

  get questionArray(): FormArray {
    return this.questionForm.get("anwser_options") as FormArray;
  }

  onClickSave() {
    this._QUESTION.createQuestion(this.questionForm.value).subscribe(
      async accept => {
        this.questionForm.reset();
        this._TOASTR.success("Pergunta criada com sucesso");
        this.fetchAllQuestions();
        await this.clearFormArray();
        this.addItem();
      },
      reject => {
        this._TOASTR.error("Falha ao salvar pergunta");
      }
    );
  }

  editQuestion(){

  }

  onClickDeleteQuestion(id) {
    this._QUESTION.deleteQuestion(id).subscribe(
      accept => {
        this._TOASTR.info(accept.message);
        this.fetchAllQuestions();
      },
      reject => {
        this._TOASTR.error(reject.message);
      }
    );
  }

  fetchAllQuestions() {
    this._QUESTION.getAllQuestions().subscribe(
      accept => {
        this.allQuestions = accept.data;
      },
      reject => {
        this.fetchAllQuestions();
      }
    );
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
