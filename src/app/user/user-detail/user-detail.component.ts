import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Md5 } from "md5-typescript"; 

export class Model { 
  constructor(
    public code: number, 
    public phone: number, 
    public name: string,
    public password: string, 
    public email: string,  
    public productId: string,   
    public birthdate : string,
    public qty : number
  ) {  } 
}
 
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class UserDetailComponent implements OnInit {
  model : any = new Model(62,0,"","","","","1970-01-01",1);
  user: any = [];
  upload: string = environment.uploadUser;
  saldo: any = [];
  account_trading: any = false;
  pairing: any = [];
  bonus: any = [];
  disable: boolean = true;
  userRollback: any = [];
  loading: boolean = false;
  active: string = "1";
  id: string;
  renewal: any = [];
  paymentConfirm: any = [];
  attachment: any = [];
  product: any = [];
  selectProduct: any = [];
  uploadUser: string = environment.uploadUser; 
  modalImages: string;  
  note: string;
  pwd : string;
  child : any = [];
  club : any = [];
  constructor( 
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    // config.backdrop = 'static';
    // config.keyboard = false;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.active = this.activatedRoute.snapshot.queryParams['tab'];
    console.log(this.activatedRoute.snapshot.queryParams['tab']);
    this.getHttp();
  }

  getHttp() {
    this.http.get<any>(environment.api + "user/detail/" + this.activatedRoute.snapshot.paramMap.get('id'), {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.renewal = data['renewal'];
        this.user = data['user']
        this.userRollback = data['user'];
        this.club = data['club'];
        
        this.saldo = data['saldo'];
        this.account_trading = data['account_trading'];
        this.bonus = data['bonus'];
        this.pairing = data['pairing'];
        this.product = data['product'];
        this.selectProduct = data['selectProduct'];
        this.child = data['child'];
        this.paymentConfirm = data['paymentConfirm'];
        this.attachment = data['attachment'];
        console.log(data['comPairingTotal']);
 
      },
      error => {
        console.log(error);
      },

    );
  }
 
  open(content) {
    this.modalService.open(content);
  }
 
  onkeyPas(){
    this.pwd  = Md5.init(this.model.password);
  }

  modalDetail(content) {
    this.modalService.open(content, { size: 'xl' });
  }
  
  onDisable(disable) {
    this.disable = false;
  }

  access(obj) {
    this.http.post<any>(environment.api + "user/access", obj, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        if (data['user']['requestKey'] != "") {
          window.open(environment.user + 'admin/loki/?key=' + data['user']['requestKey']);
        }
      },
      error => {
        console.log(error);
      },

    );
  }
 
  onRemove() {
    if (confirm("DELETE THIS ACCOUNT ?")) {
      this.loading = true;
      const body = {
        id: this.id
      }
      console.log(body);
      this.http.post<any>(environment.api + "user/onRemove/", body, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.log(data);
          window.history.back();
        },
        error => {
          console.log(error);
        },

      );
    }
  }

  onUpdate() {
    this.loading = true;
    const body = {
      user: this.user,
      id: this.id
    }
    console.log(body);
    this.http.post<any>(environment.api + "user/onUpdate/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.disable = true;
      },
      error => {
        console.log(error);
      },

    );
  }

  onTab(val) {
    this.active = val;
    this.note = "";
  }

  back() {
    history.back();
  }

  emailLoading : boolean = true;
  emailNote : string;
  
  onCheckEmail(){
    this.emailNote = "";
    this.emailLoading = true;
    const body = {
      email : this.model.email
    }
    console.log(body);
    this.http.post<any>(environment.uploadUser + "register/onCheckEmail/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.emailLoading = false;
        this.emailNote = data['note'];
        console.log(data); 
      },
      error => {
        console.log(error);
      },

    );
  }


  onSubmit(){ 
    this.loading = true;
    const body = {
      model     : this.model,  
      password : Md5.init(this.model.password), 
      id : this.activatedRoute.snapshot.paramMap.get('id'),
    }  
    console.log(body);
    this.model.password = "";
    this.http.post<any>(environment.api + "user/onSubmit", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
        this.modalService.dismissAll();
        this.getHttp();
        console.log(data);  
      },
      error => {
        console.log(error);
      }, 
    );

  }

}
