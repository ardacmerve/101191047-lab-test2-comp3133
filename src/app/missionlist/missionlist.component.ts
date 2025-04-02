import { Component, OnInit } from '@angular/core';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../app.model';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MissionfilterComponent } from '../missionfilter/missionfilter.component';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [NgForOf, MissionfilterComponent],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];

  constructor(private spacexApi: SpacexapiService, private router: Router) {}

  ngOnInit(): void {
    this.spacexApi.getAllMissions().subscribe((data) => {
      this.missions = data;
    });
  }

  viewMissionDetails(flightNumber: number): void {
    this.router.navigate(['/mission', flightNumber]);
  }

  filterMissions(year: string): void {
    if (year === '') {
      this.spacexApi.getAllMissions().subscribe((data) => {
        this.missions = data;
      });
    } else {
      this.spacexApi.getMissionsByYear(year).subscribe((data) => {
        this.missions = data;
      });
    }
  }
}
