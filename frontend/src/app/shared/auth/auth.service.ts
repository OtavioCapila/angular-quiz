import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { TokenService } from "../services/token.service";
import Swal from "sweetalert2";

@Injectable()
export class AuthService {
  constructor(private _TOKEN: TokenService, private _ROUTER: Router) { }

  isAuthenticated() {
    if (this._TOKEN.GetToken()) {
      return true;
    } else {
      this.accessDenied();
      this._ROUTER.navigate(['admin']);
      return false;
    }
  }

  userIsAuthenticated() {
    if (localStorage.getItem('user_id')) {
      return true;
    } else {
      this.accessDenied();
      this._ROUTER.navigate(['/']);
      return false;
    }
  }

  accessDenied() {
    Swal.fire({
      title: "Acesso Negado",
      text: "Você não possui permissão para acessar",
      type: "error",
      confirmButtonText: "OK",
    });
  }

}