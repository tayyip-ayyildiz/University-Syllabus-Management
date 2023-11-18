import { LinkWithId, TabcWithId } from "src/api.interface"
import { TabAWithIdO } from "./TabAWithIdO"
import { ThemeCWithIdO } from "./ThemeCWithIdO"

export interface CompetenceWithIdO{

    id:number,
    nom:string
    description:string
    linkCompetences:Array<LinkWithId>,
    themeC:ThemeCWithIdO
    tabcs:Array<TabcWithId>,
    tabAs:Array<TabAWithIdO>
  
  }