export interface User {
    uid: string;
    email: string;
    isAdmin: boolean;
    titre: string;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    telephone: string;
    notificationSMS: boolean;
    iban: string;
}
