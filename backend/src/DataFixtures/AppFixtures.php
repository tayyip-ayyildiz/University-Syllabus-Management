<?php

namespace App\DataFixtures;

use App\Entity\Formation;
use App\Entity\ForNivGroupe;
use App\Entity\NiveauF;
use App\Entity\Parcours;
use App\Entity\Specialite;
use App\Entity\Tarif;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void {

        /*$t=new Tarif();

        $t->setRatioTP(0.66);

        $formation = new Formation();

        $formation->setNom("Licence Info")->setDescription("dzdzd")->setRatioTarif($t);

        $t->addFormationsT($formation);

        $parc1=new Parcours();
        $n=new NiveauF();
        $s=new Specialite();

        $parc1->setNom("Formation Initiale")->setDescription("");
        $n->setNom("L1");
        $s->setNom("Inge")->setDescription("fdfffdf");

        $forn=new ForNivGroupe();

        $forn->setFormation($formation)->setNiveauF($n)->setSpecialite($s)->setParcours($parc1)->setCoutTotal(0)->setNbgroupetd(2)->setNbgroupetp(4)->setCrespeB(false);
    
        $formation->addNbG($forn);

        $parc1->addNbG($forn);

        $s->addNbG($forn);

        $n->addNbG($forn);
        
        $manager->persist($t);

        $manager->persist($formation);

        $manager->persist($parc1);
        $manager->persist($n);
        $manager->persist($s);
        
        
        
        
        
        
        
        $manager->persist($forn);        */


        $manager->flush();
    }
}
