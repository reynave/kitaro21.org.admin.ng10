import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-distributor',
  templateUrl: './new-distributor.component.html',
  styleUrls: ['./new-distributor.component.css']
})
export class NewDistributorComponent implements OnInit {
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
    this.http.get<any>(environment.api + "distributor/request", {
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
 
 
 

  onApproved(status, x){
    const body = {
      status : status,
      data : x, 
    }
    this.http.post<any>(environment.api + "distributor/onApproved", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data);    
        this.getHttp();
        this.modalService.dismissAll(); 
      },
      error => {
        console.log(error);
      },

    );
  }

}
