import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


export class Model {
  constructor(
    public log: string,
  ) { }

}


@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class TransactionDetailComponent implements OnInit {
  loading: boolean = true;
  user: any = [];
  items: any = [];
  upload: string = environment.uploadUser;
  user_vps: any = [];
  user_vps_detail: any = [];
  uploadUser: string = environment.uploadUser;
  presence : string; 
  model: any = new Model("");
  constructor(

    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    // config.backdrop = 'static';
    // config.keyboard = false;
  }

  ngOnInit(): void {
    this.getHttp();

  }
  attachment: any = [];
  payment: any = [];
  ktp: string;
  tax: string;
  logs : any = []; 
  letterUrl : string = environment.api+"letter/";

  getHttp() {
    this.loading = true;
    this.http.get<any>(environment.api + "transaction/detail/" + this.activatedRoute.snapshot.paramMap.get('transactionCode'), {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.presence = data['presence'];
        this.loading = false; 
        this.user = data['user'];
        this.items = data['items'];
        this.user_vps = data['user_vps'];
        this.attachment = data['attachment'];
        this.payment = data['payment']; 
        this.ktp = data['ktp'];
        this.tax = data['tax'];
        this.logs = data['logs'];
      },
      error => {
        console.log(error);
      },

    );
  }

  modalImages: string;
  modalTitle: string;

  open(content, name) {
    this.modalService.open(content);
    this.modalTitle = name;
    if (name == 'ktp') {
      this.modalImages = environment.uploadUser + this.ktp['url'];
    }
    else if (name == 'tax') {
      this.modalImages = environment.uploadUser + this.tax['url'];
    } else {
      this.modalTitle = name['name'];
      this.modalImages = environment.uploadUser + name['url'];
    }

  }

  onRemove() {
    if (confirm('Remove this ' + this.activatedRoute.snapshot.paramMap.get('transactionCode') + '? ')) {
      const body = {
        transactionCode: this.activatedRoute.snapshot.paramMap.get('transactionCode'),
      }
      this.loading = true;
      this.http.post<any>(environment.api + "transaction/onRemove/", body, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.log(data);
          this.loading = false;
          history.back();
        },
        error => {
          console.log(error);
        },

      );
    }
  }
  
  onReject(){ 
    this.loading = true;
    const body = {
      transactionCode: this.activatedRoute.snapshot.paramMap.get('transactionCode'), 
    } 
    this.http.post<any>(environment.api + "transaction/onReject/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data);
        this.loading = false; 
        this.back();
      },
      error => {
        console.log(error);
      }, 
    );

  }

  onApproved() { 
    this.loading = true;
    const body = {
      transactionCode: this.activatedRoute.snapshot.paramMap.get('transactionCode'), 
    } 
    this.http.post<any>(environment.api + "transaction/onApproved/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data);
        this.loading = false; 
        if(data['error'] === false){
          this.getHttp();
        }else{
          alert(data['note']);
        }
      
      },
      error => {
        console.log(error);
      }, 
    );
  }


  onSubmitLog() {
    console.log(this.model);
    this.loading = true;
    const body = {
      transactionCode: this.activatedRoute.snapshot.paramMap.get('transactionCode'),
      model : this.model,
    }
    this.loading = true;
    this.http.post<any>(environment.api + "transaction/onSubmitLog/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false; 
        this.model.log = "";
        this.getHttp();
      },
      error => {
        console.log(error);
      },

    );
  }


  modalDetail(content) {
    this.modalService.open(content, { size: 'xl' });
  }


  back() {
    history.back();
  }

}
