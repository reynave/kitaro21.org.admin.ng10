import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-profit-setting',
  templateUrl: './profit-setting.component.html',
  styleUrls: ['./profit-setting.component.css']
})
export class ProfitSettingComponent implements OnInit {
  items :any = []; 
  loading :boolean = true;

  option : any = {precision : '0' }
  readonly : boolean = true;
  constructor( 
    private http: HttpClient,
    private configService: ConfigService, 
  ) { }

  ngOnInit(): void {
    this.getHttp(); 
  }

  getHttp() {
    this.http.get<any>(environment.api + "mlm/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.loading = false;
        console.log(data); 
        this.items =  data['items'];  
        
      },
      error => {
        console.log(error);
      }, 
    );
  }

  fnUpdate(obj){
    console.log(obj);
    this.loading = true;
    const body = {
      data : obj,
    }
    this.http.post<any>(environment.api + "mlm/fnUpdate",body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
        this.loading = false;
      },
      error => {
        console.log(error);
      }, 
    );
  } 

  fnPresenceVps(obj,i){
    console.log(obj);
    this.loading = true;
    const body = {
      data : obj,
      value : i,
    }
    this.http.post<any>(environment.api + "mlm/fnPresenceVps",body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
        this.loading = false;
        this.getHttp();
      },
      error => {
        console.log(error);
      }, 
    );
  }
 

  addPackage(){
    this.loading = true;
    const body = {
      data : "new Object",
    }
    this.http.post<any>(environment.api + "mlm/addPackage",body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
        this.getHttp();
      },
      error => {
        console.log(error);
      }, 
    );
  }
 
 

  editable(){
    this.readonly = false;
  }


}
