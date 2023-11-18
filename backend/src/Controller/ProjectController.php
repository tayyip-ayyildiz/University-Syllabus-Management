<?php



namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Nelmio\CorsBundle\Annotation\Cors;

use ApiPlatform\Metadata\ApiResource;

use App\Entity\Formation;
use App\Entity\ForNivGroupe;
use App\Entity\Link;
use App\Entity\Matiere;
use App\Entity\TabA;

class ProjectController extends AbstractController{

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager){

        $this->entityManager = $entityManager;
    
    }

    
    /**
    * @Route("/api/forniv/{formation_id}/{niveau_f_id}/{specialite_id}/{parcours_id}", name="api_get_all_forn", methods={"GET"})
    */

    public function getForNivWithId($formation_id, $niveau_f_id, $specialite_id, $parcours_id) {
        $query = $this->entityManager->createQueryBuilder()
            ->select('l', 'f', 'n', 'p', 's')
            ->from(ForNivGroupe::class, 'l')
            ->join('l.formation', 'f')
            ->join('l.niveauF', 'n')
            ->join('l.parcours', 'p')
            ->join('l.specialite', 's')
            ->where('f.id = :formation_id')
            ->andWhere('n.id = :niveau_f_id')
            ->andWhere('s.id = :specialite_id')
            ->andWhere('p.id = :parcours_id')
            ->setParameter('formation_id', $formation_id)
            ->setParameter('niveau_f_id', $niveau_f_id)
            ->setParameter('specialite_id', $specialite_id)
            ->setParameter('parcours_id', $parcours_id)
            ->getQuery();
        

        $result = $query->getArrayResult();
    
        $response = new JsonResponse(['hydra:member' => $result]);
    
        return $response;
    }

    /**
    * @Route("/api/linkWithAll/{forNiv_id}", name="api_get_all_linkWithAll", methods={"GET"})
    */

    public function getLinkWithAll($forNiv_id) {
        $query = $this->entityManager->createQueryBuilder()
            ->select('l','m', 'f','n', 's', 'p','theme','for', 'tabc', 'comps')
            ->from(Link::class, 'l')
            ->join('l.matiere','m')
            ->join('m.themeM','theme')
            ->join('l.forNivGroupe','for')
            ->join('for.formation','f')
            ->join('for.niveauF','n')
            ->join('for.specialite','s')
            ->join('for.parcours','p')
            ->join('l.tabc','tabc')
            ->join('tabc.comps','comps')
            ->where('l.forNivGroupe = :for_id')
            ->setParameter('for_id', $forNiv_id)
            ->getQuery();
        

        $result = $query->getArrayResult();
    
        $response = new JsonResponse(['hydra:member' => $result]);
    
        return $response;
    }

    /**
    * @Route("/api/ForNivWithAll", name="api_get_all_ForNivWithAll", methods={"GET"})
    */

    public function getAllForNivGroup() {
        $query = $this->entityManager->createQueryBuilder()
            ->select('f', 'n', 'p', 's', 'for')
            ->from(ForNivGroupe::class, 'for')
            ->join('for.formation', 'f')
            ->join('for.niveauF', 'n')
            ->join('for.parcours', 'p')
            ->join('for.specialite', 's')
            ->getQuery();
        

        $result = $query->getArrayResult();
    
        $response = new JsonResponse(['hydra:member' => $result]);
    
        return $response;
    }

    /**
    * @Route("/api/TabAAll/{id}", name="api_get_all_TabAAll", methods={"GET"})
    */

    public function getTabAAll($id) {
        $query = $this->entityManager->createQueryBuilder()
            ->select('t','comps','tc','for')
            ->from(TabA::class, 't')
            ->join('t.comps', 'comps')
            ->join('comps.themeC','tc')
            ->join('t.tabForN', 'for')
            ->where('t.id = :t_id')
            ->setParameter('t_id', $id)
            ->getQuery();
        

        $result = $query->getArrayResult();
    
        $response = new JsonResponse(['hydra:member' => $result]);
    
        return $response;
    }


    
    



    #[Route('/', name: 'app_project')]
    public function index(): Response
    {
        return $this->render('project/index.html.twig', [
            'controller_name' => 'ProjectController',
        ]);
    }
}
