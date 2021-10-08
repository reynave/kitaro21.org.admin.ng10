import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

declare var $;

@Component({
  selector: 'app-rebate-manual',
  templateUrl: './rebate-manual.component.html',
  styleUrls: ['./rebate-manual.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class RebateManualComponent implements OnInit {
  items: any = [];
  loading: boolean = false;
  csvFile: any;
  amount: string;
  user: any = [];
  periodDate: string;
  periodDateEnd: string;
  api: string = environment.api;
  modalUpload: boolean = false;
  uploadError: string;
  obj : any = [];
  fileId: any;
  uploadReady: boolean = false;
  constructor(
    private router: Router,
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
    this.http.get<any>(environment.api + "rebate/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.items = data['items'];
        this.user = data['user'];

        $(document).ready(function () {
          $('#ha').DataTable({
            lengthMenu: [50, 100, 200, 500],
            ordering: false
          });

          $('#upld').DataTable({
            lengthMenu: [50, 100, 200, 500],
            ordering: false
          });
        });
      },
      error => {
        console.log(error);
      },

    );
  }


  updateEditable(obj) {
    const body = obj;
    console.log(obj);
    this.http.post<any>(environment.api + "rebate/updateEditable", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        console.log(obj.id + " " + data['id']);
        const objIndex = this.user.findIndex((obj => obj.id == data['user'][0]['id']));
        console.log(objIndex);
        this.user[objIndex]['update_by'] = "Update";

      },
      error => {
        console.log(error);
      },

    );
  }

  onSubmitProfit() {
    if (!this.periodDate || !this.periodDateEnd) {
      alert("Period Date and Period Date End Required!");
    } else {



      if (confirm("Are you sure submit this data ?")) {
        this.loading = true;
        const body = {
          submit: true,
          periodDate: this.periodDate,
          periodDateEnd: this.periodDateEnd,

        };
        this.http.post<any>(environment.api + "rebate/onSubmitProfit", body, {
          headers: this.configService.headers()
        }).subscribe(
          data => {
            this.loading = false;
            this.modalService.dismissAll();
            window.location.reload();
            console.log(data);
          },
          error => {
            console.log(error);
          },

        );
      }
    }
  }


  onRemove(x) {
    if (confirm("Delete this batch ?")) {
      this.loading = true;
      this.http.post<any>(environment.api + "rebate/onRemove", x, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          window.location.reload();
          console.log(data);
        },
        error => {
          console.log(error);
        },

      );
    }
  }


  onApproved(x) {
    if (confirm("Approved this batch ?")) {
      this.loading = true;
      this.http.post<any>(environment.api + "rebate/onApproved", x, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          window.location.reload();
          console.log(data);
        },
        error => {
          console.log(error);
        },

      );
    }
  }


  open(content, obj) {
    this.obj = obj;
    this.modalService.open(content);
  }
  

  onFileSelected(event) {
    this.fileId = event.target.files[0];
  }
  gifloading : boolean = false;
  onUploadId() {
    const obj = this.obj;
    const fd = new FormData();
    if (!this.fileId) {
      alert("File tidak ditemukan!");
      return false;
    }

    this.gifloading = true;
    fd.append('uploadFile', this.fileId, this.fileId.name);
    fd.append('token', this.configService.token());
    fd.append('userId', obj.id);
    this.fileId = null;
    console.log(fd);
    this.http.post<any>(environment.api + 'upload/rebateDetail', fd).subscribe(
      data => {
        this.gifloading = false;
      
        if(data['error'] == true){
          this.uploadError = data['note'];
        }else{
          $('.up'+obj.id).html("Add PDF"); 
          this.modalService.dismissAll();
        }
        console.log(data);
      
      
      },
      error => {
        this.loading = false;
        console.log(error);
        this.modalService.dismissAll();

      }
    );
  }


}
