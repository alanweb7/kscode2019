import { HTTP } from '@ionic-native/http';
import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';


export enum ConnectionStatusEnum {
  Online,
  Offline
}

@Injectable()
export class NetworkProvider {
  previousStatus; //metodo 2
   isConnection : boolean;
  constructor(
    public network: Network,
    public eventCtrl: Events,
    public http : HTTP
    ) {

    //metodo 2
    console.log('Hello NetworkProvider Provider');

    this.previousStatus = ConnectionStatusEnum.Online;

  }

  ckeckNetwork(){
     this.network.onConnect().subscribe(()=>{
      return true;
      });
     this.network.onDisconnect().subscribe(()=>{
       return false;
     });
  }


      public initializeNetworkEvents(): void{
          this.network.onDisconnect().subscribe(() => {
              if (this.previousStatus === ConnectionStatusEnum.Online) {
                  this.eventCtrl.publish('network:offline');
              }
              this.previousStatus = ConnectionStatusEnum.Offline;

          });
          this.network.onConnect().subscribe(() => {
              if (this.previousStatus === ConnectionStatusEnum.Offline) {
                  this.eventCtrl.publish('network:online');
              }
              this.previousStatus = ConnectionStatusEnum.Online;

          });
      }

      public verifyConn(){

        let url = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/app/check-serv';
        let checkConn = this.http.get(url, {}, {}).then().catch((data)=>{
            return data;
        });
            return checkConn;

      }

}
