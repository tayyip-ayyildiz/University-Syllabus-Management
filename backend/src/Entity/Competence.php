<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CompetenceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource]
#[ORM\Entity(repositoryClass: CompetenceRepository::class)]
class Competence
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'compets')]
    #[ORM\JoinColumn(nullable: false)]

    private ?ThemeC $themeC = null;

    #[ORM\ManyToMany(targetEntity: Tabc::class, mappedBy: 'comps', cascade:["remove"])]
    private Collection $tabcs;

    #[ORM\ManyToMany(targetEntity: TabA::class, mappedBy: 'comps')]
    private Collection $tabAs;

    public function __construct()
    {
        
        $this->tabcs = new ArrayCollection();
        $this->tabAs = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getThemeC(): ?ThemeC
    {
        return $this->themeC;
    }

    public function setThemeC(?ThemeC $themeC): static
    {
        $this->themeC = $themeC;

        return $this;
    }

    /**
     * @return Collection<int, Tabc>
     */
    public function getTabcs(): Collection
    {
        return $this->tabcs;
    }

    public function addTabc(Tabc $tabc): static
    {
        if (!$this->tabcs->contains($tabc)) {
            $this->tabcs->add($tabc);
            $tabc->addComp($this);
        }

        return $this;
    }

    public function removeTabc(Tabc $tabc): static
    {
        if ($this->tabcs->removeElement($tabc)) {
            $tabc->removeComp($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, TabA>
     */
    public function getTabAs(): Collection
    {
        return $this->tabAs;
    }

    public function addTabA(TabA $tabA): static
    {
        if (!$this->tabAs->contains($tabA)) {
            $this->tabAs->add($tabA);
            $tabA->addComp($this);
        }

        return $this;
    }

    public function removeTabA(TabA $tabA): static
    {
        if ($this->tabAs->removeElement($tabA)) {
            $tabA->removeComp($this);
        }

        return $this;
    }

}
