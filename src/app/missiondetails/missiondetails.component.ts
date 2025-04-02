import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../app.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [NgIf],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent implements OnInit {
  mission?: Mission;

  constructor(
    private route: ActivatedRoute,
    private api: SpacexapiService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getMissionByFlightNumber(id).subscribe((data) => {
      this.mission = data;
    });
  }
}
