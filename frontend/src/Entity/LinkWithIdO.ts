import { ForNivGroupeWithId, FormationWithId, NiveauFWithId, ParcoursWithId, SpecialiteWithId } from "src/api.interface"
import { TabcWithIdO } from "./TabcWithIdO"
import { MatiereWithIdO } from "./MatiereWithIdO"
import { ForNivGroupeWithIdO } from "./ForNivGroupeWithIdO"


export interface LinkWithIdO {

    id:number
    formation:FormationWithId,
    niveauF:NiveauFWithId,
    parcours:ParcoursWithId,
    matiere:MatiereWithIdO,
    specialite:SpecialiteWithId,
    hcm:number,
    htd:number,
    htp:number,
    forNivGroupe:ForNivGroupeWithIdO,
    coutHTD:number,
    coutTotal:number,
    tabc:TabcWithIdO
  }