<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MatiereRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MatiereRepository::class)]
#[ApiResource]
class Matiere
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\ManyToOne(inversedBy: 'matieres')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ThemeM $themeM = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'matiere', targetEntity: Link::class, orphanRemoval: true, cascade:["remove"])]
    private Collection $linkMatiere;


    public function __construct()
    {
        
        $this->linkMatiere = new ArrayCollection();

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

    /**
     * @return Collection<int, Link>
     */
    public function getLinkMatiere(): Collection
    {
        return $this->linkMatiere;
    }

    public function addLinkMatiere(Link $linkMatiere): self
    {
        if (!$this->linkMatiere->contains($linkMatiere)) {
            $this->linkMatiere->add($linkMatiere);
            $linkMatiere->setMatiere($this);
        }

        return $this;
    }

    public function removeLinkMatiere(Link $linkMatiere): self
    {
        if ($this->linkMatiere->removeElement($linkMatiere)) {
            // set the owning side to null (unless already changed)
            if ($linkMatiere->getMatiere() === $this) {
                $linkMatiere->setMatiere(null);
            }
        }

        return $this;
    }

    public function getThemeM(): ?ThemeM
    {
        return $this->themeM;
    }

    public function setThemeM(?ThemeM $themeM): static
    {
        $this->themeM = $themeM;

        return $this;
    }

}
