import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "./../login/login.service";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
@Component({
  selector: "app-new-login",
  templateUrl: "./new-login.component.html",
  styleUrls: ["./new-login.component.scss"],
})
export class NewLoginComponent implements OnInit {
  userInput = "";
  constructor(
    private _LOGIN: LoginService,
    private _TOASTR: ToastrService,
    private _ROUTER: Router
  ) {}

  ngOnInit() {}

  onClickSubmit() {
    this._LOGIN.userLogin(this.userInput).subscribe(
      accept => {
        localStorage.setItem("access_code", accept.data.access_code);
        localStorage.setItem("user_id", accept.data._id);
        localStorage.setItem("user_name", accept.data.name);
        this._TOASTR.success(`Bem vindo ${accept.data.name}`);
        this.verifyIfUserAlreadySelectedPreference(accept.data);
        this._ROUTER.navigate(["sobre-nos"]);
        console.log("accept: ", accept);
      },
      reject => {
        console.log("reject: ", reject);
        this.notRegistered();
        this.userInput = "";
      }
    );
  }

  verifyIfUserAlreadySelectedPreference(data) {
    if (data.userPreferences[0]) {
      localStorage.setItem("hasPreferences", "true");
    } else {
      localStorage.setItem("hasPreferences", "false");
    }
  }

  onClickRegister(){
    this._ROUTER.navigate(['registrar']);
  }

  notRegistered() {
    Swal.fire({
      title: "Usuário não cadastrado",
      text: "Não encontramos o seu cadastro em nossa base de dados",
      type: "error",
      confirmButtonText: "Fechar",
    });
  }
}
