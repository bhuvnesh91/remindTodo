import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ContactUtil } from '../../util/contactUtil';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  contactlist: any[];
  constructor(
    private storage: Storage,
    private contactUtil: ContactUtil) {
    this.storage.get('remindTodo').then((_reminders) => {
      if (_reminders == null) {
        _reminders = {};
        this.storage.set('remindTodo', {});
      } else {
        this._createReminderContactList(_reminders);
      }

    });
  }

  _createReminderContactList(reminders) {
    for (const prop in reminders) {
      if (reminders.hasOwnProperty(prop)) {
        let objValue = reminders[prop];
        console.log(`obj.${prop} = ${objValue}`);
        this.contactUtil.searchContact(prop).then((contact) => {
          this.contactlist.push({
            name: contact[0].displayName,
            remObj: objValue,
            id: prop
          })
        })
      }
    }
  }

}
