import { NewLoginComponent } from './components/new-login/new-login.component';
import { FeedbackComponent } from "./components/quiz/components/feedback/feedback.component";
import { QuizFinishedComponent } from "./components/quiz/components/quiz-finished/quiz-finished.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { ResumeComponent } from "./components/resume/resume.component";
import { HttpClientModule } from "@angular/common/http";
import { LoginService } from "./components/login/login.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { CookieService } from "ngx-cookie-service";
import { TokenService } from "./shared/services/token.service";
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";
import { AuthGuard } from "./shared/auth/auth-guard.service";
import { AuthService } from "./shared/auth/auth.service";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { TextMaskModule } from "angular2-text-mask";
import { FormWizardModule } from "angular2-wizard";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatRadioModule } from "@angular/material/radio";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { AdminUserRegisterComponent } from "./components/admin-panel/components/admin-user-register/admin-user-register.component";
import { AdminQuestionRegisterComponent } from "./components/admin-panel/components/admin-question-register/admin-question-register.component";
import { AdminDashboardComponent } from "./components/admin-panel/components/admin-dashboard/admin-dashboard.component";
import { QuizComponent } from "./components/quiz/quiz.component";
import { NgxGraphModule } from "@swimlane/ngx-graph";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AuthGuardUser } from "./shared/auth/auth-guard-user.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { UserPreferencesComponent } from "./components/user-preferences/user-preferences.component";
import { RegisterComponent } from './components/register/register.component';
import { BackendUrlService } from './shared/services/backendUrl.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResumeComponent,
    AdminLoginComponent,
    AdminPanelComponent,
    NavbarComponent,
    AdminUserRegisterComponent,
    AdminQuestionRegisterComponent,
    AdminDashboardComponent,
    DashboardComponent,
    QuizComponent,
    QuizFinishedComponent,
    FeedbackComponent,
    UserPreferencesComponent,
    NewLoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
    }),
    TextMaskModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    ZXingScannerModule,
    MatListModule,
    MatStepperModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatInputModule,
    NgxGraphModule,
    NgxChartsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatButtonModule,
    FormWizardModule,
  ],
  providers: [
    AuthGuard,
    AuthGuardUser,
    AuthService,
    LoginService,
    TokenService,
    CookieService,
    BackendUrlService
  ],
  entryComponents: [QuizFinishedComponent, FeedbackComponent],
  exports: [NavbarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
