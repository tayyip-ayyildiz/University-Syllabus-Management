<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TabcRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource()]
#[ORM\Entity(repositoryClass: TabcRepository::class)]
class Tabc
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToMany(targetEntity: Competence::class, inversedBy: 'tabcs')]
    private Collection $comps;

    #[ORM\OneToOne(inversedBy: 'tabc', cascade: ['persist', 'remove'])]
    private ?Link $linkTabc = null;




    public function __construct()
    {
        $this->comps = new ArrayCollection();

    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, Competence>
     */
    public function getComps(): Collection
    {
        return $this->comps;
    }

    public function addComp(Competence $comp): static
    {
        if (!$this->comps->contains($comp)) {
            $this->comps->add($comp);
        }

        return $this;
    }

    public function removeComp(Competence $comp): static
    {
        $this->comps->removeElement($comp);

        return $this;
    }

    public function getLinkTabc(): ?Link
    {
        return $this->linkTabc;
    }

    public function setLinkTabc(?Link $linkTabc): static
    {
        $this->linkTabc = $linkTabc;

        return $this;
    }


}
