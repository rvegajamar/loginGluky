import { Component } from '@angular/core';
import { Globals } from '../global';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  rol: number;
  constructor(private global: Globals) {}

  async ngOnInit() {
    await this.roles();
  }

  ionViewDidEnter(){
    this.roles();
  }

  roles(){
    if(this.global.getRol() == 'Administrador'){
      this.rol = 1;
    }else{
      this.rol = 2;
    }
  }

}

