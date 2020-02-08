export class UserOld {
    uid: string;
    nom: string;
    groupe: string;

    constructor(options: {
        uid?: string,
        nom?: string,
        groupe?: string
    } = {}) {
        this.uid = options.uid || null;
        this.nom = options.nom || '';
        this.groupe = options.groupe || '';
    }

}