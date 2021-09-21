import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  varKey: string = "mXTSxrEKSErYnZb33LyBus5RpVtGNfcgEBqxp5Unk5azj4ZgdWfhkfVDKJ3KSLFG7DtecSehXe7Q67NGFWGehU3ANexas3ZbrkfU";
  varToken: string;
  varHeaders: any = [];  
  constructor( 
    private localstorage : LocalstorageService,

  ) { 
    this.varToken = "tokentest";

  }


  headers() {   
    console.log(this.token());
    return this.varHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'key': this.varKey,
      'token': this.token(),
    });
  }

  removeToken(){
    localStorage.removeItem("kitaro21Client_ver1");
  }

  token() : any{
    return  localStorage.getItem("kitaro21Client_ver1") !== null ? localStorage.getItem("kitaro21Client_ver1") : false;
  } 
}
