import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-trading-pdf',
  templateUrl: './account-trading-pdf.component.html',
  styleUrls: ['./account-trading-pdf.component.css']
})
export class AccountTradingPdfComponent implements OnInit {
  item: any = [];
  closed: any = []; 
  parent : any  = [];
  uploadUser : string = environment.uploadUser;
  level : string;
  constructor(

    private http: HttpClient,
    private configService: ConfigService,
    private activeRouter : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getHttp();

  }

  print(){
    window.print();
  }
  getHttp() {
    this.http.get<any>(environment.api + "ea/view/"+this.activeRouter.snapshot.params['id'], {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.parent = data['parent'];
        this.item = data['item'];
        this.level = data['level'];
        console.log(data); 
      },
      error => {
        console.log(error);
      },

    );
  }
 
}
