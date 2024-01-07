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
  isLogin:boolean = false;
  subscriber: Subscription;
  // subscriberToken: Subscription;
  // subscriberRoles: Subscription;

  constructor(private common: CommonService, private router: Router){
    this.subscriber = common.isOnLoginPage.subscribe((val:any) => {
      this.isLogin = val;
    });

    this.token = <string>sessionStorage.getItem('token');
    this.rolesList = JSON.parse(sessionStorage.getItem('roles') as any);
   
    // this.subscriberToken = common.loginToken.subscribe((val:any) => {
    //   this.token = val;
    // });

    // this.subscriberRoles = common.roles.subscribe((val:any) => {
    //   this.rolesList = val;
    // });
    // if(!_.isEmpty(this.rolesList)){
    //   //this.rolesList = ['ROLE_ADMIN', 'ROLE_INVENTORY', 'ROLE_ADDA', 'ROLE_JOB', 'ROLE_DISPATCH', 'ROLE_ACCOUNT'];
    //   this.rolesList = ['ROLE_ADMIN', 'ROLE_INVENTORY', 'ROLE_ADDA', 'ROLE_JOB', 'ROLE_DISPATCH', 'ROLE_ACCOUNT']
    // }
  }
  
  ngOnInit() {
    // if(!this.token){
    //   this.token = sessionStorage.getItem('token');
    //   this.rolesList = JSON.parse(sessionStorage.getItem('roles') as any);
    // }
    // console.log("tokenNav", this.token);
    // console.log("rolesListNAV", this.rolesList);

    _.includes(this.rolesList, 'ROLE_ADMIN') ? this.isAdmin = true : this.isAdmin = false;
    _.includes(this.rolesList, 'ROLE_INVENTORY') ? this.isIM = true : this.isIM = false;
    _.includes(this.rolesList, 'ROLE_ADDA') ? this.isADM = true : this.isADM = false;
    _.includes(this.rolesList, 'ROLE_JOB') ? this.isJM = true : this.isJM = false;
    _.includes(this.rolesList, 'ROLE_DISPATCH') ? this.isDM = true : this.isDM = false;
    _.includes(this.rolesList, 'ROLE_ACCOUNT') ? this.isAM = true : this.isAM = false;

    console.log('this.isAdmin', this.isAdmin);
    console.log('this.isIM', this.isIM);
    console.log('this.isADM', this.isADM);
    console.log('this.isJM', this.isJM);
    console.log('this.isDM', this.isDM);
    console.log('this.isAM ', this.isAM );
    
    sessionStorage.setItem("isAdmin", JSON.stringify(this.isAdmin));
    sessionStorage.setItem("isIM", JSON.stringify(this.isIM));
    sessionStorage.setItem("isADM", JSON.stringify(this.isADM));
    sessionStorage.setItem("isJM", JSON.stringify(this.isJM));
    sessionStorage.setItem("isDM", JSON.stringify(this.isDM));
    sessionStorage.setItem("isAM", JSON.stringify(this.isAM));
    

    this.filteredOptionsAdda = this.myControlAdda.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filterAdda(value || '')),
    );
  }

  ngOnDestroy(){
    this.subscriber.unsubscribe();
    // this.subscriberToken.unsubscribe();
    // this.subscriberToken.unsubscribe();
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
    sessionStorage.clear();
    //this.subscriber.unsubscribe();
    setTimeout(()=>{
      this.router.navigate(['/login']);
    },300)
  }
}
