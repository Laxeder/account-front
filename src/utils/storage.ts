import { Observable, BehaviorSubject } from 'rxjs';

export class Storage {
  // notifica o loading
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  public setItem(key: string, value: any): boolean {
    try {
      if (!!!key || typeof key !== 'string') {
        return false;
      }

      const strValue: string = JSON.stringify(value);

      if (!!!strValue || typeof strValue !== 'string') {
        return false;
      }

      localStorage.setItem(key, strValue);

      return true;
    } catch {
      return false;
    }
  }

  public getItem(key: string): any {
    try {
      if (!!!key || typeof key !== 'string') {
        return <any>{};
      }

      const value: string = localStorage.getItem(key) || '';

      if (!!!value) {
        return <any>{};
      }

      return <any>JSON.parse(value);
    } catch {
      return <any>{};
    }
  }

  public removeItem(key: string): boolean {
    try {
      if (!!!key || typeof key !== 'string') {
        return false;
      }

      localStorage.removeItem(key);

      return true;
    } catch {
      return false;
    }
  }
}
