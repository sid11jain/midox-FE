import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
  optionsAdda: any[] = ['One', 'Two', 'Three'];
  detailAddaData: any;

  constructor(private common: CommonService, private router: Router){
  }

  async ngOnInit(){

    
    this.detailAddaData = await this.common.getDataFn1({}, "adda", "get-addas");
    this.optionsAdda = [...this.detailAddaData];
    this.filteredOptionsAdda = this.myControlAdda.valueChanges.pipe(
      startWith(''),
      map(value => this._filterAdda(value || '')),
    );
  }

  private _filterAdda(value: any): any {
    // console.log(value);
    let filterValue: any;
    filterValue = value.toLowerCase();
    
    // let filterBundleOptions = await this.common.getBundleSearchFn("search", `${filterValue}`);
    return this.optionsAdda.filter((val: any) => val?.addaNo?.toLowerCase().includes(filterValue));
  }

  stockHistoryClick(){
    this.common.isStockHistoryClick.next(true);
  }

  async optionSelectedAdda(event: any) {
    
    // this.showTable = false;
    let selectedOptionValue = event.option.value;
    console.log(selectedOptionValue);
    
    // let addaObj = this.detailAddaData.find((option: any) => option.addaNo === selectedOptionValue);
    // let addaId = addaObj.addaId;
    // console.log('addaId:', addaId);
    
    // this.bundleDetailObj = { "addaId": addaId };
    
    // this.showTable = true;
    // this.showSpinner = false;
    this.sendObjectToRoute({ "addaId": 3 });
    this.myControlAdda.reset();
  }

  sendObjectToRoute(routeData:any) {
    this.router.navigate(['adda/detail-bundle', { data: JSON.stringify(routeData) }]);
  }
}
