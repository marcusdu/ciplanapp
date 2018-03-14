import { ImagePicker } from '@ionic-native/image-picker';
import { Component } from '@angular/core';
import { NavController,AlertController,Loading,ActionSheetController,Platform,LoadingController,ToastController } from 'ionic-angular';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
declare var cordova: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
  lastImage: string = null;
  loading: Loading;
  //constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner,  public alertCtrl: AlertController) 
  constructor(public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) { }

<<<<<<< HEAD
  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner, 
    public alertCtrl: AlertController,
    private imgPicker : ImagePicker
  ) 
  {

  }
  public barcodeData;
=======
 // public barcodeData;
>>>>>>> 11d8d8805e8a0b3d121bd92345a64775281f3c84
  
  // scan()
  // {
  //   const options = 
  //   {
  //     preferFrontCamera: false, // iOS and Android
  //     showFlipCameraButton: true, // iOS and Android
  //     showTorchButton: true, // iOS and Android
  //     torchOn: false, // Android, launch with the torch switched on (if available)
  //     prompt: 'Place a barcode inside the scan area', // Android
  //       // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
  //     resultDisplayDuration: 500,

  //       // Android only (portrait|landscape), default unset so it rotates with the device
  //     orientation: 'portrait',
  //     disableAnimations: true, // iOS
  //     disableSuccessBeep: false // iOS
  //   };

  //   this.barcodeScanner
  //   .scan(options)
  //   .then((data) => 
  //   {
  //     this.barcodeData = data;
  //     const alert = this.alertCtrl.create({
  //       title: 'Scan Results',
  //       subTitle: data.text,
  //       buttons: ['OK']
  //     });
  //     alert.present();
  //   })
  //   .catch((err) => 
  //   {
  //     const alert = this.alertCtrl.create({
  //       title: 'Attention!',
  //       subTitle: err,
  //       buttons: ['Close']
  //     });
  //     alert.present();
  //   });

  // }
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }
  public presentActionSheet() 
  {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
   
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
   
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
   
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = "http://yoururl/upload.php";
   
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
   
    // File name only
    var filename = this.lastImage;
   
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename}
    };
   
    const fileTransfer: TransferObject = this.transfer.create();
   
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
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
