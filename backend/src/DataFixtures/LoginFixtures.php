<?php

namespace App\DataFixtures;

use App\Entity\Login;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Validator\Constraints\Date;

class LoginFixtures extends Fixture
{
    public function load(ObjectManager $manager){

        $log=new Login();

        $log->setNom("AYYILDIZ")->setPrenom("Tayyip")->setEmail("tayyip45140@gmail.com")->setPassword('$2y$13$QVccrnqpAyuv9IVMdU6oSOMmuXdzDmL9WeTM3WV1fAWFGswUUWqtC')->setDatedenaissance(DateTime::createFromFormat('Y-m-d', '2002-11-23'))->setTel(1234567890)->addRoles('ROLE_ADMIN');

        $manager->persist($log);

        $manager->flush();
    }
}
