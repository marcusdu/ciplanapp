import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { ModalInformationComponent } from '../../components/modal-information/modal-information';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  detail(){
    let detail = this.modalCtrl.create(ModalInformationComponent);
    detail.present();
  }


}
