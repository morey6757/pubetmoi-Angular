export interface Mission {
    titre: string;
    enseigne: string;
    type: string;
    emplacement: string;
    dateDebut: string;
    dateFin: string;
    gainPhoto: number;
    gainMax: number;
    details: string;
    pointsBonus: boolean;
    photos?: any[];
}
