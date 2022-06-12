import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  id_user = localStorage.getItem("id_user");
  date = new Date();
  fecha: string;

  constructor(private datePipe: DatePipe,
              private menuctrl: MenuController,
              private r: Router,
              private platform: Platform) {

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.r.navigate(['/inicio']);
    });
  }

  ionViewWillEnter() {
    this.menuctrl.enable(true);
  }

  ngOnInit() {
    this.fecha = this.datePipe.transform(this.date,"yyMMdd");
  }

  validar(){
    console.log(this.generaNss(9));
    console.log(this.fecha);
  }

  generaNss(n: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < n; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    result = result+"-"+this.id_user;
    return result;
  }
}
