import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController, IonSlides, MenuController, Platform } from '@ionic/angular';
import { UEscaneos } from 'src/app/models/uescaneos.model';
import { StatsService } from 'src/app/services/stats.service';
import { UescaneosService } from 'src/app/services/uescaneos.service';
import { Stats } from '../../models/stats.model';

@Component({
  selector: 'app-ucapture',
  templateUrl: './ucapture.page.html',
  styleUrls: ['./ucapture.page.scss'],
})
export class UcapturePage implements OnInit {

  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;

  code: any;
  codigo: any;
  codigos: UEscaneos[] = [];
  stats: Stats[] = [];
  indices: Array<{in: number, mn: number}> = [];
  id_user = localStorage.getItem("id_user");
  key: any;
  date = new Date();
  fecha: string;
  marcado: boolean = false;
  db1: boolean = false;
  db2: boolean = false;
  db3: boolean = false;
  db4: boolean = false;
  data: any;
  contador: number = 0;
  cont: number = 0;
  importe: number = 0;
  totalimporte: number = 0;
  options: any;

  constructor( private uv: UescaneosService,
               private ss: StatsService,
               private route: ActivatedRoute,
               private datePipe: DatePipe,
               private barcodeScanner: BarcodeScanner,
               private alert: AlertController,
               private r: Router,
               private platform: Platform,
               private menuctrl: MenuController ) {

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.r.navigate(['/inicio']);
    });
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  ionViewWillEnter() {
    this.menuctrl.enable(true);
  }

  ngOnInit() {
  }

  scan(){
    this.options = {
      orientation : "landscape",
    }
    this.barcodeScanner.scan(this.options).then(barcodeData => {
      this.code = barcodeData.text;
      this.leer();
    }).catch(err => {
      console.log('Error', err);
    });
  }

  validar(){
    this.leer();
  }

  leer(){
    if((this.code).length > 30 || (this.code).length < 30){
      this.alerta('Error', this.code, 'El código ingresado no es correcto');
      this.vaciar();
    }else{
      this.importe = parseInt(this.code.substring(20,29));
      this.codigo = this.code;

      if(isNaN(this.importe)){
        this.alerta('Error', this.code, 'El código ingresado no es correcto');
        this.vaciar();
      }else{
        if(this.codigos.find(item => item.codigo === this.code)){
          this.alerta('Error', this.code, 'El código ingresado es duplicado');
          this.vaciar();
        }else{
          this.codigos.push({id: null, codigo: this.codigo, importe: this.importe, status: false, fecha: null, id_comisionista: this.id_user, clave: null});
          this.totalimporte = this.importe + this.totalimporte;
          this.contador += 1;
          this.code = "";
          this.data = Object.values(this.codigos);
          console.log(this.codigos);
        }
      }
    }

    if(this.codigos.length == 0){
      this.db3 = false;
      this.db4 = false;
    }else{
      this.db3 = true;
      this.db4 = true;
    }
  }


  enviar(){
    let dia = this.datePipe.transform(this.date,"yyMMdd");
    this.key = this.generaNss(6)+"-"+this.id_user+"-"+dia;
    this.fecha = this.datePipe.transform(this.date,"yyyy-MM-dd hh:mm:ss");

    for (var i = this.codigos.length -1; i >= 0; i--){
      this.codigos[i].fecha = this.fecha;
      this.codigos[i].clave = this.key;
    }

    this.stats.push({id: null, id_comisionista: this.id_user, clave: this.key, importe_total: this.totalimporte, fecha: this.fecha});

    for (let s of this.stats){
      this.ss.crearStat(s).subscribe(
        res => {
          console.log(res);
        },
        err =>{
          console.log(err);
        }
      )
    }

    for (let ue of this.codigos) {
      delete ue.id;
      this.uv.crearEscaneo(ue).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.error(err);
        }
      )
    }

    this.alerta('Elementos enviados', '', 'Los códigos escaneados fueron enviados exitosamente a la base de datos');

    this.codigos = [];
    this.indices = [];
    if(this.indices.length == 0)
        this.db2 = false;
    if(this.codigos.length == 0)
        this.db3 = false;
        this.db4 = false;
    this.marcado = false;
    this.data = Object.values(this.codigos);
    this.totalimporte = 0;
    this.contador = 0;
    this.vaciar();
  }


  totalcheck(){
    if(this.marcado == true){
      for (var i = this.codigos.length -1; i >= 0; i--){
        this.codigos[i].status = true;
      }
    }else{
      for (var i = this.codigos.length -1; i >= 0; i--){
        this.codigos[i].status = false;
      }
    }
  }

  check(i: number, ds, di){
    if(ds == false){
      this.indices = this.indices.filter(item => item.in !== i);
      this.indices.sort((a, b) => {
        return a.in - b.in;
      });
      if(this.indices.length == 0)
        this.db2 = false;
    }else{
      this.indices.push({in: i, mn: di});
      this.indices.sort((a, b) => {
        return a.in - b.in;
      });
      this.db2 = true;
    }

    if(this.indices.length == this.codigos.length){
      this.marcado = true;
    }else{
      this.marcado = false;
    }
  }

  activarButton(){
    if(this.code !== ""){
      this.db1 = true;
    }else{
      this.db1 = false;
    }
  }

  borrarCodigo(){
    for (var i = this.indices.length -1; i >= 0; i--){
        this.codigos.splice(this.indices[i].in ,1);
        this.totalimporte = this.totalimporte - this.indices[i].mn;
        this.contador += -1;
    }

    this.indices = [];
    if(this.indices.length == 0)
        this.db2 = false;
    if(this.codigos.length == 0)
        this.db3 = false;
        this.db4 = false;
    this.marcado = false;
    this.vaciar();
    this.data = Object.values(this.codigos);
  }

  async borrar(cod: any, imp: number, i: number){
    const alert = await this.alert.create({
      header: 'Borrar',
      message: `¿Está seguro que desea borrar los códigos seleccionados?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Ok',
          handler: () => {
            this.borrarCodigo();
          }
        }
      ]
    });

    await alert.present();
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

  generaNss(n: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < n; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  vaciar(){
    this.code = "";
    this.codigo = "";
    this.importe = 0;
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
}


