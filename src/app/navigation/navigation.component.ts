import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Observable, from, of } from 'rxjs';
import { map, startWith, switchMap,catchError  } from 'rxjs/operators';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  
  filteredOptionsAdda!: Observable<any[]>;
  myControlAdda = new FormControl('');
  // detailAddaData: any;

  constructor(private common: CommonService, private router: Router){
  }
  
  async ngOnInit() {
    this.filteredOptionsAdda = this.myControlAdda.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filterAdda(value || '')),
    );
  }

  private _filterAdda(value: any): Observable<any[]> {
    let filterValue:any = "bil";
    // filterValue = value.toLowerCase();
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
    console.log(selectedOptionValue);
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
    
    // let addaObj = this.detailAddaData.find((option: any) => option.addaNo === selectedOptionValue);
    // let addaId = addaObj.addaId;
    // console.log('addaId:', addaId);
    
    // this.bundleDetailObj = { "addaId": addaId };
    
    // this.showTable = true;
    // this.showSpinner = false;
    // this.sendObjectToRoute({ "addaId": 3 });
    this.myControlAdda.reset();
  }

  sendObjectToRoute(routeData:any) {
    this.router.navigate(['adda/detail-bundle', { data: JSON.stringify(routeData) }]);
  }
}
