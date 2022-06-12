import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-anexo-pdf',
  templateUrl: './anexo-pdf.page.html',
  styleUrls: ['./anexo-pdf.page.scss'],
})
export class AnexoPdfPage implements OnInit {

  @Input() archivo: any;
  @Input() enlace: any;

  constructor( private modalctrl: ModalController,
               private platform: Platform) {

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalctrl.dismiss({
        enlace: 'http://localhost:8080/file_anexo/'
      });
    });
  }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalctrl.dismiss({
      enlace: 'http://localhost:8080/file_anexo/'
    });
  }

}
