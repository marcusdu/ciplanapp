import { ImagePicker } from '@ionic-native/image-picker';
import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{

  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner, 
    public alertCtrl: AlertController,
    private imgPicker : ImagePicker
  ) 
  {

  }
  public barcodeData;
  
  scan()
  {
    const options = 
    {
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: false, // Android, launch with the torch switched on (if available)
      prompt: 'Place a barcode inside the scan area', // Android
        // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      resultDisplayDuration: 500,

        // Android only (portrait|landscape), default unset so it rotates with the device
      orientation: 'portrait',
      disableAnimations: true, // iOS
      disableSuccessBeep: false // iOS
    };

    this.barcodeScanner
    .scan(options)
    .then((data) => 
    {
      this.barcodeData = data;
      const alert = this.alertCtrl.create({
        title: 'Scan Results',
        subTitle: data.text,
        buttons: ['OK']
      });
      alert.present();
    })
    .catch((err) => 
    {
      const alert = this.alertCtrl.create({
        title: 'Attention!',
        subTitle: err,
        buttons: ['Close']
      });
      alert.present();
    });

  }

  gallery(){
    let options = {
      quality : 100
    };

    this.imgPicker.getPictures(options).then((result) => {
      for (let i = 0; i < result.length; i++) {
        console.log(  result[i] );
      }
    })
  }

}
