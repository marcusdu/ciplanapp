import { ModalController, ViewController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'modal-information',
  templateUrl: 'modal-information.html'
})
export class ModalInformationComponent {

  detail: object;

  constructor( public modalCtrl: ModalController, public ViewCtrl: ViewController, private param:NavParams) {
    this.detail = param.get('detail');
  }

  closeModal(){
    this.ViewCtrl.dismiss();
  }

}
