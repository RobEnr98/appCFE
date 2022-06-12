import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, Platform, IonRouterOutlet } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Usuarios } from '../../models/usuarios.model';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  Usuario: Usuarios = new Usuarios();
  user: string;
  pass: string;
  db1: boolean = false;

  constructor( private us: LoginService,
               private alert: AlertController,
               private r: Router,
               private menuctrl: MenuController,
               private platform: Platform,
               private routerOutlet: IonRouterOutlet) {

    this.platform.backButton.subscribeWithPriority(10, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  ionViewWillEnter() {
    this.menuctrl.enable(false);
  }

  ngOnInit() {
  }

  validar(){
    this.us.getUsuario(this.user).subscribe(
      resp => {
        this.Usuario = resp['data'];
        if(this.Usuario === undefined){
          this.alerta('Error', '', 'El usuario ingresado es incorrecto');
          this.user = "";
          this.pass = "";
        }else{
          if(this.Usuario.pass == this.pass){
            localStorage.setItem('id_user',this.Usuario.id);
            this.r.navigate(['/inicio']);
          }else{
            this.alerta('Error', '', 'La contraseña ingresada es incorrecta');
            this.pass = "";
          }
        }
      }
    );
  }

  activarButton(){
    if(this.user !== "" && this.pass !== ""){
      this.db1 = true;
    }else{
      this.db1 = false;
    }
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
