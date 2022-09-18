import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';

import { Storage } from 'src/utils/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private storage: Storage = new Storage();

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = this.storage.getItem('user');

    if (!!user) {
      return true;
    }

    return false;
  }
}
