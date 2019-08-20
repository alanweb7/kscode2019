import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, ToastController, AlertController, Platform, ModalController, LoadingController, ActionSheetController, ViewController } from 'ionic-angular';
//import Provider
import { NetworkProvider } from '../../providers/network/network';
import { CodeProvider } from './../../providers/code/code';
import { UtilService } from '../../providers/util/util.service';
import { TranslateService } from '@ngx-translate/core';

/**
 * funcoes de gravacao de audio
 */
import { Media, MediaObject } from '@ionic-native/media';
import { FTP } from '@ionic-native/ftp';
import {NgZone} from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';

/**
 * Generated class for the AudioListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audio-list',
  templateUrl: 'audio-list.html',
})
export class AudioListPage {
  token        : any;
  id_code      : any;
  videos       : any[];
  package_codes          : Number;
  package_name       : String;
  videos_serve : any[];
  fullPath     : string;
  name         : String;
  localURL     : any;
  info         : any;
  size         : any;
  isConvertido : Number=3;
  alerte       : Alert;
  extension    : String;
  package_videos :Number;
  public progress: number = 0;
  isAdicionado  :number =  0;
  lang;
  load_enviando: any;
  msg_servidor: any;
  btn_cancelar: any;
  page: any;
  load_aguarde: any;
  msg_exlcuir: any;
  btn_publicar: any;
  btn_excluir: any;
  msg_pacote: any;
  vencimento: any;
  pacote: any;
  dias: any;
  link_video;
  link_texto: any;
  msg_erro: any;
  msg_video: any;
  aviso: any;
  btn_pausa: any;
  sim: any;
  nao: any;
  enviado_video: any;
  outro_video: any;
  selecione_video: any;
  btn_pausar: any;
  btn_continuar: any;
  btn_enviar: any;
  selecione: any;
  enviando: any;
  videos_name: any;
  link: any;
  galeria: string;
  fontCapture: string;

  uploadedVideo: boolean;
  fileUpload: any;
  inUpload: boolean;
  isEnviando: boolean;
  inCanceled: boolean;
  inProgress: boolean;
  isSelecionado: boolean = false;
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  public isPlayed: boolean;

  alertSuccess: boolean;
  porcentagem;
  public secTimer: number = 0;
  public minTimer: number = 0;
  public hourTimer: number = 0;
  public progressTimer: number = 0;
  maxTime: number = 7200;
  timeFinal: any;
  hidevalue: boolean;
  countUp: any;

  public uploadPercent: number = 0;
  public ftp_remote_path: string;
  public FTPnewName: string;
  public ftp_host: string;
  public ftp_user: string;
  public ftp_password: string;

  constructor(
            public navCtrl: NavController,
             public navParams: NavParams,
             private codeProvider   : CodeProvider,
             public  net            : NetworkProvider,
             public toast           : ToastController,
             private alertCtrl      : AlertController,
             public platform        : Platform,
             public modalCtrl       : ModalController,
             public loadingCtrl     : LoadingController,
             public actionSheetCtrl : ActionSheetController,
             public util            : UtilService,
             public viewCtrl        : ViewController,
             private translate 	  : TranslateService,
             private media: Media,
             public file            : File,
             private http: HTTP,
             private fTP: FTP,
             public _zone: NgZone,
             private nativeAudio: NativeAudio
             ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AudioListPage');

    this.token         = String;
    this.id_code       = String;
    this.id_code       = "";
    this.token         = "";
    this.package_codes = 0;
    this.package_name  = "";
    this.token         = this.navParams.get('token');
    this.id_code       = this.navParams.get('code');

    this.package_codes = this.navParams.get('package_codes');
    this.package_name  = this.navParams.get('package_name');
    this.package_videos = this.navParams.get('package_videos');
    this.lang           = this.navParams.get('lang');
    this._translateLanguage();
  }

  private ionViewDidEnter() {
    this.getShow();
    //.slider.slideTo(1);
   }
   private _translateLanguage() : void
   {
      this.translate.use(this.lang);
      console.log("linguagem",this.lang);
      this._initialiseTranslation();
   }
   private _initialiseTranslation() : void
   {
      setTimeout(() =>
      {
         this.page             = this.translate.instant("default.videos");
         this.btn_cancelar     = this.translate.instant("default.btn_cancelar");
         this.msg_servidor     = this.translate.instant("default.msg_servidor");
         this.load_enviando    = this.translate.instant("default.load_enviando");
         this.load_aguarde     = this.translate.instant("default.load_aguarde");
         this.load_enviando    = this.translate.instant("default.load_enviando");
         this.msg_exlcuir      = this.translate.instant("default.msg_exlcuir");
         this.btn_publicar     = this.translate.instant("default.btn_publicar");
         this.btn_excluir      = this.translate.instant("default.btn_excluir");
         this.msg_pacote       = this.translate.instant("default.msg_pacote");
         this.vencimento       = this.translate.instant("default.vencimento");
         this.pacote           = this.translate.instant("default.pacote");
         this.videos_name           = this.translate.instant("default.videos");
         this.dias             = this.translate.instant("default.dias");
         this.info             = this.translate.instant("default.info");
         this.link_video       = this.translate.instant("videos.link_video");
         this.link_texto       = this.translate.instant("videos.link_texto");
         this.msg_erro         = this.translate.instant("default.msg_erro");
         this.msg_video        = this.translate.instant("default.msg_video");
         this.aviso            = this.translate.instant("default.aviso");
         this.btn_pausa        = this.translate.instant("videos.btn_pausar");
         this.sim              = this.translate.instant('default.sim');
         this.nao              = this.translate.instant('default.nao');
         this.enviado_video    = this.translate.instant('videos.enviado_video');
         this.outro_video      = this.translate.instant('videos.outro_video') ;
         this.selecione_video  = this.translate.instant('videos.selecione_video');
         this.btn_pausar       = this.translate.instant('videos.btn_pausar');
         this.btn_continuar    = this.translate.instant('default.btn_continuar');
         this.btn_enviar       = this.translate.instant('push.btn_enviar');
        // this.selecione       = this.translate.instant('videos.selecione');
         this.enviando       = this.translate.instant('videos.enviando');
         this.link          = this.translate.instant('videos.link');
         this.selecione          = this.translate.instant('videos.selecione');
         this.galeria          = this.translate.instant('videos.galeria');

      }, 250);
   }
  onActionSheet(): void {
    this.actionSheetCtrl.create({
      title: this.selecione,
      buttons: [
        {
          text: this.link,
          handler: () => {

              this.showPrompt();
          }
        },
        {
          text: this.galeria,
          handler: () => {
            this.fontCapture = 'galeria';
            this.uploadVideo();
          }
        },
         {
          text: 'Camera',
          handler: () => {
            // this.VideoCapture();
            this.fontCapture = 'camera';
            this.uploadVideo();
          }
        },
         {
          text: 'Gravador de Voz',
          handler: () => {
            // this.VideoCapture();
            this.fontCapture = 'gravador';
            this.uploadVideo();
          }
        },
        {
          text: this.btn_cancelar
        }
      ]
    }).present();
  }
  showPrompt() {
    const prompt = this.alertCtrl.create({
        //title: 'Escolha o seu CODE',
        message: this.link_video,
        inputs: [
          {
            name: 'link',
            placeholder: this.link_texto
          }
        ],
        buttons: [
          {
            text: this.btn_cancelar,
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: this.btn_enviar,
            handler: data => {
              console.log('Saved clicked',data.link);
              this.insertVideoLinkArray(data.link);
            }
          }
        ]
      });
      prompt.present();
}
showConfirm(id_img) {
  const confirm = this.alertCtrl.create({
   title: this.msg_exlcuir,
   message: '',
   buttons: [
     {
       text: this.btn_cancelar,
       handler: () => {
         console.log('Disagree clicked');
       }
     },
     {
       text: this.btn_excluir,
       handler: () => {
         this.video_delete(id_img);
       }
     }
   ]
 });
 confirm.present();
}
ShowVideo(video){
  let myModal =this.modalCtrl.create('VideoShowPage',{videos:video});
  myModal.present();
}
uploadVideo(){
   this.navCtrl.push('VideCodeFirebasePage',{font_capture:this.fontCapture,videos:this.videos,token:this.token,code:this.id_code,package_videos:this.package_videos,package_name:this.package_name, lang:this.lang,
    load_enviando:this.load_enviando,
    msg_servidor: this.msg_servidor,
    btn_cancelar: this.btn_cancelar,
    page: this.page,
    load_aguarde: this.load_aguarde,
    msg_exlcuir: this.msg_exlcuir,
    btn_publicar: this.btn_publicar,
    btn_excluir: this.btn_excluir,
    msg_pacote: this.msg_pacote,
    vencimento: this.vencimento,
    pacote: this.pacote,
    dias: this.dias,
    aviso: this.aviso,
    msg_video: this.msg_video,
    sim: this.sim,
    nao: this.nao,
    enviado_video: this.enviado_video,
    outro_video: this.outro_video,
    selecione_video: this.selecione_video,
    btn_pausar:this.btn_pausar,
    videos_name:this.videos_name,
    btn_continuar:this.btn_continuar,
    btn_enviar:this.btn_enviar,selecione:this.selecione,enviando:this.enviando});
 //  let myModal =this.modalCtrl.create('VideCodeFirebasePage',{videos:this.videos,token:this.token,code:this.id_code,package_videos:this.package_videos,package_name:this.package_name});
   //myModal.present();
  // this.viewCtrl.dismiss();
 }
public insertVideoLinkArray(link){
  this.util.showLoading(this.load_enviando);


          this.codeProvider.video_link_create(this.id_code,this.token,link,"",this.lang)
           .subscribe(
              (result: any) =>{
                this.util.loading.dismissAll();
                if(result.status == 200){
                  console.log("result insert code",result);
                  this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'sucesso'  }).present();
                  //this.vidbase64 = result.midias;
                 // this.getVideoServe();
                }else if(result.status == 402){
                  this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'alerta'  }).present();
                  this.navCtrl.push('LoginPage',{lang:this.lang});
                }
                else if(result.status == 403){
                  this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                }

           } ,(error:any) => {
            this.toast.create({ message:this.msg_servidor, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
            this.util.loading.dismissAll();
            this.navCtrl.setRoot('HomePage');
           });



}
validaPacote(){
  console.log();
  if(this.videos.length > 0){
    if(this.videos.length >= this.package_videos ){
      const alert = this.alertCtrl.create({
        title: this.aviso,
       // subTitle: this.msg_video+"<br>"+this.pacote+":"+this.package_name+'<br>'+this.codes+' CODES<br>'+this.codes_videos+" "+this.videos+' CODE<br>'+this.vencimento+":"+this.code_expiratiion+' '+this.dias,

        subTitle: this.msg_video+'<br>'+this.pacote+' :'+this.package_name+'<br>'+this.videos_name+' CODE: '+this.package_videos,
        buttons: ['OK']
      });
      alert.present();
    }else{
        this.onActionSheet();
        //this.viewCtrl.dismiss();
    }
  }else {
    this.onActionSheet();
     //this.viewCtrl.dismiss();
 }

}
getShow(){
  this.util.showLoading(this.load_aguarde);
       // this.util.showLoading("Aguarde...");
        this.codeProvider.getShowCode(this.id_code)
        .subscribe(
              (result: any) =>{
                console.log("result",result);
                if(result.status == 200){
                  this.util.loading.dismissAll();
                  this.videos              = result.data[0]['audio_colection'];
                  console.log(this.videos);
                 // this.getVideoServe();
                }else{
                  this.toast.create({ message: this.msg_erro, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                }
        },(error:any) => {
          this.toast.create({ message:this.msg_servidor, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
          this.util.loading.dismissAll();
          this.navCtrl.setRoot('HomePage');
        });
}
video_delete(id_code){
        this.util.showLoading(this.load_aguarde);
        this.codeProvider.audio_delete(this.token,id_code,this.lang)
        .subscribe(
              (result: any) =>{
                this.util.loading.dismissAll();
                if(result.status == 200){
                  console.log("result delete code",result);
                  this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'sucesso'  }).present();
                  if(result.midias.length > 0){
                    //this.vidbase64 =result.midias;
                     this.videos=result.midias;
                     //this.removeItemArray(id_code);
                     console.log("entrei aqui",id_code);
                   // this.getVideoServe();
                  }else{
                    this.videos = [];

                  }

                }else if(result.status == 402){
                  this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'alerta'  }).present();
                  this.navCtrl.push('LoginPage',{lang:this.lang});
                }
                else if(result.status == 403){
                  this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                }

        } ,(error:any) => {
          this.toast.create({ message:this.msg_servidor, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
          this.util.loading.dismissAll();
          this.navCtrl.setRoot('HomePage');
        });

}

  ///funcoes de gravacao de audio
  getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }
 startRecord() {
   this.progressTimer = 0;
    this.StartTimer('init');

    if(this.platform.is('ios')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.m4a';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }

    this.audio.startRecord();
    this.recording = true;

  }
  stopRecord() {
    this.StartTimer('stop');
    this.isSelecionado = true;
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    //acionar botao de envio
    this.isSelecionado = true;
    this.uploadedVideo = false;

    this.fileUpload = 'file://' + this.filePath;
    console.log('Data do audio em stopRecord: ',data);
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.getAudioList();
  }
  playAudio(file,idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }

    if(this.isPlayed){
      console.log('Pausar áudio');
      this.audio.pause();
      this.isPlayed = false;
    }else{
      console.log('Player áudio');
      this.isPlayed = true;
      this.audio.play();
      this.audio.setVolume(0.8);
    }

  }

  playerAudioNative(url){
    // this.nativeAudio.preloadSimple('uniqueId1', url).then(onSuccess, onError);
  }
  eraseAudio(){
        //acionar botao de envio
        this.audioList = [];
        this.isSelecionado = false;
        this.recording = false;
  }

  ///metodo de envio via FTP
  async getAccess(){
    let url = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/users/codes';

    let getData = {
      id: this.id_code,
      bloco: 14,
      token: this.token,
      action: 'access',
    };

   let accessData = await this.http.post(url, getData, {})
    .then(data => {
      let resp = {
        data: JSON.parse(data.data),
        status: data.status
      };
      return resp;
    })
    .catch(error => {

      console.log(error.status);
      console.log(error.error); // error message as string
      // console.log(error.headers);

    });

    return accessData;
  }
  async sendVideoFTP(){
    this.inCanceled = false;
    this.isEnviando = true;
    this.inUpload = true;
    this.alertSuccess = false;
    await this.getAccess()
    .then(async (res:any)=>{
      console.log('Retorno do getAccess: ',res);

        let data = res.data;
        this.ftp_host = data.dominion;
        let ftp_path = data.file_path;
        this.ftp_user = data.user;
        this.ftp_password = data.password;
        this.ftp_remote_path = ftp_path + this.id_code +'/';

          await this.createNewFileName(this.fileUpload).then((name)=>{
            console.log('Nome gerado: ', name);
            this.FTPnewName = name;

          });

    });


    await this.fTP.connect('108.161.131.35', this.ftp_user, this.ftp_password)
    .then((res: any) => {
      this.inProgress = true;

        console.log('Conectado: ', res);
    })
    .catch((error: any) => console.error(error)), (err)=>{
      console.log('Erro na conexao: ', err);
    };

    console.log('Verificando este folder: ',this.ftp_remote_path);

          let checkFolderFunc = await this.checkFolderRemote().then((checkFolder)=>{
            console.log('Verificando folder: ',checkFolder);

          });
         await console.log('Verificando folder fora : ',checkFolderFunc);

    ///upload FTP
    console.log('estou no meio');
   await this.fTP.upload(this.fileUpload, this.ftp_remote_path + this.FTPnewName).subscribe((progress)=>{
      // console.log(progress);
      if(progress == 1){
        console.log('progress 1::');
      }

        this._zone.run(() =>{
            var perc = Math.round(progress * 100);
            // console.log(progressEvent,'%',perc);
            this.uploadPercent = perc;
            if(perc == 100 && this.alertSuccess == false){
              this.alertSuccess = true;
              console.log('perc  100::');
              this.video_create_ftp(this.FTPnewName);

              this.inUpload = false;
              this.isSelecionado = false;

            }
        });

      }), (err) => {
        console.log('Erro no upload: ', err);
      };
      console.log('estou no final');

  }

  uploadCancelFTP(){
    this.inCanceled = true;
    this.fTP.cancel().then((res)=>{
      this.recording = false;
      this.isEnviando = false;

      this.isSelecionado = false;


      this.audioList = null;
      this.fileUpload = null;
      this.inUpload = false;

      this.inProgress = false;
      this.porcentagem = 0;

    }), (err)=> console.log('erro ao camcelar: ', err);
  }

  async checkFolderRemote(){
    let checkFolder = await this.fTP.ls(this.ftp_remote_path)
    .then(()=>{
      return 'Folder existe';
    }).catch(()=>{
        this.fTP.mkdir(this.ftp_remote_path).then(()=>{
          return 'Folder criado.';
        });
    });

    return checkFolder;
  }
  video_create_ftp(files:String){
    this.util.showLoading('Aguarde...');
    this.recording = false;
    this.isSelecionado = false;
    this.isEnviando = false;

    var data = {
      id : this.id_code,
      bloco :8,
      token :this.token,
      files:files
    }
    console.log('dados enviados em video_create_ftp: ', data);
    let url = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/users/codes';
this.http.post(url, data, {})
.then(data => {
  this.util.loading.dismissAll();
  // this.viewCtrl.dismiss();
  console.log('status: ',data.status);
  let response = JSON.parse(data.data);
  console.log('Dados recebidos do servidor: ',response); // data received by server
  this.videos = response.midias;

})
.catch(error => {

  console.log(error.status);
  console.log(error.error); // error message as string
  console.log(error.headers);

});
  }
    //criar novo nome de arquivo
    async createNewFileName(oldFileName: string){
      let extension: string = await oldFileName.substr(oldFileName.lastIndexOf('.')); // .png, .jpg
      return new Date().getTime() + extension; // 1264546456.jpg
    }


  StartTimer(action){
    let timeout = 1000;
    if(action == 'init'){
      this.secTimer = 0;
      this.minTimer = 0;
      this.hourTimer = 0;
      this.progressTimer = 0;
    }

     if(action == 'stop'){

        console.log('pausar tempo');
        clearTimeout(this.countUp);

      }
      else if(this.progressTimer < this.maxTime){

        this.countUp = setTimeout(() => {
          let secZero: any = 0;
          let minZero: any = 0;
          let hourZero: any = 0;

          if(this.secTimer >= 9){ secZero = ''}
          if(this.minTimer >= 9){ minZero = ''}
          if(this.hourTimer >= 9){ hourZero = ''}

          if(this.secTimer == 60){

            this.secTimer = 0;
            this.minTimer = this.minTimer + 1;

          }
          if(this.minTimer == 60){

            this.minTimer = 0;
            this.hourTimer = this.hourTimer + 1;

          }


          this.progressTimer = this.progressTimer + 1;
          this.secTimer = this.secTimer + 1;
          this.timeFinal = hourZero + this.hourTimer + ':' + minZero + this.minTimer + ':' + secZero + this.secTimer;
          this.StartTimer(null);

      }, timeout);

      }else if(this.progressTimer  >= this.maxTime){

        console.log('Tempo máximo de gravação excedido');
        console.log('pausar tempo');
        clearTimeout(this.countUp);
        this.stopRecord();

      }

  }


}///final export page
