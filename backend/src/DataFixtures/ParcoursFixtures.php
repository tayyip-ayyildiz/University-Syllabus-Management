<?php

namespace App\DataFixtures;

use App\Entity\NiveauF;
use App\Entity\Parcours;
use App\Entity\Specialite;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ParcoursFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {

        
        $parc1=new Parcours();
        $parc2=new Parcours();
        $parc3=new Parcours();
        
        $n=new NiveauF();
        $n2=new NiveauF();
        $n3=new NiveauF();
        $n4=new NiveauF();
        $n5=new NiveauF();

        $s=new Specialite();

        $parc1->setNom("Formation Initiale")->setDescription("");

        $parc2->setNom("Formation Continue")->setDescription("");

        $parc3->setNom("Alternance")->setDescription("");


        $n->setNom("L1");

        $n2->setNom("L2");

        $n3->setNom("L3");

        $n4->setNom("M1");

        $n5->setNom("M2");

        $s->setNom("Test")->setDescription("dsddiuqd");

        $manager->persist($n);

        $manager->persist($n2);

        $manager->persist($n3);

        $manager->persist($n4);

        $manager->persist($n5);

        $manager->persist($parc1);

        $manager->persist($parc2);
        
        $manager->persist($parc3);

        $manager->persist($s);

        

        $manager->flush();
    }
}
