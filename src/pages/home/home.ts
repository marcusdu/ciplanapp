import { Component } from '@angular/core';
import { NavController,AlertController,Loading,ActionSheetController,Platform,LoadingController,ToastController } from 'ionic-angular';
import { File,FileEntry } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
}
