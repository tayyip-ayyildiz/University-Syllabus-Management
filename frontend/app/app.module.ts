import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormationComponent } from './formation/formation.component';
import { CreateFComponent } from './create-f/create-f.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FormsModule } from '@angular/forms';
import { RatioTpComponent } from './ratio-tp/ratio-tp.component';
import { CompetencesComponent } from './competences/competences.component';
import { CreateMComponent } from './create-m/create-m.component';
import { DetailFComponent } from './detail-f/detail-f.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { JwtInterceptor } from './services/jwt.interceptor.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SessionStorageService } from './services/session-storage.service';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    FormationComponent,
    CreateFComponent,
    AccueilComponent,
    RatioTpComponent,
    CompetencesComponent,
    CreateMComponent,
    DetailFComponent,
    ConnexionComponent,
    NavbarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    NgxPaginationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, 
    useClass: JwtInterceptor, 
    multi: true}, SessionStorageService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
