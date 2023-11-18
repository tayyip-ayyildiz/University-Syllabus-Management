<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\LinkRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LinkRepository::class)]
#[ApiResource]


class Link
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;


    #[ORM\ManyToOne(inversedBy: 'linkMatiere')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Matiere $matiere = null;

    #[ORM\Column]
    private ?int $hcm = null;

    #[ORM\Column]
    private ?int $htd = null;

    #[ORM\Column]
    private ?int $htp = null;

    #[ORM\ManyToOne(inversedBy: 'linkForNivG')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ForNivGroupe $forNivGroupe = null;

    #[ORM\Column]
    private ?float $coutHTD = null;

    #[ORM\Column]
    private ?float $coutTotal = null;

    #[ORM\OneToOne(mappedBy: 'linkTabc', cascade: ['persist', 'remove'])]
    private ?Tabc $tabc = null;


    public function __construct()
    {

    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMatiere(): ?Matiere
    {
        return $this->matiere;
    }

    public function setMatiere(?Matiere $matiere): self
    {
        $this->matiere = $matiere;

        return $this;
    }

    public function getHcm(): ?int
    {
        return $this->hcm;
    }

    public function setHcm(int $hcm): self
    {
        $this->hcm = $hcm;

        return $this;
    }

    public function getHtd(): ?int
    {
        return $this->htd;
    }

    public function setHtd(int $htd): self
    {
        $this->htd = $htd;

        return $this;
    }

    public function getHtp(): ?int
    {
        return $this->htp;
    }

    public function setHtp(int $htp): self
    {
        $this->htp = $htp;

        return $this;
    }

    public function getForNivGroupe(): ?ForNivGroupe
    {
        return $this->forNivGroupe;
    }

    public function setForNivGroupe(?ForNivGroupe $forNivGroupe): static
    {
        $this->forNivGroupe = $forNivGroupe;

        return $this;
    }

    public function getCoutHTD(): ?float
    {
        return $this->coutHTD;
    }

    public function setCoutHTD(float $coutHTD): static
    {
        $this->coutHTD = $coutHTD;

        return $this;
    }

    public function getCoutTotal(): ?float
    {
        return $this->coutTotal;
    }

    public function setCoutTotal(float $coutTotal): static
    {
        $this->coutTotal = $coutTotal;

        return $this;
    }

    public function getTabc(): ?Tabc
    {
        return $this->tabc;
    }

    public function setTabc(?Tabc $tabc): static
    {
        // unset the owning side of the relation if necessary
        if ($tabc === null && $this->tabc !== null) {
            $this->tabc->setLinkTabc(null);
        }

        // set the owning side of the relation if necessary
        if ($tabc !== null && $tabc->getLinkTabc() !== $this) {
            $tabc->setLinkTabc($this);
        }

        $this->tabc = $tabc;

        return $this;
    }




}
