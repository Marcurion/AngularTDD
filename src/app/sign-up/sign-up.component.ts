import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {


  username: string = '';
  email: string = '';
  password: string = '';
  passwordRepeat: string = '';

  constructor(private httpClient: HttpClient){}

  onChangeUsername(event: Event){
    this.username = (event.target as HTMLInputElement).value;

  }

  onChangeEmail(event: Event){
    this.email = (event.target as HTMLInputElement).value;

  }

  onChangePassword(event: Event){
    this.password = (event.target as HTMLInputElement).value;

  }


  onChangePasswordRepeat(event: Event){
    this.passwordRepeat = (event.target as HTMLInputElement).value;
  }


  isDisabled(): boolean
  {
    return this.password ? (this.password !== this.passwordRepeat): true;
  }

  onClickSignUp(){
    // fetch("api/1.0/users",
    // {
    //   method: 'POST',
    //   body: JSON.stringify({username: this.username, password: this.password, email: this.email}),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });

    this.httpClient.post("/api/1.0/users", {username: this.username, password: this.password, email: this.email}).subscribe(() =>{});
  }

}
