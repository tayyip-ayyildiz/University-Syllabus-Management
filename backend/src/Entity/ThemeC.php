<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ThemeCRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ThemeCRepository::class)]
#[ApiResource]
class ThemeC
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\OneToMany(mappedBy: 'themeC', targetEntity: Competence::class, orphanRemoval: true, cascade:["remove"])]

    private Collection $compets;


    public function __construct()
    {
        $this->compets = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }


    /**
     * @return Collection<int, Competence>
     */
    public function getCompets(): Collection
    {
        return $this->compets;
    }

    public function addCompet(Competence $compet): static
    {
        if (!$this->compets->contains($compet)) {
            $this->compets->add($compet);
            $compet->setThemeC($this);
        }

        return $this;
    }

    public function removeCompet(Competence $compet): static
    {
        if ($this->compets->removeElement($compet)) {
            // set the owning side to null (unless already changed)
            if ($compet->getThemeC() === $this) {
                $compet->setThemeC(null);
            }
        }

        return $this;
    }
}
