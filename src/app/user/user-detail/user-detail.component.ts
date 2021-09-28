import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Md5 } from "md5-typescript";

export class Model {

  constructor(
    public countryCode: number, 
    public phone: number, 
    public name: string,
    public password: string, 
    public email: string,  
    public productId: string,   
  ) {  }

}

declare var $;
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class UserDetailComponent implements OnInit {
  model : any = new Model(62,0,"","","","");
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
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.active = this.activatedRoute.snapshot.queryParams['tab'];
    console.log(this.activatedRoute.snapshot.queryParams['tab']);
    this.getHttp(this.id);
  }

  getHttp(id) {
    this.http.get<any>(environment.api + "user/detail/" + id, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.renewal = data['renewal'];
        this.user = data['user']
        this.userRollback = data['user'];
        this.saldo = data['saldo'];
        this.account_trading = data['account_trading'];
        this.bonus = data['bonus'];
        this.pairing = data['pairing'];
        this.product = data['product'];
        this.selectProduct = data['selectProduct'];

        this.paymentConfirm = data['paymentConfirm'];
        this.attachment = data['attachment'];
        console.log(data['comPairingTotal']);

        $(document).ready(function () {
          $('#example').DataTable({
            ordering: false,
            lengthMenu: [50, 100, 200, 500],
          });
          $('#example2').DataTable({
            ordering: false,
            lengthMenu: [50, 100, 200, 500],
          });
          $('#example3').DataTable({
            ordering: false,
            lengthMenu: [50, 100, 200, 500],
          });
          $('#example4').DataTable({
            ordering: false,
            lengthMenu: [50, 100, 200, 500],
          });

        });
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

  access() {
    this.http.post<any>(environment.api + "user/access", this.user, {
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


}
