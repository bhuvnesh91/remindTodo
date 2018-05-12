import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts } from '@ionic-native/contacts';
import { IonicStorageModule } from '@ionic/storage';
import { Reminder } from '../modal/reminder/reminder';
import { UpsertReminder } from '../popover/upsertReminder/upsertReminder';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Toast } from '@ionic-native/toast';
import { ContactUtil } from '../util/contactUtil';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Reminder,
    UpsertReminder,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Reminder,
    UpsertReminder,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Contacts,
    AndroidPermissions,
    Toast,
    ContactUtil,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
