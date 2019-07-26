import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public name;
  public username;
  public email;
  public password;
  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
      const user = {
          name: this.name,
          email: this.email,
          username: this.username,
          password: this.password
      }

      // validate
      if (!this.validateService.validateRegister(user)) {
          this.flashMessage.show('Please fill in all fields', {
              cssClass: 'alert-danger', timeout: 3000
          });
          return false;
      }
      if (!this.validateService.validateEmail(user.email)) {
          this.flashMessage.show('Please use a valid email',{
              cssClass: 'alert-danger', timeout: 3000
          });
          return false;
      }

      this.authService.registerUser(user).subscribe(data => {
          if (data.success) {
              this.flashMessage.show('Registerd',{
                  cssClass: 'alert-success', timeout: 3000
              });
              this.router.navigate(['/login'])
          } else {
              this.flashMessage.show('Error',{
                  cssClass: 'alert-danger', timeout: 3000
              });
              this.router.navigate(['/register'])
          }
      });

  }

}
