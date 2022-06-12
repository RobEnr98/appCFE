import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor( private menuctrl: MenuController,
               private r: Router,
               private platform: Platform) {

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.r.navigate(['/inicio']);
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuctrl.enable(true);
  }

}
