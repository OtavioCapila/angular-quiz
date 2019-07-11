import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { UserService } from "./user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-admin-user-register",
  templateUrl: "./admin-user-register.component.html",
  styleUrls: ["./admin-user-register.component.css"],
  providers: [UserService],
})
export class AdminUserRegisterComponent implements OnInit {
  userForm: FormGroup;
  showEditUserBtn = false;
  userId = "";
  allUsers = [];
  step = 0;
  constructor(
    private _FB: FormBuilder,
    private _USER: UserService,
    private _TOASTR: ToastrService
  ) {}

  ngOnInit() {
    this.instantiateForm();
    this.fetchAllUsers();
  }

  instantiateForm() {
    this.userForm = this._FB.group({
      access_code: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      surname: new FormControl("", Validators.required),
      cellphone: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
      industry_state: new FormControl("", Validators.required),
      total_correct_anwsered_questions: new FormControl(0),
      total_points: new FormControl(0),
    });
  }

  onClickEditUser(evt) {
    this.userId = evt._id;
    this.showEditUserBtn = true;
    this.userForm.get("access_code").setValue(evt.access_code);
    this.userForm.get("name").setValue(evt.name);
    this.userForm.get("surname").setValue(evt.surname);
    this.userForm.get("cellphone").setValue(evt.cellphone);
    this.userForm.get("email").setValue(evt.email);
    this.userForm.get("role").setValue(evt.role);
    this.userForm.get("industry_state").setValue(evt.industry_state);
    this.userForm.get("total_points").setValue(evt.total_points);
    this.userForm
      .get("total_correct_anwsered_questions")
      .setValue(evt.total_correct_anwsered_questions);
  }

  onClickSaveEditedUser() {
    this._USER.updateUser(this.userId, this.userForm.value).subscribe(
      accept => {
        this.showEditUserBtn = false;
        this.userForm.reset();
        this._TOASTR.success(accept.message);
        this.fetchAllUsers();
      },
      reject => {
        this.showEditUserBtn = false;
        this._TOASTR.error(reject.error.message);
      }
    );
  }

  onClickSaveNewUser() {
    this._TOASTR.info("Enviando dados");
    this._USER.createUser(this.userForm.value).subscribe(
      accept => {
        this._TOASTR.success("Usuário cadastrado com sucesso");
        this.userForm.reset();
        this.fetchAllUsers();
      },
      reject => {
        this._TOASTR.error("Falha ao cadastrar usuário");
      }
    );
  }

  fetchAllUsers() {
    this._USER.getAllUsers().subscribe(
      accept => {
        this.allUsers = accept.data;
      },
      reject => {}
    );
  }

  confirmar(texto, callback1, callback2) {
    const confirmacao = confirm(texto);
    if (confirmacao) {
      callback1();
    } else {
      callback2();
    }
  }

  apagar(id) {
    this.confirmar(
      "Deseja apagar?",
      () => {
        this.onClickDeleteUser(id);
      },
      () => {
        alert("Não apagado!");
      }
    );
  }

  onClickDeleteUser(id) {
    this._USER.deleteUser(id).subscribe(
      accept => {
        this._TOASTR.success("Usuário removido com sucesso");
        this.fetchAllUsers();
      },
      reject => {
        this._TOASTR.error("Falha ao remover usuário");
      }
    );
  }

  get questionArray(): FormArray {
    return this.userForm.get("questions_anwsered") as FormArray;
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

  onClickDeleteAnwseredQuestion(evt) {
    this.questionArray.removeAt(evt);
  }

  telCelMask(rawValue) {
    const nb = rawValue.match(/\d/g);
    let numberLength = 0;
    if (nb) {
      numberLength = nb.join("").length;
    }
    if (numberLength <= 10) {
      return [
        "(",
        /[0-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
    } else {
      return [
        "(",
        /[0-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
    }
  }
}
