<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TabARepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource]
#[ORM\Entity(repositoryClass: TabARepository::class)]
class TabA
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToMany(targetEntity: Competence::class, inversedBy: 'tabAs')]
    private Collection $comps;

    #[ORM\OneToOne(inversedBy: 'tabA', cascade: ['persist', 'remove'])]
    private ?ForNivGroupe $tabForN = null;

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

    public function getTabForN(): ?ForNivGroupe
    {
        return $this->tabForN;
    }

    public function setTabForN(?ForNivGroupe $tabForN): static
    {
        $this->tabForN = $tabForN;

        return $this;
    }
}
