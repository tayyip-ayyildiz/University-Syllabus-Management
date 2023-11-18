import { LinkWithId, ThemeMWithId } from "src/api.interface"

export interface MatiereWithIdO{

    id:number,
    nom:string
    themeM:ThemeMWithId
    description:string
    linkMatiere:Array<LinkWithId>
  
  }