import { Component, OnInit } from '@angular/core';
import { VariablesGlobales } from 'src/app/models/variablesGlobales';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private params: VariablesGlobales,
    private location: Location) { }

  ngOnInit() {
    if (!this.params.isAdmin)
      this.location.back();
  }

}
