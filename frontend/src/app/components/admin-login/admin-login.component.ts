import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  adminLogin: FormGroup;
  constructor(
    private _FB: FormBuilder,
    private _LOGIN: LoginService,
    private _TOKEN: TokenService,
    private _TOASTR: ToastrService,
    private _ROUTER: Router) { }

  ngOnInit() {
    this.instantiateForm();
  }

  instantiateForm(){
    this.adminLogin = this._FB.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  submitForm(){
    this._TOASTR.info('Autenticando');
    this._LOGIN.adminLogin(this.adminLogin.value).subscribe(
      accept => {
        this._TOASTR.success('Logado com sucesso');
        localStorage.setItem('userData', JSON.stringify(accept.data));
        this._TOKEN.SetToken(accept.token);
        this._ROUTER.navigate(['painel/dashboard']);
      },
      reject => {
        this._TOASTR.error('Falha ao autenticar');

      }
    )
  }

}
