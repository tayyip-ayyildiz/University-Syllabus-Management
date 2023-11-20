import { concatMap, firstValueFrom, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';
import { FormationService } from './../services/formation.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormatWidth, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatiereService } from '../services/matiere.service';
import { NiveauxFService } from '../services/niveaux-f.service';
import { Matiere } from 'src/Entity/Matiere';
import { RatiotpService } from '../services/ratiotp.service';
import { Link } from 'src/Entity/Link';
import { Tabc } from 'src/Entity/Tabc';
import { ForNivGroupe } from 'src/Entity/ForNivGroupe';
import { ForNivService } from '../services/for-niv.service';
import { TabcService } from '../services/tabc.service';
import { ThemeM } from 'src/Entity/ThemeM';
import { ThemeMService } from '../services/theme-m.service';
import { CompetenceWithId, ForNivGroupeWithId, FormationWithId, LinkWithId, MatiereWithId, NiveauFWithId, ParcoursWithId, SpecialiteWithId, TabAWithId, TabcWithId, ThemeMWithId } from 'src/api.interface';
import { LinkService } from '../services/link.service';
import { ParcoursService } from '../services/parcours.service';
import { SpecialiteService } from '../services/specialite.service';
import { AuthentificationService } from '../services/authentification.service';
import { TabAService } from '../services/tab-a.service';
import { CompetenceService } from '../services/competence.service';
import { CdkDragDrop, copyArrayItem } from '@angular/cdk/drag-drop';
import { LinkWithIdO } from 'src/Entity/LinkWithIdO';




@Component({
  selector: 'app-create-m',
  templateUrl: './create-m.component.html',
  styleUrls: ['./create-m.component.css']
})


export class CreateMComponent implements OnInit{

  id:number|undefined=undefined
  id1:number|undefined=undefined

  f:number
  n:number
  s:number
  p:number

  competenceFNomCreate:Array<CompetenceWithId>
  selectedC:number
  
  page = 0
  itemsPerPage:number = 3
  isLoading: boolean = false;

  mat:Matiere={

    nom:"",
    description:"",
    themeM:"",
    linkMatiere:new Array(),
    

  }

  mat1:MatiereWithId={

    id:0,
    nom:"",
    description:"",
    themeM:"",
    linkMatiere:new Array(),
    

  }

  totk:Link={


    matiere:"",
    hcm:0,
    htd:0,
    htp:0,
    forNivGroupe:"",
    coutHTD:0,
    coutTotal:0,
    tabc:""

  }

  totk1:LinkWithId={

    id:0,
    matiere:"",
    hcm:0,
    htd:0,
    htp:0,
    forNivGroupe:"",
    coutHTD:0,
    coutTotal:0,
    tabc:""


  }

  ready:boolean

  competence:TabAWithId={   //les compétences de la formation niveau (all)

    id:0,
    comps:new Array(),          //stocker les ids des compétences ici
    tabForN:""

  }

  competenceCreate:Tabc={   //competence spécifique à la matière

    comps:new Array(),          //stocker les ids des compétences ici
    linkTabc:null

  }

  forN:ForNivGroupe={

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

  themeMM:ThemeM={          //variable pour créer un themeM

    nom:"",
    matieres:new Array()

  }

  themes:Array<ThemeMWithId>  //thèmes déjà créer

  matieresE:Array<MatiereWithId>
  matieresEF:Array<MatiereWithId>

  mats:Array<LinkWithIdO>    //mats créer pour cette formation de ce niveau avec la spé et parcours

  selectedT:number          //id du thème (si séléctionné)
  selectedM:number
  selectedTM:number

  competenceFNom:Array<CompetenceWithId>



  nomB:boolean          //boolean pour les champs manquants
  themeB:boolean
  descriptionB:boolean
  heurecmB:boolean
  heuretdB:boolean
  heuretpB:boolean
  nbGTDB:boolean
  nbGTPB:boolean
  coutTDB:boolean
  compsB:boolean
  modif:boolean
  filtrer:boolean


  constructor(private matiereS:MatiereService, private authentication: AuthentificationService, private competenceS:CompetenceService,
    private forNS:ForNivService, private linkS:LinkService, private parcoursS:ParcoursService, private ratiotpS:RatiotpService,
    private specialiteS:SpecialiteService, 
    private niveauS:NiveauxFService, 
    private formationS:FormationService,
    private tabcS:TabcService,
    private tabAS:TabAService, 
    private themeMS:ThemeMService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {
      
      this.selectedC=0;
      this.competenceFNomCreate=[];
      this.ready=false;
      this.nomB=true;
      this.themeB=true;
      this.descriptionB=true;
      this.heurecmB=true;
      this.heuretdB=true;
      this.heuretpB=true;
      this.nbGTDB=true;
      this.nbGTPB=true;
      this.coutTDB=true;
      this.compsB=true;
      this.modif=false;
      this.filtrer=false;
      this.themes=[];
      this.mats=[];
      this.competenceFNom=[];
      this.matieresE=[];
      this.matieresEF=[];
      this.selectedT=0;
      this.selectedM=0;
      this.f=0;
      this.n=0;
      this.s=0;
      this.p=0;
      this.selectedTM=0;



  }

  getMatieres():boolean{  //fonction qui force la personne à choisir au moins 1 compétence
    
   return this.mats.length==0

  }

  public get isAuthentified() {

    return this.authentication.isAuthentified 
   
 }

 async filtrerLesCats(){

  this.matieresEF=this.matieresE.filter(mat=>{

    return this.selectedT==this.getId(mat.themeM);

  })

  .map(e => {

    let tab1 = e.themeM.split("/");
    let copieO = { ...e }; // Crée une copie de l'objet e
    this.themeMS.themeMFromId(parseInt(tab1[tab1.length - 1])).subscribe(a => {
      copieO.themeM = a.nom; // Modifie la copie de l'objet, pas l'objet d'origine

    });
    return copieO; // Retourne la copie de l'objet modifié
  });

  this.matieresEF.length==0?this.filtrer=true:this.filtrer=false;

  this.filtrer=true;

    

}

  goB(){

    this.location.back();
    this.router.navigate(["/competences", this.id, this.id1]);

  }

  next():void{

    this.location.forward();
    this.router.navigate(["/formation"])

  }

  async actualiserTab(){


    let q=await firstValueFrom(this.matiereS.all());
    

    this.matieresE=q;

  }


  deletee(id: number) {

    if (this.id !== undefined) {
      this.forNS.forNivGroupeFromId(this.id).pipe(
        concatMap(f => {
          return this.linkS.linkFromId(id).pipe(
            concatMap(l => this.coutTotal(f, l, false))
          );
        })
      ).subscribe(async () => {
        
        this.linkS.deleteLinkFromId(id).subscribe((a)=>{
          const totalItems = this.mats.length;
          const currentPageItems = (totalItems % this.itemsPerPage);
     
          if (currentPageItems === 0 && this.page > 1) {
            // Si la page courante contient le dernier élément et il n'y a pas d'autres éléments sur cette page
            // alors revenir à la page précédente
            this.page--;
          } 
          if(a){

            window.location.reload();

          }

        })
      });
    }
  }

    

  async themeS(theme:string){

    if(theme.length!=0 && this.selectedTM==0){ //s'il choisit de créer un thème

      this.themeMM.nom=theme;

      let t= await firstValueFrom(this.themeMS.createThemeM(this.themeMM));

      return t.id;


    }

    else{  //s'il choisit un thème déjà créer

      return this.selectedTM;

    }



  }


  chooseMat(m:number){

    if(this.matieresE.some((e)=>e.id==m)){

      console.log("Existe déjà")

    }

    else{

      this.matiereS.matiereFromId(m).subscribe((m1)=>{

      this.mat.nom=m1.nom;
      this.selectedTM=this.getId(m1.themeM);
      this.mat.description=m1.description;
      this.selectedM=m1.id;


      })

    }
    

  }

  resetM(){

    this.mat.nom="";
    this.mat.themeM="";
    this.mat.linkMatiere=new Array();
    this.mat.description="";


  }

  abortchooseMat(){

    this.resetM();
    this.filtrerLesCats();
    


  }



  async coutTotal(f:ForNivGroupeWithId, l:LinkWithId, b:boolean){


    let tarifTP=await firstValueFrom(this.ratiotpS.all());

    l.coutTotal=l.hcm*1.5+f.nbgroupetd*1+f.nbgroupetp*tarifTP[0].ratioTP;

    if(b){


    f.coutTotal+=l.coutTotal;

    }

    else{

      f.coutTotal-=l.coutTotal;

      f.linkForNivG.splice(f.linkForNivG.indexOf("api/links/"+l.id),1)

      this.forNS.modifyForNivGroupe(f)
      .subscribe(() => {
        // Les requêtes ont été exécutées l'une après l'autre avec succès
      });
      


    }


  }


  async create(nom:string, theme:string, description:string, heureCM:number, heureTD:number, heureTP:number, coutTD:number){
    
    this.competenceFNomCreate.forEach((e)=>{
      this.competenceCreate.comps.push("/api/competences/"+e.id);
    })
    if(nom.length!=0 && (theme.length!=0 || this.selectedTM!=0) && description.length!=0 && heureCM>=0 && heureTD>=0 && heureTP>=0 && coutTD>0 && this.competenceCreate.comps.length!=0){
      this.isLoading = true;


      //association des différents paramètres

      this.mat.nom=nom;
      this.mat.description=description;

      this.totk.hcm=heureCM;
      this.totk.htd=heureTD;
      this.totk.htp=heureTP;
      this.totk.coutHTD=coutTD;
      this.totk.forNivGroupe="/api/for_niv_groupes/"+this.id;
      
      

      if(theme.length!=0 && this.selectedTM!=0){  //dans le cas où il remplit les 2 champs

        theme="";

      }

      if(!this.matieresE.some(e=>e.nom==this.mat.nom) || this.selectedM!=0){   //vérifie que la matière n'est pas déja crée

        let m:MatiereWithId={

          id:0,
          nom:"",
          themeM:"",
          description:"",
          linkMatiere:new Array()
  
        }
  
        let themeID:number;
  
        if(this.selectedM==0){
  
          themeID=await this.themeS(theme);
  
          this.mat.themeM="/api/theme_ms/"+themeID;
  
          m=await firstValueFrom(this.matiereS.createMatiere(this.mat));
  
  
        }
  
        else{ //selectedM = id
  
          m.id=this.selectedM;
          themeID=this.selectedTM;
  
        }
  
  
          this.totk.matiere="/api/matieres/"+m.id;
  
          this.tabcS.createTabc(this.competenceCreate).subscribe((t)=>{  //création du sous tableau pour une matière
  
            this.totk.tabc="/api/tabcs/"+t.id;
  
            this.linkS.createLink(this.totk).subscribe(async(l)=>{
  
              t.linkTabc="/api/links/"+l.id;
  
              m.linkMatiere.push("/api/links/"+l.id);
  
              this.forN.linkForNivG.push("/api/links/"+l.id);
  
              let tempId:number=0;
  
              if(this.id!==undefined){
  
                tempId=this.id;
  
              }
  
              let forWithId:ForNivGroupeWithId={   //création d'un ForNivGroupeWithId temp afin de pouvoir le modifier
  
                id:tempId,
                formation:this.forN.formation,
                niveauF:this.forN.niveauF,
                specialite:this.forN.specialite,
                parcours:this.forN.parcours,
                coutTotal:this.forN.coutTotal,
                nbgroupetd:this.forN.nbgroupetd,
                nbgroupetp:this.forN.nbgroupetp,
                linkForNivG:this.forN.linkForNivG,
                crespeB:this.forN.crespeB,
                tabA:this.forN.tabA
  
              }

              await this.coutTotal(forWithId, l, true);
  
              let requestsFrom=forkJoin({
  
                f:this.formationS.formationFromId(this.f),
                n:this.niveauS.niveauxFFromId(this.n),
                s:this.specialiteS.specialiteFromId(this.s),
                p:this.parcoursS.parcoursFromId(this.p),
                t:this.themeMS.themeMFromId(themeID),
                a:this.forNS.modifyForNivGroupe(forWithId),
                b:this.linkS.modifyLink(l),
                c:this.tabcS.modifyTabc(t),
                d:this.tabAS.modifyTaba(this.competence),
                e:this.matiereS.modifyMatiere(m),
  
              });
  
              requestsFrom.subscribe(async(res)=>{
                res.t.matieres.push("/api/matieres/"+m.id);
  
                await firstValueFrom(this.formationS.modifyFormation(res.f));
                await firstValueFrom(this.niveauS.modifyNiveauxF(res.n));
                await firstValueFrom(this.parcoursS.modifyParcours(res.p));
                await firstValueFrom(this.specialiteS.modifySpecialite(res.s));
                await firstValueFrom(this.themeMS.modifyThemeM(res.t));
  
  
                window.location.reload(); 
  
              })
  
            })
  
          })

      }

      else{


        console.log("matire existe déja");
        this.resetM();

      }

      


    }


    else{

      nom.length==0?this.nomB=false:this.nomB=true;

      theme.length==0?this.themeB=false:this.themeB=true;
      
      description.length==0?this.descriptionB=false:this.descriptionB=true;

      heureCM<0?this.heurecmB=false:this.heurecmB=true;

      heureTD<0?this.heuretdB=false:this.heuretdB=true;

      heureTP<0?this.heuretpB=false:this.heuretpB=true;

      coutTD<=0?this.coutTDB=false:this.coutTDB=true;




    }

  }

  getId(path: string): number {
    const tab = path.split('/');
    return parseInt(tab[tab.length - 1]);
  }

  ngOnInit(): void {
    if(this.authentication.isAuthentified){

    const frParameter: string | null = this.route.snapshot.paramMap.get('fr');   //fr = id de ForNIvGroupe (cf MCD)
    const fnParameter: string | null = this.route.snapshot.paramMap.get('fn');  // fn = id de TabA (cf MCD)
    //const lkParameter: string | null = this.route.snapshot.paramMap.get('lk');  // lk = link pour modif


      if (frParameter !== null) {

        this.id = Number(frParameter)

        this.forNS.forNivGroupeFromId(this.id).subscribe((a)=>{

          this.forN=a;

          this.f=this.getId(this.forN.formation);
          this.n=this.getId(this.forN.niveauF);
          this.s=this.getId(this.forN.specialite)
          this.p=this.getId(this.forN.parcours);


          //jointure afin de récupérer toutes les matières en fonction des paramètre

          if(this.id!==undefined){

          this.linkS.getLinkWithAll(this.id).subscribe((tabs:any[]) => {
            this.mats=tabs;

          });

        }
          


        })

        if(fnParameter!==null){

          this.id1=Number(fnParameter);

          this.tabAS.tabAFromId(this.id1).subscribe((b)=>{

            this.competence=b;

            let competenceObs = b.comps.map((el) => {
              
              return this.competenceS.competenceFromId(this.getId(el));

      
            });

            forkJoin(competenceObs).subscribe((competences) => {
      
              
              this.competenceFNom = competences;
              this.ready=true;
      
            });

          })

        }
      
      }

      /*if(lkParameter!==null){  //A REVOIR

        this.linkS.linkFromId(Number(lkParameter)).subscribe((c)=>{

          this.totk1=c;

          let tabl=c.matiere.split("/");

          this.matiereS.matiereFromId(parseInt(tabl[tabl.length-1])).subscribe((d)=>{


            this.mat1=d;

            let tabl1=this.mat1.themeM.split("/");

            this.themeMS.themeMFromId(parseInt(tabl1[tabl.length-1])).subscribe((e)=>{

              this.selectedT=e.id;
              this.modif=true;
              this.ready=true;


            })

          })


        })


      }*/


      let tabReq=forkJoin({

        theme:this.themeMS.all(),
        matiere:this.matiereS.all()


      });

      tabReq.subscribe((res)=>{

        this.themes=res.theme;
        this.matieresE=res.matiere

        
        

      })



  }
}

  drop(event: CdkDragDrop<CompetenceWithId[]>) {
    if (event.previousContainer !== event.container) {
      const alreadyExists = event.container.data.indexOf(event.previousContainer.data[event.previousIndex]) > -1;
      if (!alreadyExists) {
        copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
      }
    }
  }


  dropBack(event: CdkDragDrop<CompetenceWithId[]>) {
    if (event.previousContainer !== event.container) {
      const alreadyExists = event.container.data.indexOf(event.previousContainer.data[event.previousIndex]) > -1;
      if (!alreadyExists) {
        copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
      }
      else {
        event.previousContainer.data.splice(event.previousIndex, 1);
      }
    }
  }
}
