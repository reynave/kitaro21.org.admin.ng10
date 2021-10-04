import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $;
@Component({
  selector: 'app-rebate-manual-detail',
  templateUrl: './rebate-manual-detail.component.html',
  styleUrls: ['./rebate-manual-detail.component.css']
})
export class RebateManualDetailComponent implements OnInit {
  items: any = [];
  user: any = [];
  loading: boolean = false;  
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    config: NgbModalConfig, private modalService: NgbModal
  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getHttp(); 
  }

  getHttp() {
    this.http.get<any>(environment.api + "rebate/manual_detail/" + this.activatedRoute.snapshot.paramMap.get('id'), {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.items = data['items']; 
        this.user = data['user']; 
  
        $(document).ready(function () {
          $('#ha').DataTable({
            lengthMenu: [100, 200, 500], 
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
}
