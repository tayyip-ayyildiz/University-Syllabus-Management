import { RatiotpService } from './../services/ratiotp.service';
import { ForNivGroupeWithId, FormationWithId, ParcoursWithId, SpecialiteWithId } from './../../api.interface';
import { FormationService } from './../services/formation.service';
import { Formation } from 'src/Entity/Formation';
import { Component, OnInit } from '@angular/core';
import {  Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NiveauxFService } from '../services/niveaux-f.service';
import { NiveauFWithId } from 'src/api.interface';
import { Specialite } from 'src/Entity/Specialite';
import { ParcoursService } from '../services/parcours.service';
import { SpecialiteService } from '../services/specialite.service';
import { ForNivGroupe } from 'src/Entity/ForNivGroupe';
import { ForNivService } from '../services/for-niv.service';
import { concatMap, firstValueFrom, forkJoin, switchMap, tap } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';
import { TabA } from 'src/Entity/TabA';
import { TabAService } from '../services/tab-a.service';


@Component({
  selector: 'app-create-f',
  templateUrl: './create-f.component.html',
  styleUrls: ['./create-f.component.css']
})
export class CreateFComponent implements OnInit {  

  id:number|undefined=undefined     //ForNv
  id1:number|undefined=undefined   //Tabc

  isLoading: boolean = false;

  formation: Formation = {

    nom: "",
    description: "",
    ratioTarif: "",
    nbG:new Array()

  };

  specialite:Specialite={

    nom:"",
    description:"",
    nbG:new Array()

  }

  forniveauG:ForNivGroupe={

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

  selectedNiveau: number
  selectedP:number
  selectedS:number

  niveauxF:Array<NiveauFWithId>
  parcours:Array<ParcoursWithId>
  specialites:Array<SpecialiteWithId>
  

  nomB:boolean
  descriptionB:boolean
  niveauB:boolean
  ready:boolean
  parcoursB:boolean
  speDejaExis:boolean
  speB:boolean
  nbtdB:boolean
  nbtpB:boolean
  descriptionSB:boolean
  forNExis:boolean




  get newFormation(): boolean { return this.id === undefined }

  constructor(private formationS: FormationService, private niveauxfS: NiveauxFService, private authentication: AuthentificationService, private tabAS:TabAService,
    private forNS: ForNivService,
    private parcoursS:ParcoursService, 
    private specialiteS:SpecialiteService, 
    private ratioS:RatiotpService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {

    
    this.ready=false;
    this.nomB=true;
    this.descriptionB=true;
    this.niveauB=true;
    this.parcoursB=true;
    this.speDejaExis=true;
    this.forNExis=false;
    this.speB=true;
    this.nbtdB=true;
    this.nbtpB=true;
    this.descriptionSB=true;

    this.selectedNiveau = 0;
    this.selectedP=0;
    this.selectedS=0;

    this.niveauxF=[];
    this.parcours=[];
    this.specialites=[];
    

  }



  goB():void{

    this.location.back();
    this.router.navigate(['/formation'])

  }


  public get isAuthentified() {

     return this.authentication.isAuthentified 
    
  }




  next(id1:number): void { 


    this.location.forward();
    this.router.navigate(['/competences', this.id, id1]);

  }



  async modN(forNiveauId: ForNivGroupeWithId) {
    //NIVEAUX
    let n = forNiveauId.niveauF.split("/");
  
    /////////////////////////////////////////si le niveau séléctionné est différent du précédent/////////////////////////////////////////////
    if (this.selectedNiveau != parseInt(n[n.length - 1])) {
      
      try {

        forNiveauId.niveauF = "/api/niveau_fs/" + this.selectedNiveau;

        let n2 = await firstValueFrom(this.niveauxfS.niveauxFFromId(this.selectedNiveau));

        n2.nbG.push("/api/for_niv_groupes/" + this.id);

        let u1 = await firstValueFrom(this.niveauxfS.modifyNiveauxF(n2));

        if(u1){

          let n1 = await firstValueFrom(this.niveauxfS.niveauxFFromId(parseInt(n[n.length - 1]))); //suppresion de l'ancien niveau

          for (let nivgr of n1.nbG) {
            let a = nivgr.split("/");
            if (parseInt(a[a.length - 1]) == this.id) {
              let index = n1.nbG.indexOf(nivgr);
              n1.nbG.splice(index, 1);
              break;
            }
          }
          
          await firstValueFrom(this.niveauxfS.modifyNiveauxF(n1));
          
        }

      } catch (error) {
        // Gérer les erreurs
      }
    }
  }





  async modP(forNiveauId:ForNivGroupe){

    let p=forNiveauId.parcours.split("/");

      if(this.selectedP!=parseInt(p[p.length-1])){

        try{


          forNiveauId.parcours="/api/parcours/"+this.selectedP;

          let p3= await firstValueFrom(this.parcoursS.parcoursFromId(this.selectedP));

          p3.nbG.push("/api/for_niv_groupes/"+this.id);

          let p4=await firstValueFrom(this.parcoursS.modifyParcours(p3));

          if(p4){

            let p1= await firstValueFrom(this.parcoursS.parcoursFromId(parseInt(p[p.length-1])));

            for(let p of p1.nbG){

              let b=p.split("/");

              if(parseInt(b[b.length-1])==this.id){

                
                let index = p1.nbG.indexOf(p);

                  p1.nbG.splice(index, 1);
                  break;

              }


            }

            await firstValueFrom(this.parcoursS.modifyParcours(p1));


          }


        }
        catch(error){


        }

        

      }

  }

  async spe(idF:number, nomS:string, descriptionS:string, nbtd:number, nbtp:number):Promise<number>{

    let s=0;

    if(nomS.length==0 && descriptionS.length==0 && this.selectedS!=0){ //spé dejà existante

      s=this.selectedS;

      this.forniveauG.formation="/api/formations/"+idF;
      this.forniveauG.niveauF="/api/niveau_fs/"+this.selectedNiveau;
      this.forniveauG.specialite="/api/specialites/"+this.selectedS;
      this.forniveauG.parcours="/api/parcours/"+this.selectedP;
      this.forniveauG.nbgroupetd=nbtd;
      this.forniveauG.nbgroupetp=nbtp;
      this.forniveauG.crespeB=false;
      
      

    }

    else if(nomS.length!=0 && descriptionS.length!=0 && this.selectedS==0){  //création d'une nouvelle spé
      
      this.specialite.nom=nomS;
      this.specialite.description=descriptionS;

      let a=await firstValueFrom(this.specialiteS.createSpecialite(this.specialite));

        s=a.id;
        this.forniveauG.formation="/api/formations/"+idF;
        this.forniveauG.niveauF="/api/niveau_fs/"+this.selectedNiveau;
        this.forniveauG.specialite="/api/specialites/"+a.id;
        this.forniveauG.parcours="/api/parcours/"+this.selectedP;
        this.forniveauG.nbgroupetd=nbtd;
        this.forniveauG.nbgroupetp=nbtp;
        this.forniveauG.crespeB=true;

    }

    return s;

  }
  

  async checkNomFValide(nomF:string){
    
    let a=await firstValueFrom(this.formationS.all());

    for(let e of a){

      if(e.nom==nomF){

        return false;
      }

    }

    return true;


  }

  async checkNomSValide(nomS:string){

    if(nomS===""){

      return true;

    }

    let b=await firstValueFrom(this.specialiteS.all());

    for(let el of b){

      if(el.nom==nomS){

        return true;
      }

    }

    return false;


  }

  async checkForNiv(nomF: string): Promise<boolean> {
    let idF = 0;
  
    if (this.selectedS != 0) {
      const ta = await firstValueFrom(this.formationS.all());
  
      for (let i = 0; i < ta.length; i++) {
        if (ta[i].nom === nomF) {
          console.log("FIND")
          idF = ta[i].id;
          break;
        }
      }
      
      console.log(idF, this.selectedNiveau, this.selectedS, this.selectedP)
      const ta1 = await firstValueFrom(this.forNS.getForNFromFNPS(idF, this.selectedNiveau, this.selectedS, this.selectedP));
  
      return ta1.length !== 0;
    }
  
    return false;
  }
  




  async create(nomF: string, descriptionF: string, nomS:string, descriptionS:string, nbtd:number, nbtp:number) {

    const nomFUpperCase = this.convertToUpperCase(nomF);

    if(nomFUpperCase.length!=0 && descriptionF.length!=0 && this.selectedNiveau!=0 && this.selectedP!=0 && nbtd>0 && nbtp>0 && (this.selectedS!=0 || (nomS.length!=0 && descriptionS.length!=0))){

      //this.ready=false;

      this.nomB=true;
      this.descriptionB=true;
      this.niveauB=true;
      this.parcoursB=true;

      this.formation.nom=nomFUpperCase;
      this.formation.description=descriptionF;


      if(this.selectedS!=0 && (nomS.length!=0 || descriptionS.length!=0)){

        nomS="";
        descriptionS="";

      }





      if(this.id!==undefined){  //cas modif

        let forNiveauId:ForNivGroupeWithId={

          id:this.id,
          formation:this.forniveauG.formation,
          niveauF:this.forniveauG.niveauF,
          specialite:this.forniveauG.specialite,
          parcours:this.forniveauG.parcours,
          coutTotal:this.forniveauG.coutTotal,
          nbgroupetd:nbtd,
          nbgroupetp:nbtp,
          linkForNivG:this.forniveauG.linkForNivG,
          crespeB:this.forniveauG.crespeB,
          tabA:this.forniveauG.tabA

        }



        let f=forNiveauId.formation.split("/");

        let continu:boolean=false;

        ////////////////////FORMATION//////////////////////////////////

        this.formationS.formationFromId(parseInt(f[f.length-1])).subscribe((fo)=>{


          let formwithId:FormationWithId=fo;

          formwithId.nom=this.formation.nom;
          formwithId.description=this.formation.description;

          this.formationS.modifyFormation(formwithId).subscribe(async (d1)=>{


            if(d1){
              

              await this.modN(forNiveauId);
              await this.modP(forNiveauId);


              ///////////////////////////////////////////////////////////////PARCOURS//////////////////////////////////////////////////////////////////////


              console.log("AFTER AWAIT")

              

              ///////////////////////////SPECIALITE 4 SOLUTIONS POSSIBLES///////////////////////////////////////////

              let sId=forNiveauId.specialite.split("/");

              if(nomS.length==0 && this.selectedS!=0){  //cas où tu choisis une spé déjà existante

                console.log(1)

                if(forNiveauId.crespeB==true){  //crée une spé au préalable    11111111111111111

                  forNiveauId.crespeB=false;

                  this.specialiteS.deleteSpecialiteFromId(parseInt(sId[sId.length-1])).subscribe((d2)=>{

                    
                    if(d2){


                      forNiveauId.specialite="/api/specialites/"+this.selectedS;

                      this.specialiteS.specialiteFromId(this.selectedS).subscribe((tr)=>{


                        tr.nbG.push("/api/for_niv_groupes/"+this.id);

                        this.specialiteS.modifySpecialite(tr).subscribe((u4)=>{

                            if(u4){

                              this.forNS.modifyForNivGroupe(forNiveauId).subscribe((a)=>{

                                if(a)

                                if(this.id1!==undefined){

                                  this.next(this.id1);

                                }
                                

                              })

                            }


                        })

                        


                      })

                    }

                  })
                  this.isLoading = true;

                }
                else{  //choisi spé au préalable       2222222222222222
                        
                  console.log(2)

                  this.specialiteS.specialiteFromId(parseInt(sId[sId.length-1])).subscribe((t1)=>{

                    for(let s of t1.nbG){

                      let b8=s.split("/");
  
                      if(parseInt(b8[b8.length-1])==this.id){
  
                        let index = t1.nbG.indexOf(s);
  
                          t1.nbG.splice(index, 1);
                          break;
  
                      }
  
  
                    }

                    console.log(2.1)

                    forNiveauId.specialite="/api/specialites/"+this.selectedS;

                    this.specialiteS.specialiteFromId(this.selectedS).subscribe((tr)=>{


                      tr.nbG.push("/api/for_niv_groupes/"+this.id);

                      this.specialiteS.modifySpecialite(tr).subscribe((u5)=>{

                        if(u5){

                          console.log(2.2, this.id1)
                          
                          if(this.id1!==undefined){

                            this.next(this.id1);
                                  
                          }

                        }

                      })

                     


                    })

                    


                  })
                  this.isLoading = true;

                }

              }


              else if(this.selectedS==0 && (nomS.length!=0 && descriptionS.length!=0)){  //cas où tu crées une nouvelle spé ou modifi  CHECK SI TU SUPPRIMES ANCIENNE VALEUR ?

                console.log(3)



                if(forNiveauId.crespeB==true){ //si il avait crée la spé au préalable et qu'il décide de changer       33333333333333333

                  this.specialiteS.specialiteFromId(parseInt(sId[sId.length-1])).subscribe((temp)=>{

                    temp.nom=nomS;
                    temp.description=descriptionS;

                    this.specialiteS.modifySpecialite(temp).subscribe((c4)=>{

                      if(c4){
      
                        if(this.id1!==undefined){

                          this.next(this.id1);
                          
                        }
      
      
                      }
      
      
                    })


                  })
                  this.isLoading = true;


                }
                else{ //si il choisit une spé déja existante           44444444444444444

                  console.log(4)

                  forNiveauId.crespeB=true;

                  this.specialiteS.specialiteFromId(parseInt(sId[sId.length-1])).subscribe((g)=>{   //supprime association

                    for(let sheeesh of g.nbG){

                      let j=sheeesh.split("/");
  
                      if(parseInt(j[j.length-1])==this.id){
  
                        let index =g.nbG.indexOf(sheeesh);
  
                          g.nbG.splice(index, 1);
                          break;
  
                      }
  
  
                    }

                    this.specialiteS.createSpecialite(this.specialite).subscribe((g1)=>{

                          forNiveauId.specialite="/api/specialites/"+g1.id;
                          g1.nbG.push("/api/for_niv_groupes/"+forNiveauId.id);

                          this.specialiteS.modifySpecialite(g1).subscribe((f1)=>{

                            if(f1){

                              this.forNS.modifyForNivGroupe(forNiveauId).subscribe((b)=>{

                                if(b)

                                if(this.id1!==undefined){

                                  this.next(this.id1);
                                  
                                }

                              })

                              

                            }


                          })


                    })



                  })
                  this.isLoading = true;


                }



              }
              else{  //cas où pas de spé

                if(forNiveauId.crespeB==true){

                  this.specialiteS.deleteSpecialiteFromId(parseInt(sId[sId.length-1])).subscribe((d2)=>{

                    if(d2){


                      forNiveauId.specialite="";

                      if(this.id1!==undefined){

                        this.next(this.id1);
                        
                      }

                      

                    }

                  })




                }

                else{

                  this.specialiteS.specialiteFromId(parseInt(sId[sId.length-1])).subscribe((l)=>{

                    for(let al of l.nbG){

                      let w=al.split("/");
  
                      if(parseInt(w[w.length-1])==this.id){
  
                        let index =l.nbG.indexOf(al);
  
                          l.nbG.splice(index, 1);
                          break;
  
                      }
  
  
                    }


                    forNiveauId.specialite="";

                    if(this.id1!==undefined){

                      this.next(this.id1);
                    
                    }



                  })


                }


              }  


            }


          })

          


        })
        this.isLoading = true;




      }

      else{ ////////////////////////////////////////////////création direct//////////////////////////////////////////

        this.speDejaExis=await this.checkNomSValide(nomS);
        this.forNExis=await this.checkForNiv(nomFUpperCase);

        

        if(!this.forNExis){

        console.log("direct",this.forNExis)

        let sId:number;

        this.ratioS.all().subscribe((r)=>{

          this.formation.ratioTarif="/api/tarifs/"+r[0].id;

          this.formationS.createFormation(this.formation).subscribe(async (b)=>{


              sId= await this.spe(b.id, nomS, descriptionS, nbtd, nbtp);

              console.log("HEHEHEHE",this.forniveauG);

              let tabAtemp:TabA={

                comps:new Array(),
                tabForN:null,

              }

              this.tabAS.createTaba(tabAtemp).subscribe((taA)=>{

                this.forniveauG.tabA="/api/tab_as/"+taA.id;

                this.forNS.createForNivGroupe(this.forniveauG).subscribe((bol)=>{

                  taA.tabForN="/api/for_niv_groupes/"+bol.id;

                    let cvb=this.forniveauG.specialite.split("/");

                    if(this.selectedS==0){

                      this.selectedS=parseInt(cvb[cvb.length-1]);

                    }

                    this.id=bol.id;

                    
                    forkJoin({
                      f: this.formationS.formationFromId(b.id),
                      n: this.niveauxfS.niveauxFFromId(this.selectedNiveau),
                      p: this.parcoursS.parcoursFromId(this.selectedP),
                      s: this.specialiteS.specialiteFromId(sId)
                    }).pipe(
                      tap((res) => {
                        res.f.nbG.push("/api/for_niv_groupes/" + this.id);
                        res.n.nbG.push("/api/for_niv_groupes/" + this.id);
                        res.p.nbG.push("/api/for_niv_groupes/" + this.id);
                        res.s.nbG.push("/api/for_niv_groupes/" + this.id);
                      }),
                      concatMap((res) => {
                        const modifyRequests = [
                          this.formationS.modifyFormation(res.f),
                          this.niveauxfS.modifyNiveauxF(res.n),
                          this.parcoursS.modifyParcours(res.p),
                          this.specialiteS.modifySpecialite(res.s),
                          this.tabAS.modifyTaba(taA)
                        ];
                        return forkJoin(modifyRequests);
                      })
                    ).subscribe((results) => {
                        // Résultats des requêtes successives
                        console.log("Toutes les requêtes ont été exécutées avec succès !");
                        console.log(bol.id)
                        this.next(bol.id);
                      
                    });


                })

            })


          })


        })
        this.isLoading = true;

      }

      else{

        console.log("EXISTE DEJA")


      }


      }



    }
    else{

      nomFUpperCase.length==0?this.nomB=false:this.nomB=true;

      descriptionF.length==0?this.descriptionB=false:this.descriptionB=true;

      this.selectedNiveau==0?this.niveauB=false:this.niveauB=true;

      this.selectedP==0?this.parcoursB=false:this.parcoursB=true;

      nbtd<=0?this.nbtdB=false:this.nbtdB=true;

      nbtp<=0?this.nbtpB=false:this.nbtpB=true;

      if(this.selectedS==0 && nomS.length==0){

        this.speB=false;


      }
      else if(this.selectedS==0){

        this.speB=true;


        if(descriptionS.length==0){

          this.descriptionSB=false;

        }
        else{

          this.descriptionSB=false;

        }


      }
      else{

        this.parcoursB=true;

      }


    }


    
    
  }
  getId(path: string): number {  
    const tab = path.split('/');
    return parseInt(tab[tab.length - 1]);
  }
  
  ngOnInit(): void {
    
    if(this.authentication.isAuthentified){
  
    const frParameter: string | null = this.route.snapshot.paramMap.get('fr');
    const fnParameter: string | null = this.route.snapshot.paramMap.get('fn');
      
    if (frParameter !== null) {

      this.id = Number(frParameter);

      this.forNS.forNivGroupeFromId(this.id).subscribe((a)=>{

        this.forniveauG=a;

        let f=this.getId(this.forniveauG.formation);
        let p=this.getId(this.forniveauG.parcours);
        let s=this.getId(this.forniveauG.specialite);
        let n=this.getId(this.forniveauG.niveauF);


        this.selectedNiveau=n;
        this.selectedP=p;

        const requs=forkJoin({

          l:this.formationS.formationFromId(f),
          k:this.specialiteS.specialiteFromId(s)

        });

        requs.subscribe((r)=>{

          this.formation=r.l;

          if(a.crespeB==true){

            this.specialite=r.k;

          }

          else{

            this.selectedS=r.k.id;


          }

        })          
  
        })
      
    }


    if(fnParameter!==null){

      this.id1=Number(fnParameter);

    }



    const combined = forkJoin({
    niveaux: this.niveauxfS.all(),
    specialites: this.specialiteS.all(),
    parcours: this.parcoursS.all()
    });

    // Souscrivez à l'observable combiné
    combined.subscribe((results) => {
      this.niveauxF = results.niveaux;
      this.specialites = results.specialites;
      this.parcours = results.parcours;
      this.ready = true;
    });

  }
      


  }


  convertToUpperCase(value: string): string {
    return value.toUpperCase();
  }

}
