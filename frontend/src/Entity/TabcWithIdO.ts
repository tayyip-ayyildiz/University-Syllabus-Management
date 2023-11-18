import { LinkWithIdO } from './LinkWithIdO';
import { CompetenceWithId, LinkWithId } from '../api.interface';

export interface TabcWithIdO {
  
  id:number
  comps:Array<CompetenceWithId>,
  linkTabc:LinkWithIdO|null

}