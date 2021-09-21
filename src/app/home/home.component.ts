import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: any = []; member: any = [];
  options : any = { prefix: 'Rp ', thousands: '.', decimal: ',', precision :0 };
  currency : string;
  date : any = []; years : any = []; 
  topupList : any = {
    d : [],
    w: [],
    m : [],
    y : []
  }
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  getHttp() {
    this.http.get<any>(environment.api + "home/notif", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data); 
        this.items = data; 
        this.years = data['select']['years'];
        this.date = data['date'];
        this.member = data['member'];
        this.topupList = data['topupList'];
        
      },
      error => {
        console.log(error);
      },

    );
  }

  onMemberYear(){
    this.loading =  true;
    const body = {
      year : this.date['year'],
      month : this.date['month']
    }
    this.http.post<any>(environment.api + "home/onMemberYear", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.loading =  false;
        console.log(data);  
        this.member = data;

      },
      error => {
        console.log(error);
      },

    );
  }
  loading : boolean = false;
  updateCurrency(){
    const body = {
      value : this.currency
    }
    this.http.post<any>(environment.api + "home/updateCurrency", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);  
        alert("Update Currency Success");
      },
      error => {
        console.log(error);
      },

    );
  }
}
