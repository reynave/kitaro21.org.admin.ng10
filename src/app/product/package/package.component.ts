import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  items: any = [];
  community: any = [];
  loading: boolean = true;

  option: any = { precision: '0' }
  readonly: boolean = true;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  getHttp() {
    this.http.get<any>(environment.api + "package/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        this.items = data['items'];
        this.community = data['community'];
      },
      error => {
        console.log(error);
      },
    );
  }

  fnUpdate(obj) {
    console.log(obj);
    this.loading = true;
    const body = {
      data: obj,
    }
    this.http.post<any>(environment.api + "package/fnUpdate", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false;
      },
      error => {
        console.log(error);
      },
    );
  }

  fnUpdateClub(obj) {
    console.log(obj);
    this.loading = true;
    const body = {
      data: obj,
    }
    this.http.post<any>(environment.api + "package/fnUpdateClub", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.loading = false;
      },
      error => {
        console.log(error);
      },
    );
  }
 
  addPrice() {
    this.loading = true;
    const body = {
      data: "new Object",
    }
    this.http.post<any>(environment.api + "package/addPrice", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.getHttp();
      },
      error => {
        console.log(error);
      },
    );
  }

  addPackage() {
    this.loading = true;
    const body = {
      data: "new Object",
    }
    this.http.post<any>(environment.api + "package/addPackage", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.getHttp();
      },
      error => {
        console.log(error);
      },
    );
  }


  fnPresencePrice(obj, val) {
    const body = {
      data: obj,
      value: val
    }

    this.http.post<any>(environment.api + "package/fnPresencePrice", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.getHttp();
      },
      error => {
        console.log(error);
      },
    );
  }


  fnPresenceVps(obj, val) {
    const body = {
      data: obj,
      value: val
    }

    this.http.post<any>(environment.api + "package/fnPresenceVps", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.getHttp();
      },
      error => {
        console.log(error);
      },
    );
  }

  editable() {
    this.readonly = false;
  }

}
