import { Chooser } from '@ionic-native/chooser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModeloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modelo',
  templateUrl: 'modelo.html',
})
export class ModeloPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chooser: Chooser
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModeloPage');
  }
  changeLogo(){
    console.log('Atualizar o logo!');
  }
  file: File;
  changeListener($event): void {
    this.file = $event.target.files[0];
    console.log(this.file);
    // this.imagesProvider.test1(this.file) // Calls test1() function in imagesProvider.ts
  }
  onClick(){

    let typeFile = 'application/pdf';

    this.chooser.getFile('application/pdf')
    .then(file => console.log(file ? file.name : 'canceled'))
    .catch((error: any) => console.error(error));

  }

}
