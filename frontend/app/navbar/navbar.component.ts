import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';
import { LoginService } from '../services/login.service';
import { LoginWithId } from 'src/api.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  login:LoginWithId={

    id:0,
    nom:"",
    prenom:"",
    email:"",
    mdp:"",
    datedenaissance:new Date(),
    tel:0,
    roles:new Array()


  }

  ready:boolean

  log:string|null

  constructor(private sessionS:SessionStorageService, private authS:AuthentificationService, private logS:LoginService,
    private location:Location,
    private router:Router) {

      this.log="";
      this.ready=false;
  
  }

  public get isAuthentified() {

    return this.authS.isAuthentified 
   
 }

 public onLogout(): void {
  
  this.sessionS.removeItem('token');
  this.sessionS.removeItem('sessionId');
  this.sessionS.removeItem('refresh_token');
  // Effectuer d'autres opérations de déconnexion si nécessaire
}

public checkExpi() {  //check toutes les 30 secondes la validité du token
  
  const t=this.sessionS.getItem('token');

  if(t!==null){

    if(this.authS.tokenExpired(t)){

      this.authS.renewToken();


    }

    setTimeout(() => {
      this.checkExpi(); // Rappeler la fonction après l'intervalle spécifié
    }, 10 * 1000); // Convertir l'intervalle en millisecondes
  

  }
  
  
}



ngOnInit(): void {

  const token=this.sessionS.getItem('token');
  
  if(token!==null){

    this.log = this.sessionS.getItem('sessionId');

      if(this.log!==null){

        this.logS.loginFromId(parseInt(this.log)).subscribe((lo)=>{
          this.login=lo;
          this.ready=true;

        })
        
      }

  }

  this.checkExpi();

  

}


}
