export interface Mission {
    titre: string;
    enseigne: string;
    type: string;
    lat: number;
    lng: number;
    dateDebut: string;
    dateFin: string;
    gainPhoto: number;
    gainMax: number;
    details: string;
    pointsBonus: boolean;
    photos?: any[];
}
