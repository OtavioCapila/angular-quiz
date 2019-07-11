import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { ResumeComponent } from "./components/resume/resume.component";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";
import { AuthGuard } from "./shared/auth/auth-guard.service";
import { AdminQuestionRegisterComponent } from "./components/admin-panel/components/admin-question-register/admin-question-register.component";
import { AdminUserRegisterComponent } from "./components/admin-panel/components/admin-user-register/admin-user-register.component";
import { QuizComponent } from "./components/quiz/quiz.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthGuardUser } from "./shared/auth/auth-guard-user.service";
import { UserPreferencesComponent } from "./components/user-preferences/user-preferences.component";
import { RegisterComponent } from "./components/register/register.component";
import { AdminDashboardComponent } from './components/admin-panel/components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "sobre-nos",
    component: ResumeComponent,
    canActivate: [AuthGuardUser],
  },
  {
    path: "preferencias",
    component: UserPreferencesComponent,
    canActivate: [AuthGuardUser],
  },
  {
    path: "registrar",
    component: RegisterComponent,
  },
  {
    path: "admin",
    component: AdminLoginComponent,
  },
  {
    path: "quiz",
    component: QuizComponent,
    canActivate: [AuthGuardUser],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardUser],
  },
  {
    path: "painel",
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "cadastrar-pergunta",
        component: AdminQuestionRegisterComponent,
      },
      {
        path: "cadastrar-usuario",
        component: AdminUserRegisterComponent,
      },
      {
        path: "dashboard",
        component: AdminDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
