import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Stats } from 'src/app/models/stats.model';
import { StatsService } from 'src/app/services/stats.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  stats: Stats[] = [];
  id_user = localStorage.getItem("id_user");

  constructor( private menuctrl: MenuController,
               private ss: StatsService,
               private r: Router ) { }

  ngOnInit() {
    this.ss.getShowstat(this.id_user).subscribe(
      resp => {
        this.stats = resp['data'];
        console.log(this.stats);
      }
    );
  }

  ionViewWillEnter() {
    this.menuctrl.enable(true);
  }

  verStat(clave){
    this.r.navigate(['stats/stat', clave]);
  }
}
