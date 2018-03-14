import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ModalInformationComponent } from '../../components/modal-information/modal-information';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  detail(objeto:object){
    let detail = this.modalCtrl.create(ModalInformationComponent, {detail: objeto});
    detail.present();
  }


}
