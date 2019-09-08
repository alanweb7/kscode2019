import { Code } from './../menu-code/menu-code';
import { ModalDetailPage } from './../modal-detail/modal-detail';
import { Component } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams, LoadingController, Slides, ToastController, ViewController, ModalController, AlertController, Platform } from 'ionic-angular';
import { CodeProvider } from './../../providers/code/code';
import { ViewChild } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { BrowserTab } from '@ionic-native/browser-tab';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { NetworkProvider } from '../../providers/network/network';
import { HistoricoService } from '../../providers/historico/historico.service';
import { UtilService } from '../../providers/util/util.service';
import { CallNumber } from '@ionic-native/call-number';
//Import Model
import { Historico } from './../../models/historico.model';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from '../../providers/movie/usuario.service';
import { EditorModule } from '@tinymce/tinymce-angular';


@IonicPage({
  priority : 'low',
  segment  : 'DetalheCode/:info/:liberado:/origem:/token/:btn_continuar/:btn_cancelar/:load_aguarde/:msg_servidor/:code_existe/:lang',
  defaultHistory:['HomePage'],

})
@Component({
  selector: 'page-detalhe-code',
  templateUrl: 'detalhe-code.html',
})
export class DetalheCodePage {
  @ViewChild(Navbar) navBar: Navbar;
  editorInit:any;
  galeria           : any[];
  album_vimeo       : any[];
  videoColection       : any[];
  audio_colection   : any[];
  titulo            : String;
  descricao         : String;
  c_email           : String;
  website           : String;
  facebookUser      : String;
  instagramUser     : String;
  nome_documento    : String;
  documento         : any[];
  tel_whatsapp      : String;
  tel_contato       : String;
  pais              : String;
  page              : String;
  info              : any;
  TagRegCode        : any;
  persistentData        : any;
  trustedVideoUrl   : SafeResourceUrl;
  video_found       : any = false;
  calling_code      : String;
  password          : String;
  isprivate         : Boolean;
  isLiberado        : Boolean;
  video_post_status : String;
  origem            : Number;
  video_link        : String;
  audio_link        : String;
  ask_info          : String;
  option1           : String;
  option2           : String;
  label1            : String;
  label2            : String;
  currentSlide: number = 0;
  totalSlides: number;
  disableNext: boolean = false;
  disablePrev: boolean = true;
  infoLegendSlides:string;

  @ViewChild('slider') slides: Slides;
  token         : String;
  mostra        : Boolean;
  ask_id        : String;
  code_id       : String;
  facebook      : any[];
  instagram     : any[];
  whatsapp      : any[];
  fone          : any[];
  email         : any[];
  linkedin      : any[];
  site          : any[];
  whats         : any[];
  word          = /[^0-9]+/g;
  linked        : String;
  video         : HTMLElement = document.getElementById('myVideo');
  load_aguarde  : any;
  msg_erro      : any;
  lang          : any;
  selecione     : any;
  btn_cancelar  : any;
  btn_continuar : any;
  code_existe   : any;
  vews            ;
  telephone     : any;
  latitude      : any;
  longitude     : any;
  btn_fechar    : string;
  btn_ircode    : string;
  msg_code      : any;
  msg_link      : string;
  sim           : any;
  nao           : any;
  initModeUser: any;
  audiolinkUrl: string;
  audioContent: boolean;
  alertModal: any;
  public logo_header:string;

  constructor(
              public navCtrl         : NavController,
              public viewCtrl        : ViewController,
              public navParams       : NavParams,
              private codeProvider   : CodeProvider,
              private browserTab     : BrowserTab,
              public toast           : ToastController,
              public loadingCtrl     : LoadingController,
              private domSanitizer   : DomSanitizer,
              private photoViewer    : PhotoViewer,
              public  net            : NetworkProvider,
              private historico      : HistoricoService,
              private oneSignal      : OneSignal,
              private emailComposer  : EmailComposer,
              public util            : UtilService,
              public modalCtrl       : ModalController,
              private usuario        : UsuarioService,
              public alertCtrl       : AlertController,
               private nativeStorage : Storage,
               private callNumber    : CallNumber,
               private translate 	   : TranslateService,
               private platform: Platform,




            ) {

              this.setLanguage();
              this.getInitialconfig();
              this.audioContent = true;
              this.audiolinkUrl = 'http://soundbible.com/grab.php?id=2196&type=mp3';
              this.initModeUser = {
                // selector: '#meu-editor',
                menubar: false,
                inline: true,
                toolbar: false,
                readonly: true,
              }

                // this.platform.backButton.subscribe(async () => {

                //     let view = this.navCtrl.getActive();
                //     console.log('Let view:::: ', view);
                //     // Checks if can go back before show up the alert
                //     if(view.name === 'DetalheCodePage') {

                //         this.util.loading.dismissAll();
                //         console.log('Dismissed alert');
                //         this.alertModal.dismiss();
                //         console.log('botão voltar');

                //     }else{
                //       this.navCtrl.setRoot('HomePage');
                //     }

                // });

            }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.navCtrl.setRoot('HomePage');

     }

  }
  //iniciacao da tradução
  private _translateLanguage() : void
  {
     this.translate.use(this.lang);

     this._initialiseTranslation();
  }
  //traducao
  private _initialiseTranslation() : void
  {
     setTimeout(() =>
     {


        this.load_aguarde           = this.translate.instant("default.load_aguarde");
        this.msg_erro               = this.translate.instant("default.msg_erro");
        this.selecione              = this.translate.instant("videos.selecione");
        this.btn_cancelar           = this.translate.instant("default.btn_cancelar");
        this.btn_continuar          = this.translate.instant("default.btn_continuar");
        this.code_existe            = this.translate.instant("home.code_existe");
        this.btn_ircode             = this.translate.instant("default.btn_ircode");
        this.btn_fechar             = this.translate.instant("default.btn_fechar");
        this.msg_code               = this.translate.instant("default.msg_code");
        this.msg_link               = this.translate.instant("default.msg_link");
        this.sim                    = this.translate.instant("default.sim");
        this.nao                    = this.translate.instant("default.nao");


     }, 250);
  }
  async presentAlertPrompt(message) {
    // this.alertModal = true;
    if (!message){
      message = '<strong>Área restrita:</strong> Digite a senha.';
    }

    const myModal = await this.alertCtrl.create({
      subTitle: message,
      inputs: [
        {
          name: 'password',
          type: 'text',
          placeholder: 'Digite uma senha'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            let infoData = {
              'action': 'cancel',
            };
            this.validatePass(infoData);
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Validar Senha',
          handler: (data) => {
            let infoData = {
              'action': 'validate',
              'data':data
            };
            this.validatePass(infoData);
            console.log('Confirm Ok', infoData);
          }
        }
      ],
      enableBackdropDismiss:false
    });

    this.alertModal = myModal;

    await myModal.present();
  }

    validatePass(info:any){
      // this.util.showLoading('Aguarde...');
      console.log(info);

      let action = info.action;

      switch (action) {
        case 'validate':
          this.util.showLoading('Aguarde...');
          let password = info.data.password;
          let codeID:any = this.code_id;

          console.log('codeID na funcao do validate Pass: ', codeID);

            this.codeProvider.getCodePassword(password,codeID,'pt')
            .subscribe(
               (result: any) =>{
                 console.log('Dados retornados da senha: ', result);

                 if(result.status == 200){


                  this.continueLoad(this.persistentData);


                 }else{

                  let message = 'Erro de senha. Tente novamente...';
                  this.presentAlertPrompt(message);

                 }

                 });

          break;
        case 'cancel':

            this.navCtrl.setRoot('HomePage',{data:'cancel'});
            this.util.loading.dismissAll();

          break;

        default:
          break;
      }

    }


  async getCode(){
    this.util.showLoading('Aguarde..');

          this.codeProvider.getAll(this.page,this.telephone,this.latitude,this.longitude)
          .then(async ( res: any) =>{
            this.util.loading.dismissAll();
            console.log('Data total no getCode: ', res);

            this.persistentData = res;

            this.code_id          = res.data[0].id;
            this.code_id          = res.data[0].id;

           if(res.data[0]['isprivate'] == true){
              this.presentAlertPrompt(null);
            }else{


              this.continueLoad(res);

            }

          }).catch((res)=>{
            this.util.loading.dismissAll();
            console.log('Entrou no cath do detail code: ',res);

          }),(error) => {
            console.log('Entrou no error detail code 382:: ',error);

            this.toast.create({ message: this.msg_erro, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
            this.util.loading.dismissAll();
            this.navCtrl.setRoot('HomePage');

          };

    }


          async continueLoad(res){

            this.page = null;

                    let result: any = res;
                    if( result.status === 200){
                      this.util.loading.dismissAll();
                      console.log('result total: ', result);

                      this.myIdOnesignal();
                    // if( this.isLiberado == true &&  result.data[0].t_conteudo == "1"  && result.data[0]['isprivate'] == true){
                    // }
                     //code senha é um link
                     if( result.data[0].t_conteudo == "2"){
                    //  else if( result.data[0].t_conteudo == "2"){
                    //  else if( this.isLiberado == true &&  result.data[0].t_conteudo == "2"){
                    //  await this.util.loading.dismissAll();
                     await this.openWithInAppBrowser(result.data[0].link);

                     await this.navCtrl.setRoot('HomePage', {modalIsOpen:true});

                       return;

                        // this.viewCtrl.dismiss();

                      }
                      //conde com senha
                      // else if(this.isLiberado == false && result.data[0]['isprivate'] == true && result.data[0].t_conteudo == "1"){
                      //         this.navCtrl.setRoot('CodeSenhaPage',{lang:this.lang,origem:1,id_code:result.data[0].id,link:null,code: this.page,latitude:this.latitude,longitude:this.longitude,telephone:this.telephone
                      //       });
                      // }
                      // code com senha e é um link
                      // else if(this.isLiberado == false && result.data[0]['isprivate'] == true && result.data[0].t_conteudo == "2"){
                      //   this.navCtrl.setRoot('CodeSenhaPage',{lang:this.lang,id_code:result.data[0].id,link:result.data[0].link,code: this.page,latitude:this.latitude,longitude:this.longitude,telephone:this.telephone
                      //   });
                      // }
                      // code é um link
                      // else if(this.isLiberado == false &&  result.data[0].t_conteudo == "2" && result.data[0]['isprivate'] == false){
                      //   this.openWithInAppBrowser(result.data[0].link);
                      //   this.util.loading.dismissAll();
                      //   // this.viewCtrl.dismiss();

                      // }
                     if(result.data[0]['galeria'].length > 0){
                      this.createORupdateHistorico(result.data[0].id,result.data[0].code,result.data[0].titulo,result.data[0]['galeria'][0].img_link,result.data[0].card);

                    }
                     //testa se meu retorno da API é vazio
                     this.titulo           = result.data[0]['titulo'];
                     this.descricao        = result.data[0]['descricao'];

                     this.nome_documento   = result.data[0]['nome_documento'];
                    // this.documento        = result.data[0]['documento'];
                     this.pais             = result.data[0]['pais'];
                     this.isprivate        = result.data[0]['isprivate'];
                     this.TagRegCode       = result.data[0]['code'];
                     this.ask_id           = result.data[0]['ask_code']['ask_id'];
                     this.code_id          = result.data[0].id;
                     this.ask_info         = result.data[0]['ask_code']['ask_info'];
                     this.option1          = result.data[0]['ask_code']['ask_results']['option1'];
                     this.option2          = result.data[0]['ask_code']['ask_results']['option2'];
                     this.label1           = result.data[0]['ask_code']['ask_results']['label1'];
                     this.label2           = result.data[0]['ask_code']['ask_results']['label2'];
                     ///inserindo os array de contatos
                     this.whatsapp         = result.data[0]['code_sectors']['whatsapp'];
                     this.facebook         = result.data[0]['code_sectors']['facebook'];
                     this.instagram        = result.data[0]['code_sectors']['instagram'];
                     this.fone             = result.data[0]['code_sectors']['telefone'];
                     this.email            = result.data[0]['code_sectors']['email'];
                     this.linkedin         = result.data[0]['code_sectors']['linkedin'];
                     this.site             = result.data[0]['code_sectors']['site'];
                     this.vews             = result.data[0]['vews'];
                    //tratamento do contatos preenchendo os arrays
                     if(this.whatsapp.length > 0){
                      this.tel_whatsapp     = this.whatsapp[0].conteudo;
                      this.calling_code     = this.whatsapp[0].calling_code;
                     }
                     if(this.fone.length > 0){
                      this.tel_contato      = this.fone[0].conteudo;

                     }
                     if(this.email.length > 0){
                      this.c_email          = this.email[0].conteudo;
                     }
                     if(this.site.length > 0){
                      this.website          = this.site[0].conteudo;
                     }
                     if(this.facebook.length > 0){
                      this.facebookUser     = this.facebook[0].conteudo;
                     }
                     if(this.instagram.length > 0){
                      this.instagramUser    = this.instagram[0].conteudo;
                     }
                     if(this.linkedin.length > 0){
                      this.linked          = this.linkedin [0].conteudo;
                     }
                     //cria o local storage para id da enquete
                     if(this.ask_id != "" && this.ask_id != null){
                       let item=this.ask_id+"-"+this.code_id;
                       this.nativeStorage.set(item,0);
                     }
                     //popula imagem

                     this.video_found      = true;
                     if(result.data[0]['galeria'].length > 0){
                          for (var i = 0; i < result.data[0]['galeria'].length; i++) {
                            var gal = result.data[0]['galeria'][i];

                            this.galeria.push(gal);

                          }

                          this.logo_header = this.galeria[0].img_link;
                          console.log('Imagens da header: ', this.logo_header);

                     }
                     //popula documento
                     if(result.data[0]['documento'].length > 0){
                        for (var i = 0; i < result.data[0]['documento'].length; i++) {
                          var doc = result.data[0]['documento'][i];
                          this.documento.push(doc);

                        }
                    }

                     //popula video
                     if(result.data[0]['album_vimeo'].length > 0){
                       console.log('video colection: ', result.data[0]['album_vimeo']);
                       this.videoColection = result.data[0]['album_vimeo'];
                          for (var i = 0; i < result.data[0]['album_vimeo'].length; i++) {
                              let vid =  result.data[0]['album_vimeo'][i];
                              let img = vid.video_pictures.replace('?r=pad','');
                              vid.video_pictures = img;
                              if(vid.post_status == "complete"){
                                  vid.video_link = this.domSanitizer.bypassSecurityTrustResourceUrl(vid.video_link);

                              }
                                this.album_vimeo.push(vid);
                                if(i== 0){
                                  this.video_link        = vid.video_link;
                                  this.mostra            = true;
                                  this.video_post_status = vid.post_status;
                                }


                              }
                    }

                    console.log('Galaeria de videos: ', this.album_vimeo);
                    this.totalSlides = this.album_vimeo.length;
                    this.infoLegendSlides = '1/'+this.totalSlides;
                    this.currentSlide = 0;
                     //popula audio
                     if(result.data[0]['audio_colection'].length > 0){
                          this.audioContent = true;
                          this.audio_colection = result.data[0]['audio_colection'];

                    }
                }else{
                          this.util.loading.dismissAll();
                          this.navCtrl.setRoot('HomePage',{'error':result});
                 }





  }

   selectTipo(tipo){
    if(tipo == 0){
      this.showCheckbox(tipo,this.whatsapp);
   }else if(tipo == 1){
    this.showCheckbox(tipo,this.fone);
   }else if(tipo == 2){
    this.showCheckbox(tipo,this.email);
   }
   else if(tipo == 3){
    this.showCheckbox(tipo,this.site);
   }
   else if(tipo == 4){
    this.showCheckbox(tipo,this.facebook);
   }
   else if(tipo == 5){
    this.showCheckbox(tipo,this.instagram);
   }else if(tipo == 6){
    this.showCheckbox(tipo,this.linkedin);
   }
  }
  selectTipo2(tipo){
    if(tipo == 0){
      this.openWithInAppBrowser(this.whatsapp);
   }else if(tipo == 1){
    this.openWithInAppBrowser(this.fone);
   }else if(tipo == 2){
    this.openWithInAppBrowser(this.email);
   }
   else if(tipo == 3){
    this.openWithInAppBrowser(this.site);
   }
   else if(tipo == 4){
    this.openWithInAppBrowser(this.facebook);
   }
   else if(tipo == 5){
    this.openWithInAppBrowser(this.instagram);
   }else if(tipo == 6){
    this.openWithInAppBrowser(this.linkedin);
   }
  }
  showCheckbox(tp,tipo) {
   let alert = this.alertCtrl.create();
   alert.setTitle(this.selecione);
     for (var i = 0; i < tipo.length; i++) {
        alert.addInput({
          type: 'radio',
          label:tipo[i].titulo,
          value: tipo[i].conteudo,
          checked: false
        });
      }

      alert.addButton(this.btn_cancelar);
      alert.addButton({
        text: this.btn_continuar,

      handler: data => {

       if(tp == 1){
        data = data.replace(this.word,'');
        //url = "tel:"+tipo;

          this.callNumber.callNumber(data, false)
          .then(res => console.log('Launched dialer!', res))
          .catch(err => console.log('Error launching dialer', err));
       }else{
        this.openWithInAppBrowser2(tp,data);

       }

      }
    });
    alert.present();
 }
  filterItems(searchTerm){
    return this.whatsapp.filter((item) => {
        return item.conteudo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }
  setFilteredItems(data) {
    this.whats = this.filterItems(data);


    this.calling_code = this.whats[0].calling_code.replace("+",'');
    console.log(this.whats[0]);

  }

  handleIFrameLoadEvent(): void {

  }
  viewPhoto(img){
    this.photoViewer.show(img);
  }
  mostraEnquete(){
    let myModal =this.modalCtrl.create('EnqueteVotarPage',{ask_id:this.ask_id,code_id:this.code_id});
    myModal.present();
  }
  resultEnq(){

    let myModal =this.modalCtrl.create('EnqueteGraphPage',{ask_id:this.ask_id,code_id:this.code_id,question:this.ask_info,option1:this.option1,option2:this.option2,label1:this.label1,label2:this.label2});
    myModal.present();
  }
 createORupdateHistorico(id,code,titulo,img,card){
    let contextHist: Historico;
                    //grava o historico
                    this.historico.getById(id)
                    .then((existe: Number) => {
                      if (existe < 0) {
                            contextHist = new Historico(id,code,titulo,img,card);
                            //grava historico no banco de dados local
                            this.historico.create(contextHist)
                              .then((data: any) => {});
                      }else{
                               //grava historico no banco de dados local
                              this.historico.update(titulo,img,code,card,id)
                                   .then((data: any) => {});
                      }

                    });
  }
 openWithInAppBrowser(url){
  console.log('abrir link: ', url);
   this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        this.browserTab.openUrl(url);
      }
    }).catch(erro=>{
      this.toast.create({ message: 'A informação está incorreta', position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'alerta'  }).present();

    });
  }

   // redirect push enter
   showLink(notificationCode){
    const confirm              = this.alertCtrl.create({
      title: this.msg_link,
      message: "",
      buttons: [
        {
          text: this.nao,
          handler: () => {

          }
        },
        {
          text: this.sim,
          handler: () => {
            //this.viewCtrl.dismiss();

            this.openWithInAppBrowser(notificationCode);
          }
        }
      ]
    });
    confirm.present();
  }
   showImageLink(data){
    console.log('Dados recebidos na nova função do link da imagem:: ',data);
    let msgAction;
    switch(data.action){
      case '1':
          msgAction = 'Deseja acessar este endereço?';
      break;
      case '2':
          msgAction = 'Você deseja enviar mensagem (whatsapp)?';
      break;
      case '3':
          msgAction = 'Você deseja fazer ligação para este anúncio?';
      break;

    }
    const confirm  = this.alertCtrl.create({
      title: msgAction,
      message: "",
      buttons: [
        {
          text: this.nao,
          handler: () => {

          }
        },
        {
          text: this.sim,
          handler: () => {
            //this.viewCtrl.dismiss();
            console.log('Dados recebidos na função ::: ',data);
            this.redirectLinkImage(data);
          }
        }
      ]
    });
    confirm.present();
  }

  redirectLinkImage(data){
    console.log('Dados recebidos na função redirectLinkImage::: ',data);
    console.log('Codigo do pais na função redirectLinkImage::: ',this.calling_code);
    let getAction = data.action;
      /** 1 = link, 2 = whatsapp, 3 = telefone */
      switch (getAction ){
        case '1':
            console.log('Case 1 em redirectLinkImage');
            this.openWithInAppBrowser(data.link);
        break;
        case '2':
            console.log('Case 2 em redirectLinkImage');
            let CodeCountri:any = '55';
            if(this.calling_code != ''){
              CodeCountri = this.calling_code.replace('+', '');
            }
            let direction  = 'http://api.whatsapp.com/send?1=pt_BR&phone='+ CodeCountri + data.link;
            console.log('direction função redirectLinkImage::: ',direction );
            this.openWithInAppBrowser(direction);
        break;
        case '3':
            console.log('Case 3 em redirectLinkImage');
          // call number
          this.callNumber.callNumber(data.link, true)
          .then(res => console.log('Launched dialer!', res))
          .catch(err => console.log('Error launching dialer', err));
        break;
      }

  }

 openWithInAppBrowser2(tp,tipo){
   let url ;
   if(tp == 0){
     this.setFilteredItems(tipo);
     tipo = tipo.replace(this.word,'');
     url = "http://api.whatsapp.com/send?1=pt_BR&phone="+this.calling_code+tipo;

   }
 if(tp == 2){
    url ="mailto:"+tipo;
    this.SetEmail(tipo);
  }
  else if(tp == 3){
    url =tipo;
  }
  else if(tp == 4){
    url =tipo;
  }
  else if(tp == 5){
    url =tipo;
  }else if(tp == 6){
    url =tipo;
  }
   this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        console.log(url);
        this.browserTab.openUrl(url).then(result=>{
          console.log(result);
        }).catch(erro=>{
          console.log(erro);
          this.toast.create({ message: 'A informação está incorreta', position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'alerta'  }).present();

        });
      }
    })
  }
  SetEmail(Setemail){
    let email = {
      to: Setemail,
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);

  }

myIdOnesignal(){
  this.oneSignal.startInit('d9687a3a-3df5-4565-b183-653e84ed8207', '8700496258');


  this.oneSignal.endInit();
  this.oneSignal.getIds().then((id) => {

// registrando tags
this.info   = this.navParams.get('info');
var tagCode = this.TagRegCode;

var dataTag = '{"'+tagCode+'":"true"}';
var Tagcode = JSON.parse(dataTag);



this.oneSignal.sendTags(Tagcode);

// alert.present();


  });


}
 selectVideo(video_link,status){
  this.video_link        = video_link;
  this.mostra            = true;
  this.video_post_status = status;

 }

 controlSlide(action){

  if(action === 'up'){
      this.currentSlide++;
    }else{
      this.currentSlide--;
    }

    let indice = this.currentSlide + 1;

    if((this.currentSlide + 1) === this.totalSlides ){
      this.disableNext = true;
    }else{
      this.disableNext = false;
    }

    if(this.currentSlide  === 0){
      this.disablePrev = true;
      indice = 1;
    }else{
      this.disablePrev = false;
    }

    this.infoLegendSlides = indice +'/'+this.totalSlides;
    this.video_link = this.album_vimeo[this.currentSlide].video_link;
 }

  slideNext(){
    this.slides.slideNext();

  }

  slidePrev(){
    this.slides.slidePrev();
  }

  getModalAds() {
    let option = {
      showBackdrop: true,
    };
    let profileModal = this.modalCtrl.create(ModalDetailPage, {}, option);
    profileModal.present();

    profileModal.onDidDismiss(data => {
      console.log(data);
    });
  }

  setLanguage(){
      this.platform.ready().then(()=>{
                if(this.lang == undefined || this.lang == "" || this.lang == null){
                    //CHAMDA DO BANCO DE DADOS
                      this.usuario.getAll()
                      .then((movies:any) => {
                        console.log(movies);
                        if(movies.length == 1){
                              this.lang       = movies[0].cpf;

                              if(this.lang ==  "" || this.lang == undefined || this.lang == null){
                                    this.lang = "pt";
                              }
                              this._translateLanguage();
                        }
                        else{
                          this.lang= "pt";
                          this._translateLanguage();
                        }
                        }).catch((error)=>{

                          this.lang= "pt";
                          this._translateLanguage();
                    });
                  }else{
                    this._translateLanguage();
                  }
        });
  }
  getInitialconfig(){

    this.album_vimeo   = [];
    this.galeria       = [];
    this.documento     = [];
    this.facebook      = [];
    this.instagram     = [];
    this.whatsapp      = [];
    this.fone          = [];
    this.email         = [];
    this.linkedin      = [];
    this.site          = [];
    this.whats         = [];
    this.page          = this.navParams.get('code');
    this.telephone     = this.navParams.get('telephone');
    this.latitude      = this.navParams.get('latitude');
    this.longitude     = this.navParams.get('longitude');
    this.isLiberado    = this.navParams.get('liberado');
    this.origem        = this.navParams.get('origem');
    this.token         = this.navParams.get('token');
    this.lang          = this.navParams.get('lang');

    this.mostra        = false;
    this.historico.getAll().then((movies:any) => {});



         if(this.page != "" && this.page != undefined && this.page != "[object%20Object]"){
          this.getCode();
         }
        //  else{
        //     this.util.loading.dismissAll();
        //     this.viewCtrl.dismiss();
        //  }


  }



}
