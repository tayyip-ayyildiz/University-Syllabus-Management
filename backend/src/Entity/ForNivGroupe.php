<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ForNivGroupeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource]
#[ORM\Entity(repositoryClass: ForNivGroupeRepository::class)]
class ForNivGroupe
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'nbG')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Formation $formation = null;

    #[ORM\ManyToOne(inversedBy: 'nbG')]
    #[ORM\JoinColumn(nullable: false)]
    private ?NiveauF $niveauF = null;

    #[ORM\ManyToOne(inversedBy: 'nbG')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Specialite $specialite = null;

    #[ORM\ManyToOne(inversedBy: 'nbG')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Parcours $parcours = null;

    #[ORM\Column]
    private ?float $coutTotal = null;

    #[ORM\Column]
    private ?int $nbgroupetd = null;

    #[ORM\Column]
    private ?int $nbgroupetp = null;


    #[ORM\OneToMany(mappedBy: 'forNivGroupe', targetEntity: Link::class, orphanRemoval:true, cascade:["remove"])]
    private Collection $linkForNivG;

    #[ORM\Column]
    private ?bool $crespeB = null;

    #[ORM\OneToOne(mappedBy: 'tabForN', orphanRemoval: true, cascade: ['persist', 'remove'])]
    private ?TabA $tabA = null;

    

    public function __construct()
    {
        $this->linkForNivG = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFormation(): ?Formation
    {
        return $this->formation;
    }

    public function setFormation(?Formation $formation): static
    {
        $this->formation = $formation;

        return $this;
    }

    public function getNiveauF(): ?NiveauF
    {
        return $this->niveauF;
    }

    public function setNiveauF(?NiveauF $niveauF): static
    {
        $this->niveauF = $niveauF;

        return $this;
    }

    public function getSpecialite(): ?Specialite
    {
        return $this->specialite;
    }

    public function setSpecialite(?Specialite $specialite): static
    {
        $this->specialite = $specialite;

        return $this;
    }

    public function getCoutTotal(): ?int
    {
        return $this->coutTotal;
    }

    public function setCoutTotal(int $coutTotal): static
    {
        $this->coutTotal = $coutTotal;

        return $this;
    }

    public function getNbgroupetd(): ?int
    {
        return $this->nbgroupetd;
    }

    public function setNbgroupetd(int $nbgroupetd): static
    {
        $this->nbgroupetd = $nbgroupetd;

        return $this;
    }

    public function getNbgroupetp(): ?int
    {
        return $this->nbgroupetp;
    }

    public function setNbgroupetp(int $nbgroupetp): static
    {
        $this->nbgroupetp = $nbgroupetp;

        return $this;
    }

    /**
     * @return Collection<int, Link>
     */
    public function getLinkForNivG(): Collection
    {
        return $this->linkForNivG;
    }

    public function addLinkForNivG(Link $linkForNivG): static
    {
        if (!$this->linkForNivG->contains($linkForNivG)) {
            $this->linkForNivG->add($linkForNivG);
            $linkForNivG->setForNivGroupe($this);
        }

        return $this;
    }

    public function removeLinkForNivG(Link $linkForNivG): static
    {
        if ($this->linkForNivG->removeElement($linkForNivG)) {
            // set the owning side to null (unless already changed)
            if ($linkForNivG->getForNivGroupe() === $this) {
                $linkForNivG->setForNivGroupe(null);
            }
        }

        return $this;
    }

    public function getParcours(): ?Parcours
    {
        return $this->parcours;
    }

    public function setParcours(?Parcours $parcours): static
    {
        $this->parcours = $parcours;

        return $this;
    }

    public function isCrespeB(): ?bool
    {
        return $this->crespeB;
    }

    public function setCrespeB(bool $crespeB): static
    {
        $this->crespeB = $crespeB;

        return $this;
    }

    public function getTabA(): ?TabA
    {
        return $this->tabA;
    }

    public function setTabA(?TabA $tabA): static
    {
        // unset the owning side of the relation if necessary
        if ($tabA === null && $this->tabA !== null) {
            $this->tabA->setTabForN(null);
        }

        // set the owning side of the relation if necessary
        if ($tabA !== null && $tabA->getTabForN() !== $this) {
            $tabA->setTabForN($this);
        }

        $this->tabA = $tabA;

        return $this;
    }
    
}
