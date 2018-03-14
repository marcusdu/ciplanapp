import { Component } from '@angular/core';
import { NavController,AlertController,Loading,ActionSheetController,Platform,LoadingController,ToastController } from 'ionic-angular';
<<<<<<< HEAD
import { File,FileEntry } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
=======
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
>>>>>>> d7c035bf2041a998151c4e2b6eb28529441298d3
import {ApiService} from '../../shared/http-service';
declare var cordova: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
  lastImage: string = null;
  loading: Loading;
  captureDataUrl:string;
  error:string = "";
  imageURI: any;
  imageTitle: any;


  constructor(
    public navCtrl: NavController, 
    private camera: Camera, 
    private transfer: FileTransfer, 
    private file: File, 
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
    public platform: Platform, 
    public loadingCtrl: LoadingController,
    private api:ApiService
) { }

<<<<<<< HEAD
  public fromGallery()
  {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
    }).then(imageData => {
      this.imageURI = imageData;
      this.uploadPhoto(imageData);
    }, error => {
      this.error = JSON.stringify(error);
    });
  }
=======
 // public barcodeData;
  
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
>>>>>>> d7c035bf2041a998151c4e2b6eb28529441298d3

  public capturePhoto()
  {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.imageURI = imageData;
      this.uploadPhoto(imageData);
    }, error => {
      this.error = JSON.stringify(error);
    });
  }

  public takePicture(sourceType) 
  {
    let options: CameraOptions = 
    {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    };
 
 
    this.camera.getPicture(options).then((img) => 
    {
      this.imageURI = img;
      this.uploadPhoto(img);
    }).catch((reason) => {
      console.log(reason);
    });

  }
 

  
  private presentToast(text) 
  {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
   
  
  // doImageUpload() 
  // {
  //   let loader = this.loadingCtrl.create({
  //     content: "Carre..."
  //   });



  //   let filename = this.imageURI.split('/').pop();
  //   const fileTransfer: FileTransferObject = this.transfer.create();
 
  //   let options: FileUploadOptions = 
  //   {
  //     fileKey: "file",
  //     fileName: filename,
  //     chunkedMode: false,
  //     mimeType: "image/jpg",
  //     params: { 'title': "imageTitle"}
  //   };
 
  //   loader.present();
    
  //  this.api.upload(this.imageURI).subscribe((res)=>
  //   {
  //     this.loading.dismissAll()
  //     this.presentToast("sucesso");
  //   },(err)=>
  //   {
  //     this.loading.dismissAll()
  //     this.presentToast(`erro ${JSON.stringify(err)}`);
  //   });
 
  // } 

  private uploadPhoto(imageFileUri: any): void 
  {
    this.error = null;
    this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    this.loading.present();

    this.file.resolveLocalFilesystemUrl(imageFileUri)
      .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
      .catch(err => console.log(err));
  
  }

<<<<<<< HEAD
  private readFile(file: any) 
  {
    const reader = new FileReader();

    reader.onloadend = () => 
    {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('file', imgBlob, file.name);
        this.api.upload(formData).subscribe((res)=>
        {
          this.loading.dismissAll()
          this.presentToast("sucesso");
        },(err)=>
        {
          this.loading.dismissAll()
          this.presentToast(`erro ${JSON.stringify(err)}`);
        })
    };
    reader.readAsArrayBuffer(file);
  }
=======
>>>>>>> d7c035bf2041a998151c4e2b6eb28529441298d3
}
