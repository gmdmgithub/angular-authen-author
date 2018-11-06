import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  invalidLogin: boolean;

  constructor(private router: Router, private authService: AuthService) {}

  signIn(credentials) {
    console.log("Sign in credentials", credentials);

    this.authService.login(credentials).subscribe(
      (result: { token: string }) => {
        if (result) {
          this.invalidLogin =false;
          this.authService.validateLogin(!this.invalidLogin, result.token);
          this.router.navigate(["/"]);
        } else {
          this.invalidLogin = true;
          this.authService.validateLogin(!this.invalidLogin);
        }
      },
      error => {
        this.invalidLogin = true;
        this.authService.validateLogin(!this.invalidLogin);
        console.log("Errror", error);
      }
    );
  }

  
}
