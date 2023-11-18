import { FormationService } from './../services/formation.service';
import { ForNivGroupeWithId, FormationWithId, LinkWithId, NiveauFWithId, ParcoursWithId, SpecialiteWithId } from './../../api.interface';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Location } from '@angular/common';
import { RatiotpService } from '../services/ratiotp.service';
import { ForNivService } from '../services/for-niv.service';
import { AuthentificationService } from '../services/authentification.service';
import { forkJoin, map } from 'rxjs';
import { NiveauxFService } from '../services/niveaux-f.service';
import { SpecialiteService } from '../services/specialite.service';
import { ParcoursService } from '../services/parcours.service';


export interface ForNivGroupeWithIdO{

  id:number
  formation:FormationWithId,
  niveauF:NiveauFWithId,
  specialite:SpecialiteWithId,
  parcours:ParcoursWithId,
  coutTotal:number,
  nbgroupetd:number,
  nbgroupetp:number,
  linkForNivG:Array<LinkWithId>
  crespeB:boolean,

}

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit{

  formations: Array<ForNivGroupeWithIdO>
  ready: boolean
  page = 1;
  columns = ['Noms', 'Description', 'Universites', 'Matieres', 'Specs', 'Parcs', 'Niveaux']
  
  
  constructor(private formationS: FormationService, private parcS:ParcoursService,
    private niveauS:NiveauxFService, private specS:SpecialiteService,
    private tarifS:RatiotpService, public auth:AuthentificationService,
    private forNS:ForNivService,
    private location:Location,
    private router:Router) {
    this.formations = []
    this.ready = false;
  }



  checkC(){

    this.tarifS.all().subscribe((r)=>{

      if(r.length!=0){


        this.location.forward();
        this.router.navigate(['/createF']);


      }
      else{

        this.location.forward();
        this.router.navigate(['/ratioTP']);


      }

    })

  }

  changeRatio(){

    

    this.location.forward()
    this.router.navigate(['/ratioTP'])


  }



  ngOnInit(): void {

    if(this.auth.isAuthentified){

    /*this.forNS.all().subscribe((formations) => { //récupération des différentes formations

      if (formations.length === 0) {
        this.ready = true; // Aucune formation à traiter, la variable "ready" est définie sur "true"
        return;
      }

      if(formations.length === 0 ){
        this.ready = true;
        return;
      }
      const requests = formations.map((formation) => {  //remplacement des id des paramètres par leur noms

        const formationId = this.getId(formation.formation);
        const niveauFId = this.getId(formation.niveauF);
        const specialiteId = this.getId(formation.specialite);
        const parcoursId = this.getId(formation.parcours);
  
        const formationRequest = this.formationS.formationFromId(formationId);
        const niveauFRequest = this.niveauS.niveauxFFromId(niveauFId);
        const specialiteRequest = this.specS.specialiteFromId(specialiteId);
        const parcoursRequest = this.parcS.parcoursFromId(parcoursId);
  
        return forkJoin([formationRequest, niveauFRequest, specialiteRequest, parcoursRequest]).pipe( //regroupement des différentes requetes
          map(([formationRes, niveauFRes, specialiteRes, parcoursRes]) => {
            formation.formation = formationRes.nom;
            formation.niveauF = niveauFRes.nom;
            formation.specialite = specialiteRes.nom;
            formation.parcours = parcoursRes.nom;
            return formation;
            
          })
        );
      });
  
      forkJoin(requests).subscribe((updatedFormations) => {  //récupération des formations modifiées
        this.formations = updatedFormations;                 //association avec la variable locale
        this.ready = true;
      });
    });*/

    this.forNS.getLinkWithAll().subscribe((tab)=>{

      this.formations=tab;
      this.ready=true;

    })


    }
  }
  
  getId(path: string): number {
    const tab = path.split('/');
    return parseInt(tab[tab.length - 1]);
  }
  

  delete(id: number) {
    this.forNS.deleteForNivGroupeFromId(id)
      .subscribe((response) =>
        this.formations = this.formations.filter((formations) => formations.id !== id))
  }

  getFormationsSansDoublons(): string[] {
    const uniqueFormations: string[] = [];
    const nomSet: Set<string> = new Set();

    for (const formation of this.formations) {
      if (!nomSet.has(formation.formation.nom)) {
        uniqueFormations.push(formation.formation.nom);
        nomSet.add(formation.formation.nom);
      }
    }

    return uniqueFormations;
  }
}
