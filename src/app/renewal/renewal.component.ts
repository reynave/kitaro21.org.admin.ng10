import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $;
@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.component.html',
  styleUrls: ['./renewal.component.css']
})
export class RenewalComponent implements OnInit {
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
    this.modalService.dismissAll();
  }
  items: any = [];
  loading: boolean = true;
  transactionCode: string;
  dt: any = [];
  upload: any = [];
  history: any = [];
  base_url: string = environment.uploadUser;
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
    this.http.get<any>(environment.api + "renewal/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.items = data['items'];
        this.history = data['history'];
        this.loading = false;
        $(document).ready(function () {
          $('#example').DataTable({ 
            order: [0, 'desc'],
            lengthMenu: [20, 50, 100, 200, 500],
          });
          $('#example2').DataTable({ 
            order: [0, 'desc'],
            lengthMenu: [20, 50, 100, 200, 500],
          });
        });
      },
      error => {
        console.log(error);
      },

    );
  }


  open(content, obj) {
    this.dt = obj;
    this.modalService.open(content, { size: 'xl' });
  }

  onProcess(obj, idStatus) {

    const body = {
      idStatus: idStatus,
      data:   obj,
    }
    if (confirm("Are you sure " + (idStatus == 100 ? 'APPROVE' : 'REJECT') + " this process?")) {
      this.http.post<any>(environment.api + "renewal/onProcess", body, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.log(data);
          // this.getHttp();
          window.location.reload(); 
        },
        error => {
          console.log(error);
        },

      );
    }
  }

}
