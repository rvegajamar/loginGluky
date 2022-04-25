import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { RolesAdmin, Usuario} from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  roles = RolesAdmin;
  hide: boolean = true;
  cerrar: boolean;
  datos: Usuario = {
    uid: null,
    identificacion: null,
    nombres: null,
    apellidos: null,
    correo: null,
    celular: null,
    rol: null,
    contrasena: null
  };
  constructor(public nav: NavController, private auth: AuthService, private firestore: FirestoreService,
    private toastController: ToastController, private loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
  }

  back(){
    this.nav.navigateRoot('/login');
  }

  async registrar(){
    const loading = await this.loadingController.create({
      message: 'Cargando'
    });
    loading.present();
    if(this.datos.identificacion == null || this.datos.nombres == null
      || this.datos.apellidos == null || this.datos.correo == null 
      || this.datos.celular == null || this.datos.rol == null 
      || this.datos.contrasena == null) {
        loading.dismiss();
        this.Toast('¡Campos requeridos sin llenar!');
    }else{
      const res = await this.auth.registrarUser(this.datos).catch(error =>{
        console.log('Error');
        loading.dismiss();
        this.Toast('¡Email está en uso!');
      })
  
      if (res){
        const path = 'Usuario';     
        const id = res.user.uid;
        this.datos.uid = id;
        await this.firestore.crearDoc(this.datos, path, id);
        
        loading.dismiss();
        this.Toast('¡Se registró el usuario con éxito!');
        this.router.navigate(['/tabs/tab1']);
      }
    }
    
  }

  async Toast(msj) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }

  cerrarSesion(){
    localStorage.clear();
    this.auth.logout();
    this.router.navigate(['/ingreso']);
  }

  open_menu(){
    this.cerrar = !this.cerrar;
  }

}
