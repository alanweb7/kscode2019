import { UtilService } from './../../providers/util/util.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RedirectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-redirect',
  templateUrl: 'redirect.html',
})
export class RedirectPage {
  public sendData:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: UtilService,
    ) {
      this.sendData = this.navParams.get('data');
      console.log('dados recebidos em redirect page: ', this.sendData)
      this.pushPage();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedirectPage');
  }
  pushPage(){


    this.util.showLoading('Aguarde...');
    this.navCtrl.push('DetalheCodePage', this.sendData);
        // this.navCtrl.push('DetalheCodePage', {data:sendData});


    // this.util.showLoading('Aguarde...');
    // this.networkProvider.verifyConn().then((res)=>{
    //   this.util.loading.dismissAll();
    //   this.statusConn = res.status;
    //   console.log('Return :::',res.status);
    //   if(this.statusConn === -3){
    //     this.netFail();
    //   }else{
    //     let latitude = this.endLat;
    //     let longitude = this.endLong;
    //     console.log('home codes com gps');
    //     this.navCtrl.push('DetalheCodePage', {liberado :false,origem:1,token:this.token,lang:this.language,
    //         code: this.codeNumber,
    //         latitude: latitude, longitude: longitude,
    //         telephone: this.global.myGlobalVar
    //     });

    //   }
    // });
  }

}
