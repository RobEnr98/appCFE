import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/inicio',
      icon: 'home'
    },
    {
      title: 'Captura de Recibos',
      url: '/ucapture',
      icon: 'scan-circle'
    },
    {
      title: 'Recibos enviados',
      url: '/stats',
      icon: 'send'
    },
    {
      title: 'Anexos',
      url: '/anexo',
      icon: 'document-text'
    },
    {
      title: 'Contacto',
      url: '/contact',
      icon: 'chatbubble-ellipses'
    },
    {
      title: 'Acerca de...',
      url: '/about',
      icon: 'information-circle'
    }
  ];
  public labels = ['Acerca de...'];
  constructor() {}
}
