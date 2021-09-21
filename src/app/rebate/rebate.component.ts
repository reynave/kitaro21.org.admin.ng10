import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

declare var $;

@Component({
  selector: 'app-rebate',
  templateUrl: './rebate.component.html',
  styleUrls: ['./rebate.component.css']
})
export class RebateComponent implements OnInit {
  items :any = [];
  loading:boolean= false;
  constructor(
    
    private http: HttpClient,
    private configService: ConfigService, 
  ) { }

  ngOnInit(): void {
    this.getHttp();
  
  }

  getHttp() {
    this.http.get<any>(environment.api + "rebate/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.items =  data['items'];
        $(document).ready(function () {
          $('#ha').DataTable({
            lengthMenu: [   50, 100, 200, 500],
          });
        });
      },
      error => {
        console.log(error);
      },

    );
  }
}
