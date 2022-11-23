import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@utils/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public title: string = 'Account Service';
  public user: any = {};

  private storage: Storage = new Storage();

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.storage.getItem('user');
  }

  onHome() {
    this.router.navigate(['/']);
  }

  onLogin() {
    this.router.navigate(['/auth/login']);
  }
}
