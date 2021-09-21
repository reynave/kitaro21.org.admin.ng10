import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $;
 
@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  items: any = []; 
  ebook: any = [];
  admin: any = [];
  loading: boolean = false;
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  getHttp() {
    this.http.get<any>(environment.api + "user/membership", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.items = data['user']; 
        $(document).ready(function () {
          $('#example').DataTable({ 
            order: [2, 'asc'],
            lengthMenu: [50, 100, 200, 500],
          });

        });
      },
      error => {
        console.log(error);
      },

    );
  }
 
  onReload(){
    this.loading = true;
    const body = {
      error : false
    }
    this.http.post<any>(environment.api + "user/onReload",body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        window.location.reload();
      },
      error => {
        console.log(error);
      },

    );
  }
}
