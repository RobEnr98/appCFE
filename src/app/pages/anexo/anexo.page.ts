import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ModalController, Platform } from '@ionic/angular';
import { AnexoService } from '../../services/anexo.service';
import { Anexo } from '../../models/anexo.model';
import { AnexoPdfPage } from './anexo-pdf/anexo-pdf.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anexo',
  templateUrl: './anexo.page.html',
  styleUrls: ['./anexo.page.scss'],
})
export class AnexoPage implements OnInit {

  anexo: Anexo[] = [];
  id_user = localStorage.getItem("id_user");
  enlace = 'http://localhost:8080/file_anexo/';

  constructor( private menuctrl: MenuController,
               private modalctrl: ModalController,
               private as: AnexoService,
               private r: Router,
               private alert: AlertController,
               private platform: Platform) {

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.r.navigate(['/inicio']);
    });
  }

  ionViewWillEnter() {
    this.menuctrl.enable(true);
    this.as.getFiles(this.id_user).subscribe(
      resp => {
        this.anexo = resp['data'];
        console.log(this.anexo);
      }
    );
  }

  ngOnInit() {
  }

  async anexoModal(file_name){
    this.enlace = this.enlace+file_name;
    const modal = await this.modalctrl.create({
      component: AnexoPdfPage,
      componentProps: {
        archivo: file_name,
        enlace: this.enlace
      },
      cssClass: 'my-custom-class'
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    this.enlace = data.enlace;
  }

  verFile(file_name){
    this.enlace = 'http://localhost:8080/file_anexo/' + file_name;
    console.log(this.enlace);
  }

  async alerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alert.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
