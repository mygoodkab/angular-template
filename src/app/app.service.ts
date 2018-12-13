import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    public http: HttpClient,
  ) { }

  baseURL = 'http://35.240.195.26:3000';
  
  cbase(url, arr) {
    let entry;
    let i;
    let len;
    url = this.baseURL + '/' + url;
    for (i = 0, len = arr.length; i < len; i++) {
      entry = arr[i];
      url += '/' + entry;
    }
    return url;
  }

  createToken(data) {
    localStorage.setItem('token', data);
    return true;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }


  // With Authen =====================================================================
  private post(url, params, options?) {
    return this.http.post(this.baseURL + '/' + url, params, options).toPromise();
  }

  private get(url, params, options?) {
    return this.http.get(this.cbase(url, params), options).toPromise();
  }

  private put(url, params, options?) {
    return this.http.put(this.baseURL + '/' + url, params, options).toPromise();
  }

  private delete(url, params, options?) {
    return this.http.delete(this.cbase(url, params), options).toPromise();
  }

  // ================
  /*is authorization*/
  public getWithAuthen(url, params) {
    return this.get(url, params, {
      headers: { Authorization: 'Bearer ' + this.getToken() }
    });
  }

  public postWithAuthen(url, params) {
    return this.post(url, params, {
      headers: { Authorization: 'Bearer ' + this.getToken() }
    });
  }

  public putWithAuthen(url, params) {
    return this.put(url, params, {
      headers: { Authorization: 'Bearer ' + this.getToken() }
    });
  }

  public deleteWithAuthen(url, params) {
    return this.delete(url, params, {
      headers: { Authorization: 'Bearer ' + this.getToken() }
    });
  }


}
