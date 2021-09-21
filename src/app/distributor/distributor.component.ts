import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { TreeModel, TreeNode } from '@circlon/angular-tree-component'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-distributor',
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {
  @ViewChild('tree') tree : any;
  loading : boolean = true;
  nodes : any = [];
  options = {
    nodeHeight: 43,
  };
  header : string = "Distributor";
  search : string;
  expandAll : boolean = false;
  loadPages : boolean = true;
   

  constructor(
    private http: HttpClient,
    private configService: ConfigService, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  getHttp() {
    this.http.get<any>(environment.api + "distributor/tree", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.loading = false;
        this.loadPages = false;
        if(data['error']== true){
          this.router.navigate(['warning/distributor']);
        }
        console.log(data); 
        this.nodes =  data['items'];
      },
      error => {
        console.log(error);
      },

    );
  }

  user : any = []; 
  onEvent(e){ 
    console.log(e.node.data); 
    this.router.navigate(['user',e.node.data.id]);
  }

  
}
