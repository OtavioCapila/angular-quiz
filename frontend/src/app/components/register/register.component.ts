import { ToastrService } from "ngx-toastr";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { RegisterService } from "./register.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  providers: [RegisterService],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private _FB: FormBuilder,
    private _REGISTER: RegisterService,
    private _TOASTR: ToastrService,
    private _ROUTER: Router
  ) { }

  ngOnInit() {
    this.instantiateForm();
  }

  instantiateForm() {
    this.registerForm = this._FB.group({
      access_code: new FormControl(
        Math.random()
          .toString(36)
          .substring(8)
          .toUpperCase()
      ),
      name: new FormControl("", Validators.required),
      surname: new FormControl(""),
      cellphone: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
      industry_state: new FormControl("", Validators.required),
      total_correct_anwsered_questions: new FormControl(0),
      total_points: new FormControl(0),
    });
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

  verifyIfUserAlreadySelectedPreference(data) {
    if (data.userPreferences[0]) {
      localStorage.setItem("hasPreferences", "true");
    } else {
      localStorage.setItem("hasPreferences", "false");
    }
  }

  onClickRegisterNewUser() {
    
    this._REGISTER.userRegister(this.registerForm.value).subscribe(
      accept => {
        
        this.registerForm.reset();
        localStorage.setItem("access_code", accept.data.access_code);
        localStorage.setItem("user_id", accept.data._id);
        localStorage.setItem("user_name", accept.data.name);
        this._TOASTR.success("Registrado com sucesso");
        setTimeout(() => {
          this._ROUTER.navigate(['sobre-nos']);
        }, 400);
      },
      reject => {
        
        this._TOASTR.error("Falha ao registrar");
      }
    );
  }
}
