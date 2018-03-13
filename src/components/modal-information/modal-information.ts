import { ModalController, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'modal-information',
  templateUrl: 'modal-information.html'
})
export class ModalInformationComponent {

  text: string;

  constructor( public modalCtrl: ModalController, public ViewCtrl: ViewController) {
    
  }

  closeModal(){
    this.ViewCtrl.dismiss();
  }

}
