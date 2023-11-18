import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { LoginService } from '../services/login.service';
import { SessionStorageService } from '../services/session-storage.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  username: string = ''
  password: string = ''
  
  
  get isValid() { return this.username !== '' && this.password !== '' }

  constructor(public auth: AuthentificationService, private location:Location, private router:Router,
    private sessionS:SessionStorageService, private loginS:LoginService) {

  }


  async login() {

    this.auth.login(this.username, this.password).subscribe( async (b)=>{

      if(b){

        if (this.sessionS.getItem('sessionId')===null) {

          let Id=await this.loginS.getId(this.username);

          this.sessionS.setItem('sessionId', Id.toString());

          this.location.forward();
          this.router.navigate(["/"]);

          setTimeout(() => {
            location.reload();
          }, 100);

        }


      }



    })


  }

 




}
