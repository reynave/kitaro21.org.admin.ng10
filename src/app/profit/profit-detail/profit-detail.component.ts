import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-profit-detail',
  templateUrl: './profit-detail.component.html',
  styleUrls: ['./profit-detail.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ProfitDetailComponent implements OnInit {
  items: any = [];
  loading: boolean = false;
  period: string;
  constructor(
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.getHttp();
    this.period = this.activatedRoute.snapshot.paramMap.get('date');
  }

  getHttp() {
    this.http.get<any>(environment.api + "profit/detail/" + this.activatedRoute.snapshot.paramMap.get('date'), {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.items = data['items'];
        $(document).ready(function () {
          $('#dataTables').DataTable({
            ordering: false,
            lengthMenu: [  50, 100, 200, 500],
          });
        });
      },
      error => {
        console.log(error);
      },
    );
  }

  back() {
    window.history.back();
  }

  detail : any = [];
  obj : any = [];
  open(content,obj) {
    this.obj = obj;
    console.log(obj, this.period);
    this.modalService.open(content, { size: 'xl' }); 
    this.http.get<any>(environment.api + "profit/detailSharing/"+  this.period+"/"+ obj.id, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.detail = data['items'];
        console.log(data); 
      },
      error => {
        console.log(error);
      },
    ); 
  }
}
