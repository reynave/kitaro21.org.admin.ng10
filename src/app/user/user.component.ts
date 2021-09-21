import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $;
 

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  items: any = []; 
  ebook: any = [];
  admin: any = [];
  loading: boolean = false;
  user_access : any = [];
  asAccess : any = [];
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  getHttp() {
    this.http.get<any>(environment.api + "user/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.items = data['user']; 
      console.log(data);
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
 
  onDelete(obj) {
    this.http.post<any>(environment.api + "user/onDelete", obj, {
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

  kitaro(obj) {
    this.http.post<any>(environment.api + "user/access", obj, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(environment.kitaro + 'admin/loki/?key=' + data['user']['requestKey']);
        console.log(data);
        if (data['user']['requestKey'] != "") {
          window.open(environment.kitaro + 'admin/loki/?key=' + data['user']['requestKey']);
        }
      },
      error => {
        console.log(error);
      },

    );
  }

  open(content) {
    this.modalService.open(content, { size: 'xl' });
  }

}
