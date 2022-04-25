import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Globals } from 'src/app/global';
import { Usuario } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  credenciales = {
    correo: null,
    password: null
  }
  existe: boolean = false;
  usuario: any;

  constructor(public nav: NavController, private auth: AuthService, public alertController: AlertController,
    private toastController: ToastController, private loadingController: LoadingController, private firestore: FirestoreService, private global: Globals) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });
    loading.present();
    await this.loadUsuarios();
    loading.dismiss();
  }

  back(){
    this.nav.navigateRoot('/login');
  }

  async login(){
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });
    loading.present();
    const res = await this.auth.login(this.credenciales.correo, this.credenciales.password).catch(error => {
      console.log('Error');
      loading.dismiss();
      this.Toast('¡Usuario o contraseña incorrecta!');
    })

    if (res){
      loading.dismiss();
      const path = 'Usuario'
      if (this.usuario){
        this.usuario.forEach(element => {
          if (res.user.uid == element.uid){
            this.global.setRol(element.rol);
            this.global.setUid(element.uid);
            this.existe = true;
            return;
          }
          
        });
        if(this.existe == false){
          this.Toast('¡Usuario o contraseña incorrecta!');
        }else{
          this.nav.navigateRoot('/tabs/tab1');
        }
      }else{
        this.Toast('¡Usuario o contraseña incorrecta!'); 
      } 
    }
  }

  loadUsuarios () {
    const path = 'Usuario'
   this.firestore.getCollection<Usuario>(path).subscribe(uid => {   
       this.usuario = uid;     
   })
 }
  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'Usuario o contraseña incorrecta'
    });

    await alert.present();
  }

  async Toast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }
}
