import { Component, OnInit } from '@angular/core';
import { Chart, Color } from 'chart.js';
import { Analytic } from 'src/app/models/analytic';
import { LeadsService } from 'src/app/services/leads/leads.service';
import { environment } from 'src/environments/environment';
import { ChartDataset, ChartOptions, } from 'chart.js';
import { SourceAnalytic } from 'src/app/models/sourceAnalytic';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.sass']
})
export class AnalyticsComponent implements OnInit {

  dateStart : Date;
  dateEnd : Date;
  form : FormGroup;
  isAnalytic : boolean = true;

  radarChartLabels: string[];
  radarChartData: ChartDataset[];

  barChartLabels: string[];
  barChartData: ChartDataset[];
  
  employeeAnalytic : Analytic[];
  dataSourceAnalytic : SourceAnalytic;
  leadsAnalytic : SourceAnalytic;

  path : string = environment.apiUrl;

  myChart: Chart;

  lineChartData: ChartDataset[];
  lineChartLabels: string[];
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLegend = true;
  barChartPlugins = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  doughnutChartLabels: string[];
  doughnutChartData: ChartDataset[];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(
    private leadsService: LeadsService
  ) { }

  ngOnInit(): void {

    this.dateStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.dateEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    console.log(this.dateStart);
    console.log(this.dateEnd);

    this.getEmployeeAnalytics();
    this.getSourceAnalytic();
    this.getLeadsAnalytic();

    this.isAnalytic = true;

    this.form = new FormGroup({

      is_analytic: new FormControl(true),

    });

    this.onChengesIsAnalytic();
  }
  
  getLeadsAnalytic() {
    this.leadsService.getLeadsAnalytics(this.dateHelper(this.dateStart), this.dateHelper(this.dateEnd)).subscribe((data : SourceAnalytic) => {
      this.leadsAnalytic = data;

      console.log(data[0]);

      this.radarChartData = [
        { data: data[0], label: 'Аналитика лидов' },
      ];
      this.radarChartLabels = [
        'Качественные лиды', 
        'Качественные доп. продажи',
        'Не качественные лиды',
        'Не качественные доп. продажи',
        'Курьерская доставка',
        'Повторные лиды'
      ];

      this.barChartLabels = [
        'Качественные лиды', 
        'Качественные доп. продажи',
        'Не качественные лиды',
        'Не качественные доп. продажи',
        'Курьерская доставка',
        'Повторные лиды'
      ];
      this.barChartData = [
        { data: data[0], label: 'Аналитика лидов' },
      ];
    });
  }

  onChengesIsAnalytic() {
    this.form.get('is_analytic').valueChanges.subscribe(value => {
      this.isAnalytic = value;
    })
  }

  getAllAnalytics(){
    this.getEmployeeAnalytics();
    this.getSourceAnalytic();
    this.getLeadsAnalytic();
  }

  getSourceAnalytic() {
    this.leadsService.getSourceAnalytics(this.dateHelper(this.dateStart), this.dateHelper(this.dateEnd)).subscribe((data : SourceAnalytic) => {
      this.dataSourceAnalytic = data;

      this.lineChartData = [
        { data: data[1], label: 'Аналитика источников лидов' },
      ];
      this.lineChartLabels = data[0];
     
      this.barChartLabels = data[0];
      this.barChartData = [
        { data: data[1], label: 'Аналитика источников лидов' },
      ]; 

      this.doughnutChartLabels = data[0];
      this.doughnutChartData = [
        { data: data[1], label: 'Аналитика источников лидов' },
      ];

    });
  }

  getEmployeeAnalytics() {
    this.leadsService.getEmployeeAnalytics(this.dateHelper(this.dateStart), this.dateHelper(this.dateEnd)).subscribe((data : Analytic[]) => {
      this.employeeAnalytic = data;
    });
  }

  dateHelper(date: Date): string {
    //d.m.Y
     
    if(date) {
      return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }
    return '';
  }

}
