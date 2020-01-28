import { Component, OnInit, OnDestroy } from '@angular/core';
import { MissionsService } from '../services/missions.service';
import { Subscription } from 'rxjs';
import { Mission } from 'src/app/interfaces/mission';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  missions: Mission[] = [];
  missionsSubscription: Subscription;

  constructor(
    private missionsService: MissionsService
  ) { }

  ngOnInit() {
    this.missionsSubscription = this.missionsService.missionsSubject.subscribe(
      (data: any) => {
        this.missions = data;
      }
    )
    this.missionsService.emitMissions();
  }

  getFinishValue(index) {
    if (this.missions[index].pointsBonus)
      return 'red';
    else
      return 'green';
  }

  ngOnDestroy() {
    this.missionsSubscription.unsubscribe();
  }
}
