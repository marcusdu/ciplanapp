import { Component } from '@angular/core';
import { NavController,AlertController,Loading,ActionSheetController,Platform,LoadingController,ToastController } from 'ionic-angular';
import { File,FileEntry } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ApiService} from '../../shared/http-service';
import { Network } from '@ionic-native/network';
import { Subscription} from 'rxjs/Subscription';

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

  connected: Subscription;
  disconnected: Subscription;

  constructor
  (
    public navCtrl: NavController, 
    private camera: Camera, 
    private transfer: FileTransfer, 
    private file: File, 
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
    public platform: Platform, 
    public loadingCtrl: LoadingController,
    private api:ApiService,
    private network: Network
) 
{  }

ionViewDidEnter() 
{
  this.connected  = this.network.onConnect().subscribe(data => 
  {
    this.displayNetworkUpdate(data.type);
  }, error => console.error(error));
 
  this.disconnected  = this.network.onDisconnect().subscribe(data => 
    {
    this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
}

ionViewWillLeave()
{
  this.connected.unsubscribe();
  this.disconnected.unsubscribe();
}

displayNetworkUpdate(connectionState: string)
{
  let networkType = this.network.type;
  this.presentToast(`Status da conexão: ${connectionState}`, "bottom");
}


  public fromGallery()
  {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
    }).then(imageData => 
      {
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
    }).then(imageData => 
      {
      this.imageURI = imageData;
      this.uploadPhoto(imageData);
    }, error => 
    {
      this.error = JSON.stringify(error);
    });
  }


  
  private presentToast(text:string, position? :string) 
  {
    let toast = this.toastCtrl.create
    ({
      message: text,
      duration: 3000,
      position: position? position :'top'
    });
    toast.present();
  }
   

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

      this.imageURI = JSON.stringify(file);

        formData.append('imagem', imgBlob, file.name);

        this.api.upload(formData).subscribe((res)=>
        {
          this.loading.dismissAll()
          this.presentToast("Enviado com sucesso!");
        },(err)=>
        {
          this.loading.dismissAll()
          this.presentToast(`Ocorreu um erro ao enviar o comprovante.`);
        })
    };
    reader.readAsArrayBuffer(file);
  }
}
