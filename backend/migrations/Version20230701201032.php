<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230701201032 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__link AS SELECT id, for_niv_groupe_id, hcm, htd, htp, cout_htd, cout_total FROM link');
        $this->addSql('DROP TABLE link');
        $this->addSql('CREATE TABLE link (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, for_niv_groupe_id INTEGER NOT NULL, matiere_id INTEGER NOT NULL, hcm INTEGER NOT NULL, htd INTEGER NOT NULL, htp INTEGER NOT NULL, cout_htd DOUBLE PRECISION NOT NULL, cout_total DOUBLE PRECISION NOT NULL, CONSTRAINT FK_36AC99F1F6FA0B70 FOREIGN KEY (for_niv_groupe_id) REFERENCES for_niv_groupe (id) ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_36AC99F1F46CD258 FOREIGN KEY (matiere_id) REFERENCES matiere (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO link (id, for_niv_groupe_id, hcm, htd, htp, cout_htd, cout_total) SELECT id, for_niv_groupe_id, hcm, htd, htp, cout_htd, cout_total FROM __temp__link');
        $this->addSql('DROP TABLE __temp__link');
        $this->addSql('CREATE INDEX IDX_36AC99F1F6FA0B70 ON link (for_niv_groupe_id)');
        $this->addSql('CREATE INDEX IDX_36AC99F1F46CD258 ON link (matiere_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__link AS SELECT id, for_niv_groupe_id, hcm, htd, htp, cout_htd, cout_total FROM link');
        $this->addSql('DROP TABLE link');
        $this->addSql('CREATE TABLE link (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, for_niv_groupe_id INTEGER NOT NULL, hcm INTEGER NOT NULL, htd INTEGER NOT NULL, htp INTEGER NOT NULL, cout_htd DOUBLE PRECISION NOT NULL, cout_total DOUBLE PRECISION NOT NULL, CONSTRAINT FK_36AC99F1F6FA0B70 FOREIGN KEY (for_niv_groupe_id) REFERENCES for_niv_groupe (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO link (id, for_niv_groupe_id, hcm, htd, htp, cout_htd, cout_total) SELECT id, for_niv_groupe_id, hcm, htd, htp, cout_htd, cout_total FROM __temp__link');
        $this->addSql('DROP TABLE __temp__link');
        $this->addSql('CREATE INDEX IDX_36AC99F1F6FA0B70 ON link (for_niv_groupe_id)');
    }
}
