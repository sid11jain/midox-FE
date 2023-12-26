import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Observable, Subscription, from, of } from 'rxjs';
import { map, startWith, switchMap,catchError  } from 'rxjs/operators';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isLogin:boolean = false;
  token:any = false;
  filteredOptionsAdda!: Observable<any[]>;
  myControlAdda = new FormControl('');
  // detailAddaData: any;
  rolesList:any[] =[];
  isAdmin:boolean = false;
  isIM:boolean = false;  //Inventor manager
  isADM:boolean = false; //Adda manager
  isJM:boolean = false; //Job Manager
  isDM:boolean = false; //Dispatch Manager
  isAM:boolean = false; //Account Manager

  constructor(private common: CommonService, private router: Router){
    // this.subscriber = common.roles.subscribe((val:any) => {
    //   this.rolesList = val;
    // });
    this.token = localStorage.getItem('token');

    this.rolesList = JSON.parse(localStorage.getItem('roles') as any);
    
    if(_.isEmpty(this.rolesList)){
      //this.rolesList = ['ROLE_ADMIN', 'ROLE_INVENTORY', 'ROLE_ADDA', 'ROLE_JOB', 'ROLE_DISPATCH', 'ROLE_ACCOUNT'];
      this.rolesList = ['ROLE_ADMIN', 'ROLE_INVENTORY', 'ROLE_ADDA', 'ROLE_JOB', 'ROLE_DISPATCH', 'ROLE_ACCOUNT']
    }
  }
  
  ngOnInit() {
    this.token ? this.isLogin = false : this.isLogin = true;
    _.includes(this.rolesList, 'ROLE_ADMIN') ? this.isAdmin = true : this.isAdmin = false;
    _.includes(this.rolesList, 'ROLE_INVENTORY') ? this.isIM = true : this.isIM = false;
    _.includes(this.rolesList, 'ROLE_ADDA') ? this.isADM = true : this.isADM = false;
    _.includes(this.rolesList, 'ROLE_JOB') ? this.isJM = true : this.isJM = false;
    _.includes(this.rolesList, 'ROLE_DISPATCH') ? this.isDM = true : this.isDM = false;
    _.includes(this.rolesList, 'ROLE_ACCOUNT') ? this.isAM = true : this.isAM = false;

    localStorage.setItem("isAdmin", JSON.stringify(this.isAdmin));
    localStorage.setItem("isIM", JSON.stringify(this.isIM));
    localStorage.setItem("isADM", JSON.stringify(this.isADM));
    localStorage.setItem("isJM", JSON.stringify(this.isJM));
    localStorage.setItem("isDM", JSON.stringify(this.isDM));
    localStorage.setItem("isAM", JSON.stringify(this.isAM));
    

    this.filteredOptionsAdda = this.myControlAdda.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filterAdda(value || '')),
    );
  }

  private _filterAdda(value: any): Observable<any[]> {
    let filterValue:any = "";
    if(!value || value.length < 3){
      filterValue = null;
      return of([] as any[]);
    }
    else{
      filterValue = value;
      if(value?.name){
        filterValue = value.name;
      }
      return from(this.common.getBundleSearchFn("search", filterValue)).pipe(
        catchError((error: any) => {
          console.error("Error while filtering bundle options:", error);
          return of([] as any[]); // Return an empty array as an Observable or handle the error as needed
        }),
        switchMap((filterBundleOptions: any[]) => {
          // Filter the bundle options based on addaNo
          return of(filterBundleOptions);
        })
      );
    }

  }

  stockHistoryClick(){
    this.common.isStockHistoryClick.next(true);
  }

  async optionSelectedAdda(event: any) {
    
    // this.showTable = false;
    let selectedOptionValue = event?.option?.value;
    this.myControlAdda.setValue(selectedOptionValue?.name);

    if(selectedOptionValue?.type == "EMPLOYEE"){
      this.sendObjectToRoute({ "employeeId": selectedOptionValue?.id });
    }
    else if(selectedOptionValue?.type == "ADDA"){
      this.sendObjectToRoute({ "addaId": selectedOptionValue?.id });

    }
    else{
      // BUNDLE
      this.sendObjectToRoute({ "bundleId": selectedOptionValue?.id });
    }
    this.myControlAdda.reset();
  }

  sendObjectToRoute(routeData:any) {
    this.router.navigate(['adda/detail-bundle', { data: JSON.stringify(routeData) }]);
  }

  logoutFn(){
    localStorage.clear();
    //this.subscriber.unsubscribe();
    setTimeout(()=>{
      this.router.navigate(['/login']);
    },300)
  }
}
