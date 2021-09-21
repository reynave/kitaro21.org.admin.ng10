import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  items :any = [];
  date  : any = {
    startDate  : '',
    endDate  : '', 
  }
  loading:boolean=true; 
  transCode : string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private configService: ConfigService, 
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getHttp();
  
  }

  getHttp() {
    this.http.get<any>(environment.api + "transaction/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.items =  data['items'];
        this.date = data['date'];
        $(document).ready(function () {
          $('#dataTables').DataTable({
          //  ordering: false,
         //   columnDefs : [{targets:0}],
            order: [0, 'desc'],
            lengthMenu: [  50, 100, 200, 500],
          });
        });
      },
      error => {
        console.log(error);
      },

    );
  }


  onParent(parentId){
    this.router.navigate(['/comSponsor'],{ queryParams: { parentId: parentId } }).then(
      ()=> window.location.reload(),
    ); 
  }

 
  onTransCode(){
    this.router.navigate(['/comSponsor'],{ queryParams: { transCode: this.transCode } }).then(
      ()=> window.location.reload(),
    ); 
  }

  onFilterDate(){

    const _queryParams ={
      parentId: this.activatedRoute.snapshot.queryParams.parentId,
      startDate : this.date.startDate,
      endDate : this.date.endDate, 
    }
    console.log(_queryParams);
    this.router.navigate(['/comSponsor'],{ queryParams: _queryParams   }).then(
      ()=> window.location.reload(),
    ); 
  }


  clear(){
    this.router.navigate(['/comSponsor']).then(
      ()=> window.location.reload(),
    ); 
  }
}
