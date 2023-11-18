import { RatioTpComponent } from './ratio-tp/ratio-tp.component';
import { CreateFComponent } from './create-f/create-f.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationComponent } from './formation/formation.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CompetencesComponent } from './competences/competences.component';
import { CreateMComponent } from './create-m/create-m.component';
import { DetailFComponent } from './detail-f/detail-f.component';
import { ConnexionComponent } from './connexion/connexion.component';


const routes: Routes = [
  {path:'',component:AccueilComponent},
  {path:'connexion',component:ConnexionComponent},

  {path:'ratioTP', component:RatioTpComponent},
  {path:'formation', component:FormationComponent},
  {path:'createF', component:CreateFComponent},
  {path:'createF/:fr', component:CreateFComponent},
  {path:'createF/:fr/:fn', component:CreateFComponent},
  //{path:'editF', component:EditFComponent},
  {path:'competences/:fr/:fn',component:CompetencesComponent},
  {path:'createM/:fr/:fn',component:CreateMComponent},
  {path:'createM/:lk',component:CreateMComponent},
  {path:'detailF/:fr',component:DetailFComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
