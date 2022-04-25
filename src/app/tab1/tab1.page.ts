import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Globals } from '../global';
import { Usuario } from '../models/models';
import { FirestoreService } from '../services/firestore.service';
import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  rol: number;
  uid: string;

  constructor(private firestore: FirestoreService, private alertController: AlertController, 
              private loadingController: LoadingController, private toastController: ToastController,
              private global: Globals, private router: Router,  private auth: AuthService) {  
              }

  usuario: Usuario[] = [];
  newUsuario: Usuario[] = [];
  isModalOpen: boolean = false;
  info: Usuario;
  cerrar: boolean;
  startUsuarios = 0;
  endUsuarios = 7;
  QtyToRenderScroll = 10;
  
  async ngOnInit() {
      await this.loadUsuarios();
  }


  
  open_menu(){
    this.cerrar = !this.cerrar;
  }

  cerrarSesion(){
    localStorage.clear();
    this.rol = 2;
    this.cerrar = false;
    this.auth.logout();
    this.router.navigate(['/ingreso']);
  }

  async actualizar(info){   
    const path = 'Usuario'
    const alert = await this.alertController.create({
      header: 'Actualizar!',
      message: '¿Desea Actualizar el registro?',
      mode: 'ios',
      cssClass: 'css_alert',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Si',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Cargando'
            });
            loading.present();
          await this.firestore.crearDoc(info, path, info.uid)
          this.isModalOpen = false
          loading.dismiss();
          this.Toast('¡Se actualizó el usuario con éxito!');
          },
        },
      ],
    });
    await alert.present();

  }


   async loadUsuarios () {
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });
    loading.present();
     const path = 'Usuario'
    await this.firestore.getCollection<Usuario>(path).subscribe(res => {   
        this.usuario = res;
        if(this.global.getRol() == 'Administrador'){
          this.rol = 1;
        }else{
          this.rol = 2;
        }
        this.uid = this.global.getUid();
       this.cerrar = false;
             // console.log(res);     
      // this.usuario = res;
      this.newUsuarios();
     
    })
     loading.dismiss();
  }

  newUsuarios() {
    this.newUsuario = this.usuario.filter((item) => item.uid !== this.uid);
  }
  


  async eliminar(usuario: Usuario){
    const path = 'Usuario'
    const alert = await this.alertController.create({
      header: 'Eliminar!',
      message: 'Desea eliminar a ' + usuario.nombres + '?',
      mode: 'ios',
      cssClass: 'css_alert',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Si',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Cargando'
            });
            loading.present();
            this.firestore.deleteDoc(path, usuario.uid);
            loading.dismiss();
            this.Toast('¡Usuario eliminado con éxito!');      
          },
        },
      ],
    });
    await alert.present();
  }

  // editar(usuario: Usuario){
  //   this.
  // }

  openModal(usuario: Usuario) {
    this.isModalOpen = true;
    this.info = usuario;    
  }

  dismissModal() {
    this.isModalOpen = false;
    this.loadUsuarios ();
    
  }

  public capturarNumeroDocumento( event: any ) {
    console.log(event);
}

async Toast(msj) {
  const toast = await this.toastController.create({
    message: msj,
    duration: 2000,
    color: "danger"
  });
  toast.present();
}

loadData(event) {
  setTimeout(() => {
    this.endUsuarios = this.endUsuarios + this.endUsuarios;
    event.target.complete();
  }, 500);
}

toggleInfiniteScroll() {
  this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
}

}
