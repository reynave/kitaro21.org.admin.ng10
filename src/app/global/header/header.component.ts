import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 

import { Md5 } from "md5-typescript";

export class Password {
  constructor(
    public current: string,
    public pass1: string,
    public pass2: string, 
  ) {  }

}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class HeaderComponent implements OnInit {
  active : string;
  total: any = [];
  notif : string;
  model : any = new Password("","","");
  user_access : any = [];
  name : string;
  constructor(  
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private configService: ConfigService,
    private router:Router,
    private titleService:Title,
    config: NgbModalConfig, private modalService: NgbModal
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;

  }

  ngOnInit(): void { 
    this.active = this.activatedRoute.routeConfig.data['active'];
    this.getHttp();
  }


  getHttp() {
    this.http.get<any>(environment.api + "home/notif", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.user_access = data['access']
        this.name = data['name'] 
        if(data['error'] === 400){
          this.router.navigate(['relogin']);
        }
        this.titleService.setTitle( 'Vision88 '+ ( data['total'] > 0 ? "("+ data['total']+")":"") );
        this.notif = data['total'] > 0 ? "("+ data['total']+")":"";
      },
      error => {
        console.log(error);
      },

    );
  }

  logout() {
    const body = {
      token: this.configService.token(),
    }
    console.log(body);
    this.http.post<any>(environment.api + "login/signout/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
       
        this.configService.logout();
        window.location.href = '/'; 
      },
      error => {
        console.log(error);
      },

    );
  }
  
  open(content){
    this.modalService.open(content);

  }
 
  
  onChangePassword(){
    const body = {
      current: Md5.init(this.model['current']),
      pass1: Md5.init(this.model['pass1']),
      pass2: Md5.init(this.model['pass2']),
    }
    console.log(body);
    
    this.http.post<any>(environment.api + "profile/onChangePassword/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        if(data['error'] === false){
          this.modalService.dismissAll();
          this.model = new Password("","","");
          alert("Password Update");
        }else{
          alert("Password doestn match");
        }
      },
      error => {
        console.log(error);
      },

    );
  }

}
