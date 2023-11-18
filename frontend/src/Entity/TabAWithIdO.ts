import { ForNivGroupeWithId } from "src/api.interface";
import { CompetenceWithIdO } from "./CompetenceWithIdO";

export interface TabAWithIdO{

    id:number,
    comps:Array<CompetenceWithIdO>,
    tabForN:ForNivGroupeWithId|null
  
  }
  