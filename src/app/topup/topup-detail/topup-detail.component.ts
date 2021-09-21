import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topup-detail',
  templateUrl: './topup-detail.component.html',
  styleUrls: ['./topup-detail.component.css']
})
export class TopupDetailComponent implements OnInit {
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this.modalService.dismissAll();
  }
  items :any = [];  invoice :any = [];
  loading: boolean = true;
  transactionCode : string;
  dt : any = [];
  upload : any = [];
  base_url : string = environment.uploadUser;
 
  constructor( 
    private http: HttpClient,
    private configService: ConfigService, 
    config: NgbModalConfig, private modalService: NgbModal, 
    private activatedRoute: ActivatedRoute,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit(): void {
    this.getHttp(); 
  
  }

  getHttp() {
    this.loading = true;  
    this.http.get<any>(environment.api + "topup/detail/"+this.activatedRoute.snapshot.paramMap.get('transactionCode'), {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data);  

        this.dt = data['items'];
        this.upload = data['upload'];
        this.invoice = data['invoice'];
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
