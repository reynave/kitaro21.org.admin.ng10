import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $;
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class UserDetailComponent implements OnInit {
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
  renewal : any = [];
  paymentConfirm: any = [];
  attachment : any = [];
  product : any = [];
  uploadUser : string = environment.uploadUser;
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
  modalImages: string;
  open(content) {
    this.modalService.open(content);
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

  onRemove(){
      if(confirm("DELETE THIS ACCOUNT ?")){
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
    this.comBalanceEnable = false; 
    this.note = "";
  }

  back() {
    history.back();
  }


  comBalanceEnable: boolean = false;
  onBalance(val) {
    this.comBalanceEnable = val;
  }

  balanceResult: number = 0;
  onKeydownEvent(bonus) {
    this.balanceResult = this.balance + bonus;
  }

  note: string = "";
  onSubmitComSponsor() {
    const body = {
      id: this.activatedRoute.snapshot.paramMap.get('id'),
      balance: this.balance,
      note: this.note,
    }
    if (this.balance != 0 && this.note != "") {
      this.http.post<any>(environment.api + "user/onSubmitComSponsor/", body, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.log(data);
          this.comBalanceEnable = false;
          window.location.reload();
        },
        error => {
          console.log(error);
        },

      );
    } else {
      alert("Rp 0 balance is not allowed AND note is requred! ");
    }

  }

  onSubmitComPassup() {
    const body = {
      id: this.activatedRoute.snapshot.paramMap.get('id'),
      balance: this.balance,
      note: this.note,
    }
    if (this.balance != 0 && this.note != "") {
      this.http.post<any>(environment.api + "user/onSubmitComPassup/", body, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.log(data);
          this.comBalanceEnable = false;
          window.location.reload();
        },
        error => {
          console.log(error);
        },

      );
    } else {
      alert("Rp 0 balance is not allowed AND note is requred! ");
    }

  }

  onSubmitComPairingTotal() {
    const body = {
      id: this.activatedRoute.snapshot.paramMap.get('id'),
      balance: this.balance,
      note: this.note,
    }
    if (this.balance != 0 && this.note != "") {
      this.http.post<any>(environment.api + "user/onSubmitComPairingTotal/", body, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.log(data);
          this.comBalanceEnable = false;
          window.location.reload();
        },
        error => {
          console.log(error);
        },

      );
    } else {
      alert("Rp 0 balance is not allowed AND note is requred! ");
    }

  }

  accumulationLeftBalanceResult: number = 0;
  accumulationRightBalanceResult: number = 0;
  balanceLeft: number = 0;
  balanceRight: number = 0;

  date = new Date();

  balanceExpired;
  onKeydownEventPairing(bonus, l) {
    if (l == 'l') {
      this.accumulationLeftBalanceResult = this.balanceLeft + bonus;
    } else if (l == 'r') {
      this.accumulationRightBalanceResult = this.balanceRight + bonus;
    }

  }


  onSubmitComPairingAk() {
    const body = {
      id: this.activatedRoute.snapshot.paramMap.get('id'),
      balanceExpired: this.balanceExpired,
      balanceLeft: this.balanceLeft,
      balanceRight: this.balanceRight,
      note: this.note,
    }
    console.log(body);
    if (this.note != "") {
      this.http.post<any>(environment.api + "user/onSubmitComPairingAk/", body, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.log(data);
          this.comBalanceEnable = false;
          window.location.reload();
        },
        error => {
          console.log(error);
        },

      );
    } else {
      alert("Note is requred! ");
    }

  }
}
