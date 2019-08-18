import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams , Slides, ModalController,  LoadingController, ToastController, AlertController, ViewController} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FormBuilder , Validators} from '../../../node_modules/@angular/forms';
import { NetworkProvider } from '../../providers/network/network';
import { CodeProvider } from './../../providers/code/code';
import { UtilService } from '../../providers/util/util.service';
import { TranslateService } from '@ngx-translate/core';
import { EditorModule } from '@tinymce/tinymce-angular';

@IonicPage({
  priority : 'low',
  segment  : 'MenuCode/:token/:code/:qtd/:pacote',
  defaultHistory:['MeusCodesPage']
})
@Component({
  selector: 'page-menu-code',
  templateUrl: 'menu-code.html',
})
export class MenuCodePage {
  @ViewChild('mySlider') slider: Slides;
  @ViewChild('myInput') myInput: ElementRef;
  token            : any;
  code             : any;
  imagens          : any;
  videos           : any[];
  vid_aux          : any;
  docs             : any;
  name             : any;
  link             : any;
  descricao        : any;
  titulo           : any;
  id_code          : any;
  qtd_img          : Number;
  package_videos       : Number;
  package_name           : String;
  word             = /[^0-9]+/g;
  tag              = /<[^>]*>/g;
  password         : String;
  isprivate        : Boolean;
  meu_link         : any;
  t_conteudo       : String;
  card             : string;
  package_imagens  :String;

  contato={
    pais           :  String,
    whatsapp       : String,
    telefone       : String,
    email          : String,
    facebook       : String,
    instagram      : String,
    linkedin       : String,
    website        : String
  }
  texto ;
  seg_1 ;
  seg_2 ;
  seg_3 ;
  menu_1 ;
  menu_2 ;
  menu_3 ;
  menu_4 ;
  button ;
  lang;
  msg_erro: any;
  editorInit: any;
  initEditor3: any;
  constructor(
              public navCtrl        : NavController,
              public modalCtrl      : ModalController ,
              public navParams      : NavParams,
              public formBuilder    : FormBuilder,
              public toast          : ToastController,
              private codeProvider  : CodeProvider,
              public loadingCtrl    : LoadingController,
              public  net           : NetworkProvider,
              public util           : UtilService,
              public  viewCtrl      : ViewController,
              public alertCtrl      : AlertController,
              private socialSharing : SocialSharing,

              private translate 	  : TranslateService
            ) {
              this.initEditor3 = {
                // selector: 'textarea',  // change this value according to your HTML
                height: 300,
                skin: "oxide",
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar: [ 'styleselect removeformat','fontsizeselect forecolor sizeselect', 'bold', 'italic', 'underline', 'link', 'bullist numlist' ],
                fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                formats: {
                  // Changes the default format for the bold button to produce a strong with data-style attribute
                  bold: { inline: 'strong', attributes: { 'data-style': 'bold' } }
                },
                style_formats: [
                  { title: 'Cabeçalho', items: [
                    { title: 'h1', block: 'h1'},
                    { title: 'h2', block: 'h2'},
                    { title: 'h3', block: 'h3'},
                    { title: 'h4', block: 'h4'},
                  ]},
                  { title: 'Parágrafos', items: [
                      { title: 'Esqueda', block: 'div', styles:{'text-align':'left'}},
                      { title: 'Centralizado', block: 'div', styles:{'text-align':'center'} },
                      { title: 'Direita', block: 'div', styles:{'text-align':'right'}},
                      { title: 'Justificado', block: 'div', styles:{'text-align':'justify'}},
                  ]},
                  { title: 'Alinhamentos & Formatos', items: [

                      { title: 'Esqueda', block: 'div', styles:{'text-align':'left'}},
                      { title: 'Centralizado', block: 'div', styles:{'text-align':'center'} },
                      { title: 'Direita', block: 'div', styles:{'text-align':'right'}},
                      { title: 'Justificado', block: 'div', styles:{'text-align':'justify'}},
                    { title: 'Negrito', inline: 'strong' },
                    { title: 'Texto Vermelho', inline: 'span', styles: { color: '#ff0000' } },
                    { title: 'Cabeçalho Vermelho', block: 'h1', styles: { color: '#ff0000' } },

                    ]}
                  // { title: 'Extras', items: [
                  //   { title: 'section', block: 'section', wrapper: true, merge_siblings: false },
                  //   { title: 'article', block: 'article', wrapper: true, merge_siblings: false },
                  //   { title: 'blockquote', block: 'blockquote', wrapper: true },
                  //   { title: 'hgroup', block: 'hgroup', wrapper: true },
                  //   { title: 'aside', block: 'aside', wrapper: true },
                  //   { title: 'Max', block: 'span', wrapper: true, classes: 'tablerow1'}
                  // ]}
                ],
                content_css: [
                  // '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                  // '//www.tiny.cloud/css/codepen.min.css'
                ],
                visualblocks_default_state: true,
                end_container_on_empty_block: true
             }; ///final editor

                  this.selectedSegment = '0';
                  //instanica do model login
                  this.model = new Link();
                  //instancia do formulario builder para validar os campos
                   this.loginForm = formBuilder.group({
                      link        : ['', Validators.required],
                      islink      : ['', Validators.required]

                    });
                    this.modelC       = new Code();
                    this.cadastroCode = formBuilder.group({
                        name    : ['', Validators.required],

                      });
                    //instanica do model login
                    this.modelG = new geral();
                    //instancia do formulario builder para validar os campos
                    this.cadastroForm = formBuilder.group({
                      titulo       : ['', Validators.required],
                      descricao    : ['', Validators.required],
                      password     : ['', Validators.required],
                      isprivate    : ['', Validators.required]
                    });
                    this.editorInit= {
                      plugins: 'print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker a11ychecker imagetools textpattern help formatpainter permanentpen pageembed tinycomments mentions linkchecker',
                      toolbar: 'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat ',
                      image_advtab: true,
                    };
  }
  modelG            : geral;
  //validação de formulario
  public cadastroForm  : any;
  public  cadastroCode : any;
  model                : Link;
  modelC               : Code;
  //validação de formulario
  public loginForm     : any;
  messageEmail         = "";
  selectedSegment      : string;
  slides               : any;
  page;
  btn_publicar;
  btn_cancelar;
  btn_excluir;
  pacote ;
  videos_;
  vencimento
  dias;
  info;
  msg_pacote;
  load_aguarde;
  load_enviando;
  msg_servidor;
  visite_code ;
  titulo_lang;
	descricao_lang	;
	senha     ;
  ativa_senha ;
  campo;
  ativar_lik;
  btn_enviar;
  campo_1 ;
  campo_2;
  texto_push;
  campo_obrigatorio;
  aviso;
  msg_aviso;
  arq_invalido;
  arq_msg;
  page_contato;
  texto_contato;
  msg_exlcuir;
  page_doc;
  slug              : String;
  ionViewDidLoad() {
    this.token            = String;
    this.code             = String;
    this.titulo           = String;
    this.descricao        = String;
    this.link             = String;
    this.videos           = [];
    this.code             = "";
    this.token            = "";
    this.link             = "";
    this.descricao        = "";
    this.titulo           = "";
    this.contato.telefone = String;
    this.package_name           = "";
    this.qtd_img          = 0;
    this.package_videos       = 0;
    this.meu_link         = String;
    this.meu_link         = "";
    this.t_conteudo       = "";
    this.package_imagens  = this.navParams.get('package_imagens');
    this.token            = this.navParams.get('token');
    this.id_code          = this.navParams.get('code');
    this.package_name     = this.navParams.get('package_name');
    this.package_imagens  = this.navParams.get('package_imagens');
    this.package_videos   = this.navParams.get('package_videos');
    this.lang             = this.navParams.get('lang');
     console.log("img",this.lang);
     this._translateLanguage();
  }
   //fazer o start do slide
   private ionViewDidEnter() {
    this.getShowCode();
    this.slider.slideTo(1);

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
      this.page             = this.translate.instant("menu_code.page");
      this.btn_cancelar     = this.translate.instant("default.btn_cancelar");
      this.msg_pacote       = this.translate.instant("default.msg_pacote");
      this.vencimento       = this.translate.instant("default.vencimento");
      this.pacote           = this.translate.instant("default.pacote");
      this.videos           = this.translate.instant("default.videos");
      this.dias             = this.translate.instant("default.dias");
      this.info             = this.translate.instant("default.info");
      this.campo_obrigatorio             = this.translate.instant("default.campo_obrigatorio");
      this.msg_servidor     = this.translate.instant("default.msg_servidor");
      this.texto            = this.translate.instant("criar_code.texto");
      this.load_enviando    = this.translate.instant("default.load_enviando");
      this.load_aguarde     = this.translate.instant("default.load_aguarde");
      this.msg_erro         = this.translate.instant("default.msg_erro");
      this.visite_code      = this.translate.instant("default.visite_code");
      this.texto            = this.translate.instant("menu_code.texto");
      this.seg_1            = this.translate.instant("menu_code.seg_1");
      this.seg_2            = this.translate.instant("menu_code.seg_2");
      this.seg_3            = this.translate.instant("menu_code.seg_3");
      this.menu_1           = this.translate.instant("menu_code.menu_1");
      this.menu_2           = this.translate.instant("menu_code.menu_2");
      this.menu_3           = this.translate.instant("menu_code.menu_3");
      this.menu_4           = this.translate.instant("menu_code.menu_4");
      this.titulo_lang      = this.translate.instant("titulo.titulo");
      this.descricao_lang   = this.translate.instant("titulo.descricao");
      this.senha            = this.translate.instant("titulo.senha");
      this.ativa_senha      = this.translate.instant("titulo.ativa_senha");
      this.campo            = this.translate.instant("link.campo");
      this.ativar_lik       = this.translate.instant("link.ativar_lik");
      this.btn_publicar     = this.translate.instant("default.btn_publicar");
      this.btn_enviar       = this.translate.instant("push.btn_enviar");
      this.campo_1          = this.translate.instant("push.campo_1");
      this.campo_2          = this.translate.instant("push.campo_2");
      this.texto_push       = this.translate.instant("push.texto");
      this.load_enviando    = this.translate.instant("default.load_enviando");
      this.aviso            = this.translate.instant("default.aviso");
      this.msg_aviso        = this.translate.instant("default.msg_aviso");
      this.arq_invalido    = this.translate.instant("default.arq_invalido");
      this.arq_msg         = this.translate.instant("default.arq_msg");
      this.msg_exlcuir     = this.translate.instant("default.msg_exlcuir");
      this.page_doc        = this.translate.instant("default.page_doc");
      this.btn_excluir        = this.translate.instant("default.btn_excluir");
   }, 250);
}
   resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
   }
   //trocar o slide de acordo com o segment
   onSegmentChanged(segmentButton) {
    const selectedIndex = segmentButton.value;
    this.slider.slideTo(selectedIndex);
   }
  //trocar a o segment de acordo com o slide
  onSlideChanged(slider) {
    const currentSlide = slider.getActiveIndex();
    if(currentSlide == 0){
      this.selectedSegment = '0';
    }else if(currentSlide == 1){
        this.selectedSegment = '1';
    }else if(currentSlide == 2){
      this.selectedSegment = '2';
    }

  }

  getShowCode(){

              // this.util.showLoading(this.load_aguarde);
              this.codeProvider.getShowCode(this.id_code)
              .subscribe(
                    (result: any) =>{
                      this.util.loading.dismissAll();
                      console.log("result em menu-code.ts: ",result);
                      if(result.status == 200){
                            //popula todas a variaveis
                            this.titulo               = result.data[0]['titulo'];
                            this.modelG.titulo        = this.titulo;
                            this.code                 = result.data[0]['code'];
                            this.modelC.name          = this.code;
                            this.link                 = result.data[0]['link'];
                            this.slug                 = result.data[0]['slug'];

                            if(result.data[0]['t_conteudo'] == "2"){
                              this.model.isLink = "true";
                               this.meu_link ="2";
                            }else{
                              this.model.isLink = "false";
                              this.meu_link ="1";
                            }
                            this.model.link           = this.link;
                            this.descricao            = result.data[0]['descricao'];
                            this.modelG.descricao     = this.descricao;
                            this.contato.pais         = result.data[0]['pais'];
                            this.contato.email        = result.data[0]['email'];
                            this.contato.website      = result.data[0]['website'];
                            this.contato.facebook     = result.data[0]['facebookUser'];
                            this.contato.instagram    = result.data[0]['instagramUser'];
                            this.contato.linkedin     = result.data[0]['linkedin'];
                            this.vid_aux              = result.data[0]['album_vimeo'];
                            this.docs                 = result.data[0]['documento'];
                            this.imagens              = result.data[0]['galeria'];
                            this.modelG.isprivate     = result.data[0]['isprivate'];
                            this.modelG.password      = result.data[0]['password'];
                            this.t_conteudo           = result.data[0]['t_conteudo'];
                            this.card                 = result.data[0]['card'];
                            this.slug                 = result.data[0]['slug'];
                            //retirar a mascara do telefone
                            if(result.data[0]['tel_contato'] != ""){
                                   var str                = result.data[0]['tel_contato'];
                                   this.contato.telefone  = str.replace(this.word,'');
                              }else{
                                this.contato.telefone=null;
                              }
                            //retirando a máscara do telefone
                            if(result.data[0]['tel_whatsapp']!= ""){
                                var newstr                = result.data[0]['tel_whatsapp'];
                                this.contato.whatsapp     = newstr.replace(this.word,'');

                            }else{
                              this.contato.whatsapp  = null;
                            }

                      }else{
                        this.toast.create({ message:this.msg_erro, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();

                      }

              } ,(error:any) => {
                this.toast.create({ message:this.msg_servidor, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                this.util.loading.dismissAll();
                this.navCtrl.setRoot('HomePage');
              });


  }
  showPromptPush(codeNumber) {
    this.navCtrl.push('NotificacaoPushPage',{codeNumber:codeNumber,lang:this.lang,token:this.token,texto_push:this.texto_push,campo_1:this.campo_1,campo_2:this.campo_2,btn_enviar:this.btn_enviar,btn_cancelar:this.btn_cancelar,msg_servidor:this.msg_servidor,load_aguarde:this.load_aguarde,campo_obrigatorio:this.campo_obrigatorio});

}

  ShowContato(){
    let myModal =this.modalCtrl.create('ContatoListPage',{contato:this.contato,token:this.token,code_id:this.id_code ,lang:this.lang});
    myModal.present();
    //this.navCtrl.push('ContatoListPage', {contato:this.contato,token:this.token,code_id:this.id_code });
  }
  ShowContato2(){
    this.navCtrl.push('ContatoCodePage', {contato:this.contato,token:this.token,code_id:this.id_code,lang:this.lang });
  }

  ShowCam(){
    this.navCtrl.push('ImageCodePage',{imagens:this.imagens,token:this.token,code:this.id_code,package_imagens:this.package_imagens,package_name:this.package_name,lang:this.lang});

  }
  ShowDoc(){
    this.navCtrl.push('DocumentoCodePage',{docs:this.docs,token:this.token,code:this.id_code,load_aguarde:this.load_aguarde,btn_cancelar:this.btn_cancelar,btn_excluir:this.btn_excluir,btn_publicar:this.btn_publicar,page:this.page_doc,msg_exlcuir:this.msg_exlcuir,load_enviando:this.load_enviando,msg_servidor:this.msg_servidor,aviso:this.aviso,arq_msg:this.arq_msg,arq_invalido:this.arq_invalido,lang:this.lang});

  }
  ShowVideo(action){
    ///escolhe pra onde direcionar
    let page: string;
    if(action == 'video'){
      page = 'VideoListPage';
    }else{
      page = 'AudioListPage';
    }

    this.navCtrl.push(page,{videos:this.vid_aux,token:this.token,code:this.id_code,package_videos:this.package_videos,package_name:this.package_name,package_imagens:this.package_imagens,lang:this.lang});

  }
  // "Edição do code,titulo,descrição,link,t_conteudo",
  editCode(){

      this.util.showLoading(this.load_aguarde);
      this.codeProvider.code_Edit(this.token,this.id_code,this.modelC.name,this.modelG.titulo,this.modelG.descricao,this.model.link,this.meu_link,this.modelG.password,this.modelG.isprivate)
      .subscribe(
            (result: any) =>{
              this.util.loading.dismissAll();
              if(result.status == 200){
                this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'sucesso'  }).present();

              }else if(result.status == 403){
                this.toast.create({ message: result.message, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                this.navCtrl.setRoot('LoginPage',{lang:this.lang});
              }

            }
              ,(error:any) => {
                this.toast.create({ message:this.msg_servidor, position: 'botton', duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
                this.util.loading.dismissAll();
                this.navCtrl.setRoot('HomePage');
        });


  }
  change_segmento(item) {

    this.model.isLink =item;
    if(this.model.isLink){

       this.meu_link ="2";
    }else{

      this.meu_link ="1";
    }


  }
  change_senha(item) {

    this.modelG.isprivate =item;

  }
  // compartilhar social share
shareSheetShare() {
  this.card = this.imagens[0].img_link;
  console.log('link do card: ',this.card,this.slug);
  this.socialSharing.share(this.visite_code+"->", "Share subject", this.card, "https://kscode.com.br/card?code="+this.slug).then(() => {
    console.log("shareSheetShare: Success");
  }).catch(() => {
    console.error("shareSheetShare: failed");
  });

}

}
export class Link{
  link     :  String;
  isLink   : String;
}
export class geral{
  titulo     :  String;
  descricao  : String;
  password   : String;
  isprivate  : Boolean;


}
export class Code{
   name : String;
}
