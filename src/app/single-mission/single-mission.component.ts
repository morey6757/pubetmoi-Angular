import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionsService } from '../services/missions.service';
import { Mission } from '../interfaces/mission';
import { Location } from '@angular/common';

@Component({
  selector: 'app-single-mission',
  templateUrl: './single-mission.component.html',
  styleUrls: ['./single-mission.component.css']
})
export class SingleMissionComponent implements OnInit {
  mission: Mission;
  constructor(private route: ActivatedRoute,
    private missionsService: MissionsService,
    private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.missionsService.getSingleMission(id).then(
      (mission: Mission) => {
        this.mission = mission;
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }

  onBack() {
    this.location.back();
  }

}
