import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MockBackend } from "@angular/http/testing";
import { fakeBackendProvider } from "./helpers/fake-backend";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./login/login.component";
import { NoAccessComponent } from "./no-access/no-access.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BaseRequestOptions } from "@angular/http";
import { SignupComponent } from "./signup/signup.component";
import { OrderService } from "./services/order.service";
import { AuthService } from "./services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./services/auth-guard.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    NoAccessComponent,
    PageNotFoundComponent,
    SignupComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      {
        path: "admin",
        component: AdminComponent,
        canActivate: [AuthGuard] //next parametr for access control, class AuthGaurd have to impement CanActivate interface
      },
      { path: "login", component: LoginComponent },
      { path: "no-access", component: NoAccessComponent },
      { path: "**", component: PageNotFoundComponent }
    ])
  ],

  providers: [
    OrderService,
    AuthGuard,
    AuthService,

    // For creating a mock back-end. You don't need these in a real app.
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
