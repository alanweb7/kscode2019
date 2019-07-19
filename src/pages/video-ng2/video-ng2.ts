import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileUploader } from 'ng2-file-upload';
import { Entry, FileEntry, File, IFile, FileError } from '@ionic-native/file';

// const URL = '/api/';
const URL = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/users/modelo?token=eyJ0eX';

@IonicPage()
@Component({
  selector: 'page-video-ng2',
  templateUrl: 'video-ng2.html',
})
export class VideoNg2Page {
  uploader:FileUploader;
  carpeta="";
  indice=0;
  public fonteCapture: any;
  public videoGallery;
  uploadedVideo;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaCapture: MediaCapture,
    ) {

      this.uploader = new FileUploader({
        url: URL, // url del php que trata el fichero subido
        method: 'POST',
        removeAfterUpload: true, // lo quita de la lista una vez su subida fue correcta
        queueLimit: 100 // limite de archivos que se pueden añadir a la lista, si el numero de archivos seleccionados es superior se cogen los x primeros.
      });


      this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
        form.append('id' , this.indice);
        form.append('fotonum' , 'n1');
        form.append('carpeta' , this.carpeta);
        this.indice = this.indice + 1;
      };
      // Función que salta cada vez que añadimos un nuevo archivo, aqui podemos controlar que no se suban archivos demasiado grandes
      this.uploader.onAfterAddingFile = function(fileItem) {
            if (fileItem.file.size > 2048000) {
              let prompt = this.alertCtrl.create({
                title: 'Error de archivo',
                message: "El archivo que está intentando subir sobrepasa el limite de tamaño de 2mb, seleccione otro archivo.",
                buttons: [
                  {
                    text: 'Aceptar',
                    handler: data => {
                      fileItem.cancel();
                      fileItem.remove();
                    }
                  }
                ]
              });
              prompt.present();
            }
        console.info('onAfterAddingFile', fileItem);
    };
      // Función que salta cuando se han añadido todos los archivos seleccionados.
      this.uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll');
      };
      // Función que se ejecuta antes de subir un archivo. Aquí añadimos datos adicionales necesarios para renombrar el
      // archivo como nosotros queremos.
      this.uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem');
      };
      // Barra de progreso que indica la subida.
      this.uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem');
      };
      // Función que se ejecuta cuando la barra de progreso llega a su fin.
      this.uploader.onProgressAll = function(progress) {
        console.info('onProgressAll');
      };
      // Función que salta si la subida del archivo se produjo con éxito en nuestro caso guardamos los índices de las
      // imágenes para almacenarlos posteriormente en la bdd.
      this.uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);

      };
      // Función que salta si se produce un error en la subida.
      this.uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
      };
      // Función que se ejecuta si se cancela la subida.
      this.uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
      };

      this.uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem');
      };
      this.uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
      };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoNg2Page');
  }


  openFileDialog1 = function() {
   document.getElementById('seleccion').click();
    // if (this.carpeta.length < 5) {
    //     alert("El nombre de carpeta no ha sido especificado o no se trata de un nombre valido.");
    // } else {
    //     document.getElementById('seleccion').click();
    // }
  }


}
