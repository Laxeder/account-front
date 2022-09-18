import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css']
})
export class LoginAuthComponent implements OnInit {
  public title: string = "Serviço de tratamento de conta"
  
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onHome() {
    this.router.navigate(['/']);
  }
}
