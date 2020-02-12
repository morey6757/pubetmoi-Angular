import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable()
export class VariablesGlobales {
    isLoggedIn: boolean = false;
    user: User = { uid: '', email: '', isAdmin: false, titre: '', nom: '', prenom: '', dateNaissance: new Date(), telephone: '', notificationSMS: false, iban: '' };
}