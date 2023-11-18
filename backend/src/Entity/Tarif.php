<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TarifRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource]
#[ORM\Entity(repositoryClass: TarifRepository::class)]
class Tarif
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $ratioTP = null;

   #[ORM\OneToMany(mappedBy: 'ratioTarif', targetEntity: Formation::class, orphanRemoval: true, cascade: ["remove"])]
    private Collection $formationsT;

    

    public function __construct()
    {
        $this->formationsT = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getRatioTP(): ?float
    {
        return $this->ratioTP;
    }

    public function setRatioTP(float $ratioTP): self
    {
        $this->ratioTP = $ratioTP;

        return $this;
    }

     /**
     * @return Collection<int, Formation>
     */
    public function getFormationsT(): Collection
    {
        return $this->formationsT;
    }

    public function addFormationsT(Formation $formationsT): self
    {
        if (!$this->formationsT->contains($formationsT)) {
            $this->formationsT->add($formationsT);
            $formationsT->setRatioTarif($this);
        }

        return $this;
    }

    public function removeFormationsT(Formation $formationsT): self
    {
        if ($this->formationsT->removeElement($formationsT)) {
            // set the owning side to null (unless already changed)
            if ($formationsT->getRatioTarif() === $this) {
                $formationsT->setRatioTarif(null);
            }
        }

        return $this;
    }
}
