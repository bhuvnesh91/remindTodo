import { Injectable } from '@angular/core';
import { ContactFindOptions, Contacts } from '@ionic-native/contacts';
@Injectable()
export class ContactUtil {

    constructor(private contacts: Contacts) {

    }

    searchContact(searchString) {
        const options = new ContactFindOptions();
        options.filter = searchString;
        options.multiple = true;
        options.hasPhoneNumber = true;
        return this.contacts.find(['displayName', 'phoneNumbers', 'id'], options);
    }
}