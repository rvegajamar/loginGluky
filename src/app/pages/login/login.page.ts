import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  ingresar(){
    this.nav.navigateRoot('/ingreso');
  }

  registrar(){
    this.nav.navigateRoot('/registro');
  }

}
