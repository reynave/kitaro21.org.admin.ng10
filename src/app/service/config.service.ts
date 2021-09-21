import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  varKey: string = "mXTSxr34sdfs32342fasd3aVtGN22cgEBqxp5Unk5azj4ZgdEKSErYnZb33LyBus5RpdfsWfhkfVDKJ3KSLFG7DtecSehXefs7Q67NGFWGehU3ANexas3ZbrkfU";
  varToken: string;
  varHeaders: any = [];
  rules: any;
  varData: any = [];
  tokenName : string  = "v88AdminToken2021";
  constructor( 
    private cookies: CookiesService,
  ) { 
    if (this.cookies.getCookie(this.tokenName) == null) { 
      console.log("tidak ada session login");
    } else {
      this.varToken = this.cookies.getCookie(this.tokenName); 
    } 
  }

  logout() {
    document.cookie = this.tokenName+"=null; expires = Thu, 01 Jan 1970 00:00:00 GMT;path=/"; 
  }

  setToken(token){
    this.cookies.setCookie(this.tokenName, token, 30); 
  }

  getToken() {
    return this.cookies.getCookie(this.tokenName);
  }

  username() {
    return this.varData['name'];
  }

  headers() { 
    return this.varHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Key': this.varKey,
      'Token': this.varToken,
    });
  }

  key() {
    return this.varKey;
  }
  token() {
    return this.varToken;
  }

  id_user() {
    return this.varToken;
  }


  errorToken(data) {
    if (data['error'] == 400) {
      //  window.location.href = "login";
    }

  }


  extenCookies() { 
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 90000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = this.tokenName + "=" + this.cookies.getCookie(this.tokenName) + ";" + expires + ";path=/";  
  }

 

}
