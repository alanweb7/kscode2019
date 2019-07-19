import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuCodePage } from './menu-code';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient} from "@angular/common/http";
import { EditorModule } from '@tinymce/tinymce-angular';
@NgModule({
  declarations: [
    MenuCodePage,
  ],
  imports: [
    EditorModule,
    IonicPageModule.forChild(MenuCodePage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ]

})
export class MenuCodePageModule {}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
