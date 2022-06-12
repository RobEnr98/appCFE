import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UescaneosService } from '../../../services/uescaneos.service';
import { UEscaneos } from '../../../models/uescaneos.model';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.page.html',
  styleUrls: ['./stat.page.scss'],
})
export class StatPage implements OnInit {

  stats: UEscaneos[] = [];
  id_user = localStorage.getItem("id_user");
  keycode: string;

  constructor( private es: UescaneosService,
               private menuctrl: MenuController,
               private route: ActivatedRoute) { }

  ngOnInit() {
    const clave = this.route.snapshot.paramMap.get('clave');
    this.es.getScanStat(this.id_user, clave).subscribe(
      res => {
        this.stats = res['data'];
        this.keycode = clave;
      }
    );
  }

  ionViewWillEnter() {
    this.menuctrl.enable(true);
  }

}
