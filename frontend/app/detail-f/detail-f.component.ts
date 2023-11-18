
import { CompetenceWithId, ForNivGroupeWithId, FormationWithId, LinkWithId, NiveauFWithId, ParcoursWithId, SpecialiteWithId, ThemeMWithId } from './../../api.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NiveauxFService } from '../services/niveaux-f.service';
import { ForNivService } from '../services/for-niv.service';
import { LinkService } from '../services/link.service';
import { AuthentificationService } from '../services/authentification.service';
import { concatMap, forkJoin, switchMap, tap } from 'rxjs';
import { FormationService } from '../services/formation.service';
import { ParcoursService } from '../services/parcours.service';
import { SpecialiteService } from '../services/specialite.service';

interface LinkWithIdO {

  id:number
  formation:FormationWithId,
  niveauF:NiveauFWithId,
  parcours:ParcoursWithId,
  matiere:MatiereWithIdO,
  specialite:SpecialiteWithId,
  hcm:number,
  htd:number,
  htp:number,
  forNivGroupe:ForNivGroupeWithId,
  coutHTD:number,
  coutTotal:number,
  tabc:TabcWithIdO
}

interface TabcWithIdO {
  
  comps:Array<CompetenceWithId>,
  linkTabc:LinkWithId|null
}

interface MatiereWithIdO{

  id:number,
  nom:string
  themeM:ThemeMWithId
  description:string
  linkMatiere:Array<LinkWithId>

}







@Component({
  selector: 'app-detail-f',
  templateUrl: './detail-f.component.html',
  styleUrls: ['./detail-f.component.css']
})
export class DetailFComponent implements OnInit {

forN: ForNivGroupeWithId={

  id:0,
  formation:"",
  niveauF:"",
  specialite:"",
  parcours:"",
  coutTotal:0,
  nbgroupetd:0,
  nbgroupetp:0,
  linkForNivG:new Array(),
  crespeB:false,
  tabA:""

  }

  f:number
  n:number
  s:number
  p:number

  links:Array<LinkWithIdO>

  ready: boolean
  page = 1
  constructor(private forNS: ForNivService, private parcourS:ParcoursService, private specialiteS:SpecialiteService,
    private formationS:FormationService, private niveaufS:NiveauxFService,
    private linkS:LinkService, public auth:AuthentificationService,
    private location:Location,
    private router:Router,
    private route: ActivatedRoute) {

    this.ready = false
    this.links=[];
    this.f=0;
    this.n=0;
    this.s=0;
    this.p=0;
  }


  deleteM(id:number){ //vérifier si id n'est pas un string

    console.log(id)

    this.linkS.deleteLinkFromId(id).subscribe(()=>{

      window.location.reload();

    })

  }

  editF(id:number){

    this.forNS.forNivGroupeFromId(id).subscribe((f)=>{

      let tab=f.tabA.split("/");

      this.location.forward();
      this.router.navigate(["createF/", id, parseInt(tab[tab.length-1])]);

    })

    

  }

  editM(id:number){

    this.location.forward();
    this.router.navigate(["createM/", id]);

  }

  getId(path: string): number {


    const tab = path.split('/');
    return parseInt(tab[tab.length - 1]);

  }
  

  ngOnInit(): void {

    

    const frParameter: string | null = this.route.snapshot.paramMap.get('fr')

    if(frParameter!==null){

      this.forNS.forNivGroupeFromId(parseInt(frParameter)).pipe(
        concatMap((f) =>
          forkJoin({
            f: this.formationS.formationFromId(this.getId(f.formation)),
            n: this.niveaufS.niveauxFFromId(this.getId(f.niveauF)),
            s: this.specialiteS.specialiteFromId(this.getId(f.specialite)),
            p: this.parcourS.parcoursFromId(this.getId(f.parcours))
          }).pipe(
            tap((req) => {
              this.forN.id = parseInt(frParameter);
              this.forN.formation = req.f.nom;
              this.forN.niveauF = req.n.nom;
              this.forN.parcours = req.p.nom;
              this.forN.specialite = req.s.nom;
      
              this.f = req.f.id;
              this.n = req.n.id;
              this.s = req.s.id;
              this.p = req.p.id;
            }),
            concatMap(() => this.linkS.getLinkWithAll(parseInt(frParameter)))  //prendre en compte que observables précédentes
          )
        )
      ).subscribe((tabs: any[]) => {
        console.log("dzjdd", tabs, this.f, this.n, this.s, this.p);
        this.links = tabs;
        this.ready = true;
      });
      

    }


    

    
  }

}
