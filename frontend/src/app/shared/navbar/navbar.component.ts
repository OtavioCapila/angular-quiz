import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _ROUTER: Router,private _TOKEN: TokenService) { }

  ngOnInit() {
  }

  onClickRegisterUser(){
    this._ROUTER.navigate(['painel/cadastrar-usuario'])
  }

  onClickRegisterQuestion(){
    this._ROUTER.navigate(['painel/cadastrar-pergunta'])
  }

  onClickDashboard(){
    this._ROUTER.navigate(['painel/dashboard'])
  }

  onClickLogoff(){
    this._TOKEN.DeleteToken();
    this._ROUTER.navigate(['admin']);
  }

}
