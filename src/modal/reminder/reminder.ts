import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PopoverController } from 'ionic-angular';
import { UpsertReminder } from '../../popover/upsertReminder/upsertReminder';

@Component({
    selector: 'modal-reminder',
    templateUrl: 'reminder.html'
})
export class Reminder {
    contact: any;
    existingReminders: any[] = [];

    constructor(public params: NavParams, public viewCtrl: ViewController, private storage: Storage, public popoverCtrl: PopoverController) {
        this.contact = this.params.get('contact');
        let contactId = this.contact.id;
        this.storage.get('remindTodo').then((_reminders) => {
            if (_reminders == null){
                _reminders = {};
                this.storage.set('remindTodo', {});
            }
            this.existingReminders = _reminders[contactId];
        });
    }

    addReminder(myEvent) {
        this.presentPopover(myEvent, undefined);
    }

    editReminder(myEvent, reminder) {
        this.presentPopover(myEvent, reminder);
    }

    deleteReminder(myEvent, reminder) {
        let contactId = this.contact.id;
        this.storage.get('remindTodo').then((data) => {
            let _reminders = data[contactId];
            if (_reminders.length > 1) {
                for (let i = 0; i < _reminders.length; i++) {
                    if (_reminders[i].id == reminder.id) {
                        _reminders.splice(i, 1);
                        break;
                    }
                }
                data[contactId] = _reminders;
            } else {
                delete data[contactId];
            }
            this.storage.set('remindTodo', data);
            this.existingReminders = data[contactId];
        });
    }

    presentPopover(myEvent, reminderToEdit) {
        let popover = this.popoverCtrl.create(UpsertReminder, { contactId: this.contact.id, reminderToEdit: reminderToEdit }, {
            cssClass: 'top-100'
        });

        popover.present({
            ev: myEvent
        });

        popover.onDidDismiss(data => {
            //Null check is mandatory for only dismiss case
            if (data != null)
                this.existingReminders = data;
        })
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
