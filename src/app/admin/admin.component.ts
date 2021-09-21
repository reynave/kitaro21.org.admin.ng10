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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  items: any = [];
  model = new Model("", "", "", "", "", "u");
  ebook: any = [];
  admin: any = [];
  loading: boolean = false;
  user_access : any = [];
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  getHttp() {
    this.http.get<any>(environment.api + "admin/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        
        this.ebook = data['ebook'];
        this.admin = data['admin'];
        this.user_access = data['user_access'];
      
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

  onSubmit() {
    this.loading = true;
    console.log(this.model);
    this.http.post<any>(environment.api + "admin/create", this.model, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        if (data['error'] === false) {
          window.location.reload();
        } else {
          alert(data['note']);
        }
      },
      error => {
        console.log(error);
      },

    );
  }

  onDelete(obj) {
    this.http.post<any>(environment.api + "admin/onDelete", obj, {
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
  

  open(content) {
    this.modalService.open(content, { size: 'xl' });
  }


}
