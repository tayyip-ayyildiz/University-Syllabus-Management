import { RatiotpService } from './../services/ratiotp.service';
import { Tarif } from './../../Entity/Tarif';
import { TarifWithId} from './../../api.interface';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';


@Component({
  selector: 'app-ratio-tp',
  templateUrl: './ratio-tp.component.html',
  styleUrls: ['./ratio-tp.component.css']
})
export class RatioTpComponent {

  selectedTarif:string
  tarifs:Array<number>

  t:Tarif={

    ratioTP:0,
    formationsT:new Array()
  }

  constructor(private tarifS:RatiotpService, private authentication:AuthentificationService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router){


    this.selectedTarif=""
    this.tarifs=[0.66,1]


  }

  goB():void{

    this.location.back();

  }

  public get isAuthentified() {

    return this.authentication.isAuthentified 
   
 }

  ajouter(){

    if(this.selectedTarif.length!=0){

    this.tarifS.all().subscribe((t)=>{

      console.log("sasas", t[0])

      if(t.length==0){

        console.log("1")

        this.tarifS.createTarif(this.t).subscribe(()=>
        {
          
          this.location.forward();
          this.router.navigate(['/createF']);

        });

      }

      else{
      
        console.log("2")

        console.log("element selec",this.selectedTarif)

        //console.log(t1)

        t[0].ratioTP=parseFloat(this.selectedTarif)
    
        this.tarifS.modifyTarif(t[0]).subscribe((m)=>{
          
          this.location.back();


        });
        
        
  
  
      }


    })

  }

  }



}
