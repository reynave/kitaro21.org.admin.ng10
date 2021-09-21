import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-history-distributor',
  templateUrl: './history-distributor.component.html',
  styleUrls: ['./history-distributor.component.css']
})
export class HistoryDistributorComponent implements OnInit {
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this.modalService.dismissAll();
  }
  items :any = [];
  loading: boolean = true;
  transactionCode : string;
  dt : any = [];
  upload : any = [];
  base_url : string = environment.uploadUser;
  api : string = environment.api;
  admintoken : string;
  constructor( 
    private http: HttpClient,
    private configService: ConfigService, 
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit(): void {
    this.getHttp(); 
    this.admintoken =  this.configService.token();
  } 

  getHttp() {
    this.http.get<any>(environment.api + "distributor/history", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.items =  data['items'];  
        this.loading = false;
       
      },
      error => {
        console.log(error);
      },

    );
  }

  back(){
    window.history.back();
  }
 
 
  
}
