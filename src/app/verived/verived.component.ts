import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $;

export class Model {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public idVps: string,
    public registerDate: string,
    public type: string,
  ) { }

}
@Component({
  selector: 'app-verived',
  templateUrl: './verived.component.html',
  styleUrls: ['./verived.component.css']
})
export class VerivedComponent implements OnInit {

  items: any = [];
  model = new Model("", "", "", "", "", "u");
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
    this.http.get<any>(environment.api + "user/verified", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.asAccess = data['asAccess']; 
        this.items = data['user'];  
        $(document).ready(function () {
          $('#example').DataTable({
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
 

}
