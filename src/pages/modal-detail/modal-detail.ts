import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-detail',
  templateUrl: 'modal-detail.html',
})
export class ModalDetailPage {

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetailPage');
  }

  onCloseModal(){
          // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      this.viewCtrl.dismiss({
        'dismissed': true
      });
  }

}
