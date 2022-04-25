import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { RolesLogin, Usuario} from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  hide: boolean = true;
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

  roles = RolesLogin;

  constructor(public nav: NavController, private auth: AuthService, private firestore: FirestoreService,
    private toastController: ToastController, private loadingController: LoadingController) { }

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
      console.log('Registrado con exito');
      const path = 'Usuario';      
      const id = res.user.uid;
      this.datos.uid = id;
      await this.firestore.crearDoc(this.datos, path, id);
      loading.dismiss();
      this.Toast('¡Se registró el usuario con éxito!');
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

}
