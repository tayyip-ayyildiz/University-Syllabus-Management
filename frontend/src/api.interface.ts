import { Login } from './Entity/Login';
import { NiveauF } from './Entity/NiveauxF';
import { Parcours } from './Entity/Parcours';
import { Tarif } from './Entity/Tarif';
import { Formation } from "./Entity/Formation";
import { Matiere } from "./Entity/Matiere";
import { Specialite } from "./Entity/Specialite";
import { Link } from './Entity/Link';
import { Competence } from './Entity/Competence';
import { ThemeC } from './Entity/ThemeC';
import { ThemeM } from './Entity/ThemeM';
import { ForNivGroupe } from './Entity/ForNivGroupe';
import { Tabc } from './Entity/Tabc';
import { TabA } from './Entity/TabA';



export interface LinkWithId extends Link{

  id:number

}


export interface FormationWithId extends Formation {
  id: number

}

export interface MatiereWithId extends Matiere {
  id: number

}

export interface SpecialiteWithId extends Specialite{

  id:number;

}

export interface CompetenceWithId extends Competence{

  id:number

}

export interface LoginWithId extends Login{

  id:number;

}

export interface NiveauFWithId extends NiveauF{

  id:number;

}

export interface ParcoursWithId extends Parcours{

  id:number;

}

export interface TarifWithId extends Tarif{

  id:number;

}

export interface ThemeCWithId extends ThemeC{

  id:number;

}

export interface ThemeMWithId extends ThemeM{

  id:number;

}

export interface ForNivGroupeWithId extends ForNivGroupe{

  id:number;

}

export interface TabcWithId extends Tabc{

  id:number;

}

export interface TabAWithId extends TabA{

  id:number;

}

export interface LinkResponse{

  id?:number
  matiere:string,
  hcm:number,
  htd:number,
  htp:number,
  forNivGroupe:string,
  coutHTD:number,
  coutTotal:number,
  tabc:string

}


export interface FormationResponse{

  id?:number
  nom: string
  description:string
  ratioTarif:string
  nbG:Array<string>
}

export interface MatiereResponse{

  id?:number
  nom:string
  themeM:string
  description:string
  linkMatiere:Array<string>


}

export interface SpecialiteResponse{

  id?:number;
  nom:string;
  description:string;
  nbG:Array<string>

}

export interface ParcoursResponse{

  id?:number
  nom:string
  description:string
  nbG:Array<string>

}

export interface TarifResponse{

  id?:number
  ratioTP:number
  formationsT:Array<string>
  

}

export interface NiveauFResponse{

  id?:number
  nom:string
  nbG:Array<string>

}

export interface LoginResponse{

  id?:number
  nom:string
  prenom:string
  email:string
  mdp:string
  datedenaissance:Date
  tel:number
  roles:Array<any>


}

export interface CompetenceResponse{


  id?:number
  nom:string
  description:string
  linkCompetences:Array<string>,
  themeC:string
  tabcs:Array<string>,
  tabAs:Array<string>

}

export interface ThemeCResponse{

  id?:number
  nom:string
  compets:Array<string>

}

export interface ThemeMResponse{

  id?:number
  nom:string
  matieres:Array<string>

}

export interface ForNivGroupeResponse{

  id?:number,
  formation:string,
  niveauF:string,
  specialite:string,
  parcours:string,
  coutTotal:number,
  nbgroupetd:number,
  nbgroupetp:number,
  linkForNivG:Array<string>
  crespeB:boolean,
  tabA:string

}

export interface TabcResponse{

  id?:number,
  comps:Array<string>,
  linkTabc:string|null


}

export interface TabAResponse{

  id?:number,
  comps:Array<string>,
  tabForN:string|null


}

export interface apiResponse<T> {
  "@context": string,
  "@id": string,
  "@type": string,
  "hydra:member": Array<T>
}
