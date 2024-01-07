import { Component, ViewChild, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartDataset, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  dashboardDetails:any = {};

  bundlePieDetails:any = {};
  
  clothPieDetails:any = {};

  addaCompletedDetails:any = {};
  accessoriesDetails:any = {};

  bundleBarDetails:any = {};
  dispatchStackedDetails:any = {};
  showSpinner:boolean = true;
  constructor(private common: CommonService){
    this.bundlePieDetails['To Be Started'] = -1;
    this.bundlePieDetails['In Progress'] = -1;
    this.bundlePieDetails['Finished'] = -1;

    this.clothPieDetails['To Be Started'] = -1;
    this.clothPieDetails['In Progress'] = -1;
    this.clothPieDetails['Finished'] = -1;
   }
  ngOnInit(){

    this.showSpinner = false;
    this.common.getDashboardData().subscribe((val:any) => {
      this.showSpinner = false;
      this.dashboardDetails = val.status  == 200?val.body:'';
      this.dashboardDetails ? this.bundlePieDetails = this.dashboardDetails?.bundlePieChart : '';
      this.dashboardDetails ? this.clothPieDetails = this.dashboardDetails?.clothPieChart : '';

      this.dashboardDetails ? this.accessoriesBarChartData = this.dashboardDetails?.accessoriesBarChart : '';
      this.dashboardDetails ? this.addaPerMonthBarChartData = this.dashboardDetails?.addaPerMonthBarChart : '';

      this.dashboardDetails ? this.bundleBarDetails = this.dashboardDetails?.bundleBarChart : '';
      this.dashboardDetails ? this.dispatchStackedDetails = this.dashboardDetails?.dispatchStackedChart : '';
      this.setupChartData();
    });
  }
  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top'
      },
      datalabels: {
        color: '#fff',
        formatter: (value:any, ctx:any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      }
    }
  };

  public pieChartData: any = {
    labels: [],
    datasets: [ {
      data: [],
      //borderColor: '#36A2EB',
      backgroundColor: ['#919ee5', '#3F512B5',  '#20c99'],
    } ]
  };

 

  public clothpieChartData: any = {
    labels: [ ],
    datasets: [ {
      data: [ ],
      //borderColor: '#36A2EB',
      backgroundColor: ['#919ee5', '#3F512B5',  '#20c99'],
    } ]
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  // // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
  }

  //bar chart
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DatalabelsPlugin
  ];
  public addaPerMonthBarChartData: ChartData<'bar'> = {
    labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    datasets: [
      { 
        data: [ this.addaCompletedDetails?.Jan, this.addaCompletedDetails?.Feb, this.addaCompletedDetails?.Mar, 
          this.addaCompletedDetails?.Apr, this.addaCompletedDetails?.May, this.addaCompletedDetails?.Jun, 
          this.addaCompletedDetails?.Jul, this.addaCompletedDetails?.Aug, this.addaCompletedDetails?.Sep, 
          this.addaCompletedDetails?.Oct, this.addaCompletedDetails?.Nov, this.addaCompletedDetails?.Dec ],
        backgroundColor: [
          '#3F51B5'
        ],
      },
      
    ],
    
  };

  public accessoriesBarChartData: ChartData<'bar'> = {
    labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    datasets: [
      { 
        data: [ this.accessoriesDetails?.Jan, this.accessoriesDetails?.Feb, this.accessoriesDetails?.Mar, 
          this.accessoriesDetails?.Apr, this.accessoriesDetails?.May, this.accessoriesDetails?.Jun, 
          this.accessoriesDetails?.Jul, this.accessoriesDetails?.Aug, this.accessoriesDetails?.Sep, 
          this.accessoriesDetails?.Oct, this.accessoriesDetails?.Nov, this.accessoriesDetails?.Dec ],
        backgroundColor: [
          '#3F51B5'
        ],
      },
      
    ],
    
  };

  public barBundleChartData: ChartData<'bar'> = {
    labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    datasets: [
      { 
        data: [ this.bundleBarDetails?.Jan, this.bundleBarDetails?.Feb, this.bundleBarDetails?.Mar, 
          this.bundleBarDetails?.Apr, this.bundleBarDetails?.May, this.bundleBarDetails?.Jun, 
          this.bundleBarDetails?.Jul, this.bundleBarDetails?.Aug, this.bundleBarDetails?.Sep, 
          this.bundleBarDetails?.Oct, this.bundleBarDetails?.Nov, this.bundleBarDetails?.Dec ],
        backgroundColor: [
          '#3F51B5'
        ],
      },
      
    ],
    
  };
  
  public barChartLabels: any[] = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

  public barStackedChartData: ChartDataset[] = [
    { data: [this.dispatchStackedDetails[0]?.Jan, this.dispatchStackedDetails[0]?.Feb, this.dispatchStackedDetails[0]?.Mar, 
      this.dispatchStackedDetails[0]?.Apr, this.dispatchStackedDetails[0]?.May, this.dispatchStackedDetails[0]?.Jun, 
      this.dispatchStackedDetails[0]?.Jul, this.dispatchStackedDetails[0]?.Aug, this.dispatchStackedDetails[0]?.Sep, 
      this.dispatchStackedDetails[0]?.Oct, this.dispatchStackedDetails[0]?.Nov, this.dispatchStackedDetails[0]?.Dec ], label: 'Series A', stack: 'a', backgroundColor: ['#919ee5'] },
    { data: [this.dispatchStackedDetails[1]?.Jan, this.dispatchStackedDetails[1]?.Feb, this.dispatchStackedDetails[1]?.Mar, 
      this.dispatchStackedDetails[1]?.Apr, this.dispatchStackedDetails[1]?.May, this.dispatchStackedDetails[1]?.Jun, 
      this.dispatchStackedDetails[1]?.Jul, this.dispatchStackedDetails[1]?.Aug, this.dispatchStackedDetails[1]?.Sep, 
      this.dispatchStackedDetails[1]?.Oct, this.dispatchStackedDetails[1]?.Nov, this.dispatchStackedDetails[1]?.Dec], label: 'Series B', stack: 'a' , backgroundColor: ['#3F51B5'],}
  ];

  setupChartData() {
    this.pieChartData = {
      labels: [],
      datasets: [ {
        data: [],
        //borderColor: '#36A2EB',
        backgroundColor: ['#36A2EB', '#3F51B5', '#19d863'],
      } ]
    };

    let labels = [ [ 'To Be Started' , this.bundlePieDetails['To Be Started']], [ 'In Progress' , this.bundlePieDetails['In Progress']],
    [ 'Finished' , this.bundlePieDetails['Finished']]];
    labels.forEach((element:any) => {
      this.pieChartData.labels.push(element);
    });

    let data = [ +this.bundlePieDetails['To Be Started'], +this.bundlePieDetails['In Progress'], +this.bundlePieDetails['Finished'] ];
    data.forEach((element:any) => {
      this.pieChartData.datasets[0].data.push(element);
    });


    //cloth pie chart
    this.clothpieChartData = {
      labels: [],
      datasets: [ {
        data: [],
        //borderColor: '#36A2EB',
        backgroundColor: ['#36A2EB', '#3F51B5', '#19d863'],
      } ]
    };

    let clothlabels = [ [ 'To Be Started' , this.clothPieDetails['To Be Started']], [ 'In Progress' , this.clothPieDetails['In Progress']],
    [ 'Finished' , this.clothPieDetails['Finished']]];
    clothlabels.forEach((element:any) => {
      this.clothpieChartData.labels.push(element);
    });

    let clothdata = [ +this.clothPieDetails['To Be Started'], +this.clothPieDetails['In Progress'], +this.clothPieDetails['Finished'] ];
    clothdata.forEach((element:any) => {
      this.clothpieChartData.datasets[0].data.push(element);
    });

    let addPerMonthDataList = [ this.addaCompletedDetails?.Jan, this.addaCompletedDetails?.Feb, this.addaCompletedDetails?.Mar, 
      this.addaCompletedDetails?.Apr, this.addaCompletedDetails?.May, this.addaCompletedDetails?.Jun, 
      this.addaCompletedDetails?.Jul, this.addaCompletedDetails?.Aug, this.addaCompletedDetails?.Sep, 
      this.addaCompletedDetails?.Oct, this.addaCompletedDetails?.Nov, this.addaCompletedDetails?.Dec ];
    this.addaPerMonthBarChartData.datasets[0].data.push(...addPerMonthDataList);

    let accessoriesBarChartDataList = [ this.accessoriesDetails?.Jan, this.accessoriesDetails?.Feb, this.accessoriesDetails?.Mar, 
      this.accessoriesDetails?.Apr, this.accessoriesDetails?.May, this.accessoriesDetails?.Jun, 
      this.accessoriesDetails?.Jul, this.accessoriesDetails?.Aug, this.accessoriesDetails?.Sep, 
      this.accessoriesDetails?.Oct, this.accessoriesDetails?.Nov, this.accessoriesDetails?.Dec ];
    this.accessoriesBarChartData.datasets[0].data.push(...accessoriesBarChartDataList);

    let barBundleChartDataList = [ this.bundleBarDetails?.Jan, this.bundleBarDetails?.Feb, this.bundleBarDetails?.Mar, 
    this.bundleBarDetails?.Apr, this.bundleBarDetails?.May, this.bundleBarDetails?.Jun, 
    this.bundleBarDetails?.Jul, this.bundleBarDetails?.Aug, this.bundleBarDetails?.Sep, 
    this.bundleBarDetails?.Oct, this.bundleBarDetails?.Nov, this.bundleBarDetails?.Dec ];
    this.barBundleChartData.datasets[0].data.push(...barBundleChartDataList);

    let barStackedChartData1 = [this.dispatchStackedDetails[0]?.Jan, this.dispatchStackedDetails[0]?.Feb, this.dispatchStackedDetails[0]?.Mar, 
    this.dispatchStackedDetails[0]?.Apr, this.dispatchStackedDetails[0]?.May, this.dispatchStackedDetails[0]?.Jun, 
    this.dispatchStackedDetails[0]?.Jul, this.dispatchStackedDetails[0]?.Aug, this.dispatchStackedDetails[0]?.Sep, 
    this.dispatchStackedDetails[0]?.Oct, this.dispatchStackedDetails[0]?.Nov, this.dispatchStackedDetails[0]?.Dec ];
    let barStackedChartData2 = [this.dispatchStackedDetails[1]?.Jan, this.dispatchStackedDetails[1]?.Feb, this.dispatchStackedDetails[1]?.Mar, 
    this.dispatchStackedDetails[1]?.Apr, this.dispatchStackedDetails[1]?.May, this.dispatchStackedDetails[1]?.Jun, 
    this.dispatchStackedDetails[1]?.Jul, this.dispatchStackedDetails[1]?.Aug, this.dispatchStackedDetails[1]?.Sep, 
    this.dispatchStackedDetails[1]?.Oct, this.dispatchStackedDetails[1]?.Nov, this.dispatchStackedDetails[1]?.Dec];
    
    this.barStackedChartData[0].data.push(...barStackedChartData1);
    this.barStackedChartData[1].data.push(...barStackedChartData2);


  }
  
}
