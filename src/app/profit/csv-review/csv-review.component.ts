import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-csv-review',
  templateUrl: './csv-review.component.html',
  styleUrls: ['./csv-review.component.css']
})
export class CsvReviewComponent implements OnInit {
  items: any = [];
  loading: boolean = false;
  fileTemplate: string = environment.api + 'public/template/';
  thead: any = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getHttp();

  }

  getHttp() {
    this.http.get<any>(environment.api + "profit/csvReview/" + this.activatedRoute.snapshot.paramMap.get('id'), {
      headers: this.configService.headers()
    }).subscribe(
      data => {

        this.thead = data['header'];
        this.items = data['items'];
        $(document).ready(function () {
          $('#ha').DataTable({
            lengthMenu: [50, 100, 200, 500],
            searching: false
          });
        });
      },
      error => {
        console.log(error); 
      },

    );
  }


  back() {
    window.history.back();
  }

  onSubmit() {
    const body = { 
      id :  this.activatedRoute.snapshot.paramMap.get('id')
    }
    this.http.post<any>(environment.api + "profit/onSubmitData/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        if(data['error'] === false){
           this.back();
        }else{
          alert("ERROR SUBMIT! Please contact Developer");
        }
      },
      error => {
        console.log(error);
      },

    );
  }


}
