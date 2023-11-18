<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FormationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FormationRepository::class)]
#[ApiResource]
class Formation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'formationsT')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Tarif $ratioTarif = null;

    #[ORM\OneToMany(mappedBy: 'formation', targetEntity: ForNivGroupe::class, cascade:["remove"])]
    private Collection $nbG;



    public function __construct()
    {
        $this->nbG = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getRatioTarif(): ?Tarif
    {
        return $this->ratioTarif;
    }

    public function setRatioTarif(?Tarif $ratioTarif): self
    {
        $this->ratioTarif = $ratioTarif;

        return $this;
    }

    /**
     * @return Collection<int, ForNivGroupe>
     */
    public function getNbG(): Collection
    {
        return $this->nbG;
    }

    public function addNbG(ForNivGroupe $nbG): static
    {
        if (!$this->nbG->contains($nbG)) {
            $this->nbG->add($nbG);
            $nbG->setFormation($this);
        }

        return $this;
    }

    public function removeNbG(ForNivGroupe $nbG): static
    {
        if ($this->nbG->removeElement($nbG)) {
            // set the owning side to null (unless already changed)
            if ($nbG->getFormation() === $this) {
                $nbG->setFormation(null);
            }
        }

        return $this;
    }

}
