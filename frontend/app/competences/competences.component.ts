import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Competence } from 'src/Entity/Competence';
import { CompetenceService } from '../services/competence.service';
import { CompetenceWithId, ForNivGroupeWithId, LinkWithId, TabAWithId, TabcWithId, ThemeCWithId } from 'src/api.interface';
import { ThemeCService } from '../services/theme-c.service';
import { Tabc } from 'src/Entity/Tabc';
import { ThemeC } from 'src/Entity/ThemeC';
import { TabcService } from '../services/tabc.service';
import { concatMap, firstValueFrom, forkJoin, from, map, tap, toArray } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';
import { TabAService } from '../services/tab-a.service';
import { ForNivGroupeWithIdO } from '../formation/formation.component';
import { TabAWithIdO } from 'src/Entity/TabAWithIdO';
import { CompetenceWithIdO } from 'src/Entity/CompetenceWithIdO';



@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent implements OnInit {  

  id:number|undefined=undefined
  id1:number|undefined=undefined
  isLoading: boolean = false;
  page:number = 1;
  page1:number = 1;

  pagination1:boolean = false
  itemsPerPage:number = 3

  competence:Competence={

    nom:"",
    description:"",
    linkCompetences:new Array(),
    themeC:"",
    tabcs:new Array(),
    tabAs:new Array()

  }

  themeC:ThemeC={

    nom:"",
    compets:new Array()

  }

  themesT:Array<ThemeCWithId>
  competencesE:Array<CompetenceWithId>
  competencesEF:Array<CompetenceWithId>


  competenceF:TabAWithId={
    
    id:0,
    comps:new Array(),
    tabForN:null
  }

  competenceFVisuel:TabAWithIdO={

    id:0,
    comps:new Array(),
    tabForN:null

  }

  competenceFNom:Array<CompetenceWithId>

  ready:boolean
  filtrer:boolean

  selectedC:number
  selectedT:number


  constructor(private competenceS: CompetenceService, private themeCS:ThemeCService, private authentication:AuthentificationService, private tabAS:TabAService,
    private tabS:TabcService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {

      this.themesT=[];
      this.ready=false;
      this.filtrer=false;
      this.selectedC=0;
      this.selectedT=0;
      this.competencesE=[];
      this.competencesEF=[];
      this.competenceFNom=[];


  }

  

  getCompetences():boolean{

    return this.competenceF.comps.length==0


  }

  public get isAuthentified() {

    return this.authentication.isAuthentified 
   
 }

  async actualiserTab(){


    let q=await firstValueFrom(this.competenceS.all());
    
    if(this.id1!==undefined){

    let r=await firstValueFrom(this.tabAS.getTabAAll(this.id1));

    if(r[0]!==undefined){

      this.competenceF.id = r[0].id;
      this.competenceF.comps= r[0].comps.map((el:CompetenceWithIdO)=>{

        return "api/competences/"+el.id


      });

      this.competenceFVisuel=r[0];

    }

    this.competencesE=q;

  }

}

getId(path: string): number {  
  const tab = path.split('/');
  return parseInt(tab[tab.length - 1]);
}

  async filtrerLesCats() {
    this.pagination1 = true;
    this.competencesEF = this.competencesE
      .filter(comp => {

        let tab = comp.themeC.split("/");
        return this.selectedT == parseInt(tab[tab.length - 1]);

      })

      .map(e => {

        let tab1 = e.themeC.split("/");
        let copieO = { ...e }; // Crée une copie de l'objet e
        this.themeCS.themeCFromId(parseInt(tab1[tab1.length - 1])).subscribe(a => {
          copieO.themeC = a.nom; // Modifie la copie de l'objet, pas l'objet d'origine

        });
        return copieO; // Retourne la copie de l'objet modifié
      });

      this.competencesEF.length==0?this.filtrer=true:this.filtrer=false;
  }
  

  ret(id: number) {

    if(this.competenceF.comps.includes("api/competences/"+id)){ //si compétence présente

      this.competenceF.comps.forEach((el)=>{

        if(this.getId(el)==id){

          this.competenceS.competenceFromId(this.getId(el)).subscribe(async(c)=>{

            if(c.tabAs.includes("/api/tab_as/"+this.id1)){
        
              c.tabAs.splice(c.tabAs.indexOf("/api/tab_as/"+this.id1),1);
      
      
            }

            this.competenceF.comps.splice(this.competenceF.comps.indexOf(el),1);
            this.tabAS.modifyTaba(this.competenceF);
            await firstValueFrom(this.competenceS.modifyCompetence(c));
            this.actualiserTab();

            const totalItems = this.competencesEF.length;
            const currentPageItems = (totalItems % this.itemsPerPage);
        
            if (currentPageItems === 0 && this.page1 > 1) {
              // Si la page courante contient le dernier élément et il n'y a pas d'autres éléments sur cette page
              // alors revenir à la page précédente
              this.page1--;
            }
          })
          

        }

      })

    }


  }
  

  goB():void{

    this.location.back();
    this.router.navigate(['/createF',this.id, this.id1])

  }

  next():void{


    this.location.forward();
    this.router.navigate(["/createM",this.id, this.id1]);

  }

  add(id:number){

    if(!this.competenceF.comps.includes("/api/competences/"+id)){


      this.competenceS.competenceFromId(id).subscribe(async(a)=>{

        this.competenceF.comps.push("/api/competences/"+a.id);

        this.competenceFNom.push(a);
        
        a.tabAs.push("/api/tab_as/"+this.id1);

        await firstValueFrom(this.competenceS.modifyCompetence(a));

        if(this.id1!==undefined){

        let tempTab:TabAWithId={

          id:this.id1,
          comps:this.competenceF.comps,
          tabForN:this.competenceF.tabForN

        }

        await firstValueFrom(this.tabAS.modifyTaba(tempTab));
        window.location.reload();

        }




      })


    }

    else{ //déjà ajouté

      console.log("Déjà ajouté")


    }

  }


  async modifAll(t:ThemeCWithId, c:CompetenceWithId){

    if(this.id1!==undefined){

    let r:TabAWithId={

      id:this.id1,
      comps:this.competenceF.comps,
      tabForN:this.competenceF.tabForN

    }

    let req=forkJoin({

      t:this.themeCS.modifyThemeC(t),
      c:this.competenceS.modifyCompetence(c),
      ta:this.tabAS.modifyTaba(r),

    });

    await firstValueFrom(req);


    }

  }



  create(nom:string, cat:string, description:string){

    if(this.selectedC!=0 && cat.length!=0){

      cat="";

    }

    this.competence.nom=nom;
    this.competence.description=description;

    if((nom.length!=0 && description.length!=0 && cat.length==0 && this.selectedC!=0)){  //cas où tu choisis un thème existant
      
      if(!this.competencesE.some((e)=>e.themeC==nom)){
      
        this.themeCS.themeCFromId(this.selectedC).subscribe((a)=>{

          this.competence.themeC="/api/theme_cs/"+a.id;

            this.competenceS.createCompetence(this.competence).subscribe(async(b)=>{

              this.competenceF.comps.push("/api/competences/"+b.id);
          
              b.tabAs.push("/api/tab_as/"+this.id1);

              a.compets.push("/api/competences/"+b.id);

              await this.modifAll(a, b);

              window.location.reload();

              

            })


          


        })
        this.isLoading = true;

      }
      else{

        console.log("Compétence déjà existante")

      }



    }
    else if((nom.length!=0 && description.length!=0 && cat.length!=0 && this.selectedC==0)){  //thème non existant

      if(!this.competencesE.some((e)=>e.nom==nom)){

        this.themeC.nom=cat;

        this.themeCS.createThemeC(this.themeC).subscribe((b)=>{

          this.competence.themeC="/api/theme_cs/"+b.id;

          


          this.competenceS.createCompetence(this.competence).subscribe(async (b1)=>{

                  this.competenceF.comps.push("/api/competences/"+b1.id);

                  b1.tabAs.push("/api/tab_as/"+this.id1);

                  b.compets.push("/api/competences/"+b1.id);

                  await this.modifAll(b,b1);

                  window.location.reload();

                  


          })


        })

      }
      else{

        console.log("Compétence déjà existante")

      }
      
      this.isLoading = true;

    }


  }

  deletee(id:number){

    this.competenceS.deleteCompetenceFromId(id).subscribe(async(d)=>{
     
      if(d){
       
      await this.actualiserTab();

      this.filtrerLesCats();
      
  
      }

    })

   

  }

  ngOnInit(): void {
    if(this.authentication.isAuthentified){

    const frParameter: string | null = this.route.snapshot.paramMap.get('fr');
    const fnParameter: string | null = this.route.snapshot.paramMap.get('fn');

    if (frParameter !== null) {

      this.id=Number(frParameter);
 

    }

    if(fnParameter!==null){

    this.id1 = Number(fnParameter);
    
    this.competenceF.tabForN = "/api/for_niv_groupes/"+this.id;

    this.tabAS.getTabAAll(this.id1).subscribe((b) => {

      if(b[0]!==undefined){

      this.competenceF.id = b[0].id;
      this.competenceF.comps= b[0].comps.map((el:CompetenceWithIdO)=>{

        return "api/competences/"+el.id


      });
      
      this.competenceFVisuel=b[0];

      }

    });


  }
    
  let tabReq=forkJoin({

    theme:this.themeCS.all(),
    compet:this.competenceS.all()


  });

  tabReq.subscribe((rep)=>{

    this.themesT=rep.theme;
    this.competencesE=rep.compet;
    this.ready=true;



  })


    }
    

    
    

  }





}
