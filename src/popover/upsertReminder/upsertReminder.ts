import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    templateUrl: 'upsertReminder.html'
})
export class UpsertReminder {

    remind: { text: String } = { text: undefined };

    constructor(public viewCtrl: ViewController, private storage: Storage) {
        let reminderToEdit = this.viewCtrl.data.reminderToEdit;
        if (reminderToEdit) {
            this.remind.text = reminderToEdit.text;
        }
    }

    close(reminders: [any]) {
        this.viewCtrl.dismiss(reminders);
    }

    saveReminder($event) {
        let contactId = this.viewCtrl.data.contactId;
        let reminderToEdit = this.viewCtrl.data.reminderToEdit;

        this.storage.get('remindTodo').then((data) => {
            if (data == null) {
                this.storage.set('remindTodo', {});
            }
            let _reminders = data[contactId];
            if (_reminders == null) {
                _reminders = [this._createReminderObj(this.remind.text)];
            } else if (reminderToEdit) {
                for (let i = 0; i < _reminders.length; i++) {
                    if (_reminders[i].id == reminderToEdit.id) {
                        _reminders[i].text = this.remind.text;
                        break;
                    }
                }
            } else {
                _reminders.push(this._createReminderObj(this.remind.text))
            }
            data[contactId] = _reminders;
            this.storage.set('remindTodo', data);
            this.close(_reminders);
        })
    }

    _createReminderObj(text: String) {
        return {
            id: Math.random().toString(36).slice(2),
            text: text
        };
    }
}