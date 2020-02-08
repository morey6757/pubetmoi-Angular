import { Component, OnInit, OnDestroy } from '@angular/core';
import { MissionsService } from '../services/missions.service';
import { VariablesGlobales } from '../models/variablesGlobales';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private missionsService: MissionsService,
    public params: VariablesGlobales
  ) { }

  ngOnInit() {
  }

}
