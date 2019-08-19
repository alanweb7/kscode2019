import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ToastController, LoadingController, reorderArray, ViewController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions} from "@ionic-native/camera";
import { ImagePicker } from '@ionic-native/image-picker';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CodeProvider } from '../../providers/code/code';
import { NetworkProvider } from '../../providers/network/network';
import { UtilService } from '../../providers/util/util.service';
@IonicPage({
  priority : 'off',
  segment  : 'ImageAdd/:imagens/:code/:token/:qtd/:pacote',
  defaultHistory:['ImageCodePage']
})
@Component({
  selector: 'page-image-add',
  templateUrl: 'image-add.html',
})
export class ImageAddPage {
  images        : any[];
  imagesbase64  : String;
  caminho       : any[];
  token         : any;
  id_code       : any;
  qtd           : Number;
  package_name   : String;
  package_imagens :Number;
 //tradução
 page: any;
 btn_cancelar: any;
 msg_servidor: any;
 load_enviando: any;
 load_aguarde: any;
 msg_exlcuir: any;
 btn_publicar: any;
 btn_excluir: any;
 msg_pacote: any;
 vencimento: any;
 image_name: any;
 dias: any;
 info: any;
 galeria: any;
 camera_btn: any;
 msg_erro: any;
 aviso: any;
 msg_image: any;
  selecione: any;
  pacote;
  arq_selecione: string;
  lang: String;
  constructor(public navCtrl         : NavController,
              public modalCtrl       : ModalController,
              public navParams       : NavParams,
              public alertCtrl       : AlertController,
              public actionSheetCtrl : ActionSheetController,
              public imagePicker     : ImagePicker,
              private photoViewer    : PhotoViewer,
              private codeProvider   : CodeProvider,
              public  net            : NetworkProvider,
              public toast           : ToastController,
              public camera          : Camera,
              public viewCtrl        : ViewController,
              public loadingCtrl     : LoadingController,
              public util            : UtilService,


            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageAddPage');
    this.images            = [];
    this.caminho           = [];
    this.token             = String;
    this.id_code           = String;
    this.package_name      = "";
    this.package_imagens   =0;
    this.id_code           = "";
    this.token             = "";
    this.imagesbase64      = "";
    this.qtd               = 0;
    this.imagesbase64      = this.navParams.get('imagens');
    this.token             = this.navParams.get('token');
    this.id_code           = this.navParams.get('code');
    this.package_name      = this.navParams.get('package_name');
    this.package_imagens   = this.navParams.get('package_imagens');
    this.page = this.navParams.get('page');
    this.btn_cancelar = this.navParams.get('btn_cancelar');
    this.msg_servidor = this.navParams.get('msg_servidor');
    this.load_enviando = this.navParams.get('load_enviando');
    this.load_aguarde = this.navParams.get('load_aguarde');
    this.msg_exlcuir = this.navParams.get('msg_exlcuir');
    this.btn_publicar = this.navParams.get('btn_publicar');
    this.btn_excluir = this.navParams.get('btn_excluir');
    this.msg_pacote = this.navParams.get('msg_pacote');
    this.vencimento = this.navParams.get('vencimento');
    this.image_name = this.navParams.get('image_name');
    this.dias = this.navParams.get('dias');
    this.info = this.navParams.get('info');
    this.galeria = this.navParams.get('galeria');
    this.camera_btn = this.navParams.get('camera');
    this.msg_erro = this.navParams.get('msg_erro');
    this.aviso = this.navParams.get('aviso');
    this.msg_image = this.navParams.get('msg_image');
    this.selecione = this.navParams.get('selecione');
    this.pacote = this.navParams.get('pacote');
    this.arq_selecione = this.navParams.get('arq_selecione');
    this.lang = this.navParams.get('lang');
    console.log("a",this.package_imagens);
    this.getImagenServe();
  }
  getImagenServe(){
    if(this.imagesbase64 != "" && this.imagesbase64 != null){
         this.images=[];
         for (let i = 0; i < this.imagesbase64.length; i++) {
             this.images.push(this.imagesbase64[i]);
        }
         this.imagesbase64="";
     }
  }

  showConfirm_ItemArray(id_img) {
    const confirm = this.alertCtrl.create({
     title: this.msg_exlcuir,
     message: '',
     buttons: [
       {
         text: this.btn_cancelar,
         handler: () => {

         }
       },
       {
         text: this.btn_excluir,
         handler: () => {
           this.removeItemArray(id_img);
         }
       }
     ]
   });
   confirm.present();
  }
  //chamada alerta de confirmação antes de excluir
 showConfirm(id_img) {
  const confirm = this.alertCtrl.create({
   title: this.msg_exlcuir,
   message: '',
   buttons: [
     {
       text: this.btn_cancelar,
       handler: () => {

       }
     },
     {
       text: this.btn_excluir,
       handler: () => {
         this.imagen_delete(id_img);
       }
     }
   ]
 });
 confirm.present();
}
  reorderItem(indexes){
    console.log("index",indexes);
    this.images   = reorderArray(this.images,indexes);
   console.log(this.images);

   }
  removeItemArray(item){
    console.log("item para remover",item);
    const index = this.images.indexOf(item);
    this.images.splice(index, 1);
    console.log( this.images );
  }
 validaPacote(){
  if(this.images.length > 0){
    console.log("entrei aqui no >0");
    if(this.images.length >= this.package_imagens ){
      const alert = this.alertCtrl.create({
        title: this.aviso,
        subTitle: this.msg_image+'<br>'+this.pacote+this.package_name+'<br>'+this.image_name +'CODE: '+this.package_imagens,
        buttons: ['OK']
      });
      alert.present();
    }else{
      console.log("entrei aqui no ==");
        this.onActionSheet();
    }
  }else {
    console.log("entrei aqui no else");
    this.onActionSheet();
 }

}
  //chama pra escolher a opção da foto
onActionSheet(): void {

    this.actionSheetCtrl.create({
      title: this.selecione,
      buttons: [
        {
          text: this.galeria,
          handler: () => {

              this.getPictures(this.camera.PictureSourceType.PHOTOLIBRARY);

          }
        },
        {
          text: this.camera_btn,
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: this.btn_cancelar
        }
      ]
    }).present();






}
takePicture(){

  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  // this.camera.getPicture(options).then((imageData) => {
  //  // imageData is either a base64 encoded string or a file URI
  //  // If it's base64 (DATA_URL):
  //  let base64Image = 'data:image/jpeg;base64,' + imageData;


  //   // base64.replace('', '+');
  //   // console.log(base64);
  //  this.images.push({id: "",files:base64Image,img_link:'my_foto',file_name: 'my_foto'});


  // //  this.images.push({id: "",files:base64Image,img_link:'my_image',file_name: 'my_image'});

  // }, (err) => {
  //  // Handle error
  // });

  // let cameraOptions    : CameraOptions = {
  //   correctOrientation: true,
  //   quality: 100,
  //   saveToPhotoAlbum: false,
  //   sourceType: sourceType,
  //   mediaType: this.camera.MediaType.PICTURE

  // };
  this.camera.getPicture(options)
    .then(async (fileUri) => {
              //converter base64
             let ImageBase64 = await this.util.converterBase64(fileUri).then((base64:any) => {
              // base64.replace('', '+');
              console.log(base64);

              return base64;

             });

             await this.images.push({id: "",files:ImageBase64,img_link:fileUri,file_name: fileUri});

    }).catch((err: Error) => console.log('Camera error: ', err));

  }


getPictures(sourceType: number){
  let qtd = this.package_imagens;
  let options = {
    maximumImagesCount: 5,
    quality: 100,
    sourceType: sourceType
  }
  this.imagePicker.getPictures(options).then( results =>{
    for(let i=0; i < results.length;i++){
      //console.log("result image picker",results[i]);
      if(results[i] != "K" && results[i] != "O"){
          //converter base64
          this.util.converterBase64(results[i]).then((base64:any) => {
            // base64.replace('', '+');
            console.log(base64);
            this.images.push({id: "",files:base64,img_link:results[i],file_name: results[i]});
          });
      }

    }
  });


}
closeModal() {
  this.navCtrl.pop();
 // this.navCtrl.push('ImageCodePage',{imagens:this.images,token:this.token,code:this.id_code,qtd:this.qtd,pacote:this.pacote});
}
//visualizar foto tamnho maior
viewPhoto(img){
  this.photoViewer.show(img);
}
    imagen_delete(id_img){

            this.util.showLoading(this.load_aguarde);
            this.codeProvider.imagen_delete(this.token,id_img,this.lang)
            .subscribe(
                  (result: any) =>{
                  this.util.loading.dismissAll();
                    if(result.status == 200){
                      //this.removeItemArray(id_img);
                      this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'sucesso'  }).present();
                    // this.imagesbase64="";
                    this.images =result.midias;
                  /*    if(result.midias.length > 0){
                        this.imagesbase64 =result.midias;
                        this.getImagenServe();
                      }else{


                      }  */
                      }else if(result.status == 402){
                        this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                        this.navCtrl.push('LoginPage',{lang:this.lang});
                      }
                      else if(result.status == 403){
                        this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                      }

            } ,(error:any) => {
              this.toast.create({ message: this.msg_servidor, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();

            });


    }
    /**escolher tipo de link (whatsapp, telefone, site) */
    onFromImageLink(image_id): void {
      console.log('Image_id em onFromImageLink:: em image-add:: ',image_id);

      let alert = this.alertCtrl.create({
        title: 'Conectar imagem com:',
        inputs: [
          {
            type: 'radio',
            name: 'Link',
            value: '1',
            label: 'Site ou link',
            checked: true
          },
          {
            type: 'radio',
            name: 'whatsapp',
            value: '2',
            label: 'Whatsapp',
          },
          {
            type: 'radio',
            name: 'phone',
            value: '3',
            label: 'Telefone',
          },
          {
            type: 'radio',
            name: 'delete',
            value: '9',
            label: 'Sem link',

          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancelar');
            }
          },
          {
            text: 'Ok',
            handler: data => {
              console.log('Data total:: am image-add.ts:: ==>',data);
              let setData = {
                'id'         :this.id_code,
                'type'       :data,
                'image_id'   :image_id,
                'actSetData' :'link',
              }
              console.log('Linkar imagem: ', image_id);
              if(data == '9'){
                let setData = {
                  'id'         :this.id_code,
                  'type'       :data,
                  'image_id'   :image_id,
                  'link' :'',
                }
                this.setLinkimage(setData);
              }else{
                this.confirmLinkImage(setData);
              }

            }
          }
        ]
      });
      alert.present();
    }
    confirmLinkImage(setData) {
      console.log('SetData em image-add.ts:: ', setData);
      let image_id = setData.image_id;
      console.log('image_id em image-add.ts:: ', image_id);
      let actSetData = setData.actSetData;
      let type = setData.type;
      let typeInput = 'tel';
      if(type == '1'){
        typeInput = 'text';
      }
      console.log(image_id);

      switch(actSetData){
        case 'link':
            let alertLink = this.alertCtrl.create({
              title: 'Link da Imagem',
              inputs: [
                {
                  type: typeInput,
                  name: 'link',
                  placeholder: 'Link para imagem'
                }
              ],
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: data => {
                    console.log('Cancelar');
                  }
                },
                {
                  text: 'Salvar',
                  handler: data => {
                    let setDataServ = {
                      'link'      :data.link,
                      'image_id'  :image_id,
                      'type'      : type
                    }
                    console.log('Linkar image_id imagem: ', image_id);
                    this.setLinkimage(setDataServ);
                  }
                }
              ]
            });
            alertLink.present();
        break;
      }

    }
    setLinkimage(setData){
            setData.id = this.id_code;
            this.util.showLoading(this.load_aguarde);
            this.codeProvider.setlinkimage(this.token,setData,this.lang)
            .then((res: any) =>{
                    let result: any = res;
                    console.log('Response em setLinkimage em image-add:: ',result);
                    // console.log('Status em setLinkimage:: ',result.status);
                    this.images = result.midias;

                  this.util.loading.dismissAll();

            }).catch((res)=>{
              this.util.loading.dismissAll();
              console.log('Resultado catch em setlinkimage:: ', res);
              this.toast.create({ message: this.msg_servidor, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
            });
      }/**set link image */

    enviar(){
    if(this.images.length > 0){
      console.log(this.images);
      this.util.showLoading(this.load_enviando);

            this.codeProvider.imagen_create(this.id_code,this.token,this.images,this.lang)
            .subscribe(
              (result: any) =>{
                this.util.loading.dismissAll();
                if(result.status == 200){
                  this.images      = [];
                  this.imagesbase64 = result.midias;
                  this.getImagenServe();
                  this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'sucesso'  }).present();

                  //this.navCtrl.pop();
                //  this.navCtrl.push('ImageCodePage',{imagens:this.images,token:this.token,code:this.id_code,qtd:this.qtd,pacote:this.pacote});
                }else if(result.status == 402){
                  this.navCtrl.push('LoginPage',{lang:this.lang});
                }
                else if(result.status == 403){
                  this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                }
            },(error:any) => {
              //console.log('erro',error);
                this.util.loading.dismissAll();
                this.toast.create({ message: this.msg_servidor, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'erro'  }).present();
            });

      }else{

          this.util.loading.dismissAll();
          let alert = this.alertCtrl.create({
            title: this.aviso,
            subTitle: this.arq_selecione,
            buttons: ['OK']
          });
          alert.present();
      }
    }

}
