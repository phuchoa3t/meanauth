import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public username = '';
    public password = '';
  constructor(private authService: AuthService,
        private router: Router,
        private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
      const user = {
          username: this.username,
          password: this.password
      }

      this.authService.authenticateUser(user).subscribe(data => {
          if (data.success) {
              this.flashMessage.show('Login success', {
                  timeout: 5000,
                  cssClass: 'alert-success'
              })

              this.authService.storeUserData(data.token)

              this.router.navigate(['dashboard'])
          } else {
              this.flashMessage.show(data.msg, {
                  timeout: 5000,
                  cssClass: 'alert-danger'
              })

              this.router.navigate(['login'])
          }
      })
  }

}
