import { FormationWithId, NiveauFWithId, ParcoursWithId, SpecialiteWithId } from "src/api.interface"
import { LinkWithIdO } from "./LinkWithIdO"

export interface ForNivGroupeWithIdO{

    formation:FormationWithId,
    niveauF:NiveauFWithId,
    specialite:SpecialiteWithId,
    parcours:ParcoursWithId,
    coutTotal:number,
    nbgroupetd:number,
    nbgroupetp:number,
    linkForNivG:Array<LinkWithIdO>
    crespeB:boolean,
    tabA:string


}