import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public title: string = "Account Service"

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onHome() {
    this.router.navigate(['/']);
  }

  onLogin() {
    this.router.navigate(['/auth/login']);
  }
}
