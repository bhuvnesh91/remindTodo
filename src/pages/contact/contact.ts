import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Contacts, ContactFindOptions, Contact } from '@ionic-native/contacts';
import { ModalController } from 'ionic-angular';
import { Reminder } from '../../modal/reminder/reminder';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Toast } from '@ionic-native/toast';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contactlist: any[];

  constructor(
    private platform: Platform,
    private contacts: Contacts,
    private modalCtrl: ModalController,
    private androidPermissions: AndroidPermissions,
    private toast: Toast,
    private storage: Storage) {

    this.platform.ready().then(() => {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(
        result => {
          console.log('Has permission?', result.hasPermission);
          if (!result.hasPermission)
            this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_PHONE_STATE]);
        },
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)
      );

      window["PhoneCallTrap"].onCall((state) => {
        console.log("CHANGE STATE: " + state);

        switch (state.state) {
          case "RINGING":
            this.searchContact(state.number).then((contact: Contact[]) => {
              if (contact && contact.length > 0) {
                this.storage.get('remindTodo').then((_reminders) => {
                  if (_reminders == null) {
                    _reminders = {};
                    this.storage.set('remindTodo', {});
                  }
                  let existingReminders = _reminders[contact[0].id];
                  existingReminders ? this.toast.show(existingReminders[0].text, '15000', 'top').subscribe(
                    toast => {
                      console.log(toast);
                    }
                  ) : '';
                })
              }
            });
            break;
          case "OFFHOOK":
            console.log("Phone is off-hook");
            break;

          case "IDLE":
            console.log("Phone is idle");
            break;
        }
      });
    })
  }

  findfn(ev: any) {
    this.searchContact(ev.target.value).then((contacts) => {
      this.contactlist = contacts;
      console.info(JSON.stringify(contacts));
      if (this.contactlist.length == 0)
        this.contactlist.push({ displayName: 'No Contacts found' });
    });
  }

  searchContact(searchString) {
    const options = new ContactFindOptions();
    options.filter = searchString;
    options.multiple = true;
    options.hasPhoneNumber = true;
    return this.contacts.find(['displayName', 'phoneNumbers', 'id'], options);
  }

  addReminder(item) {
    console.info('Adding reminder for ID', item);
    this.openModal(item);
  }

  openModal(item) {
    let modal = this.modalCtrl.create(Reminder, { contact: item });
    modal.present();
  }


}
