import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $;

@Component({
  selector: 'app-topup-history',
  templateUrl: './topup-history.component.html',
  styleUrls: ['./topup-history.component.css']
})
export class TopupHistoryComponent implements OnInit {
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
  invoice : any = [];
  base_url : string = environment.uploadUser;
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
  
  }

  getHttp() {
    this.http.get<any>(environment.api + "topup/history", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.items =  data['items'];  
        this.loading = false;

        $(document).ready(function () {
          $('#example').DataTable({
            lengthMenu: [ 20, 50, 100, 200, 500],
          });
        });
       
      },
      error => {
        console.log(error);
      },

    );
  }
 
  open(content,transactionCode){
    this.loading = true;
    this.transactionCode = transactionCode;
    this.http.get<any>(environment.api + "topup/detail/"+transactionCode, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data);  

        this.dt = data['items'];
        this.upload = data['upload'];
        
        this.invoice = data['invoice'];
        this.loading = false;
        this.modalService.open(content, { size: 'xl' });
      },
      error => {
        console.log(error);
      },

    );

  
  }

  
 

}
