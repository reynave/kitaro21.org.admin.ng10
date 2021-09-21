import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $;

@Component({
  selector: 'app-rebate-detail',
  templateUrl: './rebate-detail.component.html',
  styleUrls: ['./rebate-detail.component.css']
})
export class RebateDetailComponent implements OnInit {
  items: any = [];
  loading: boolean = false; weekly : string;
  distributor : string;
  date : string ;
  detail : any = [];  rebateUrl : string;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    config: NgbModalConfig, private modalService: NgbModal
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getHttp();
    this.rebateUrl = environment.api + "rebate/xlsx/" +this.activatedRoute.snapshot.paramMap.get('date')+'?token='+this.configService.getToken();
  }

  getHttp() {
    this.http.get<any>(environment.api + "rebate/detail/" + this.activatedRoute.snapshot.paramMap.get('date'), {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.items = data['items'];
        this.date = data['date'];
        this.weekly = this.activatedRoute.snapshot.paramMap.get('date');
        $(document).ready(function () {
          $('#ha').DataTable({
            lengthMenu: [100, 200, 500],
          
          });
        });
      },
      error => {
        console.log(error);
      },

    );
  }


  open(content,data){
    this.distributor = data['distributor'];
    this.loading = true;
    this.http.get<any>(environment.api + "rebate/distributor/" + data['id_distributor']+'/'+this.activatedRoute.snapshot.paramMap.get('date'), {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.detail = data['items'];
        console.log(data);
        this.loading = false;
        this.modalService.open(content, { size: 'sm' }); 
      },
      error => {
        console.log(error);
      },

    );
    
  }

  onFilter(x){
    console.log(x);
  }

  back() {
    window.history.back();
  }
 
}
