<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230702125614 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__for_niv_groupe AS SELECT id, formation_id, niveau_f_id, specialite_id, parcours_id, cout_total, nbgroupetd, nbgroupetp, crespe_b FROM for_niv_groupe');
        $this->addSql('DROP TABLE for_niv_groupe');
        $this->addSql('CREATE TABLE for_niv_groupe (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, formation_id INTEGER NOT NULL, niveau_f_id INTEGER NOT NULL, specialite_id INTEGER NOT NULL, parcours_id INTEGER NOT NULL, cout_total DOUBLE PRECISION NOT NULL, nbgroupetd INTEGER NOT NULL, nbgroupetp INTEGER NOT NULL, crespe_b BOOLEAN NOT NULL, CONSTRAINT FK_9A27AB4D5200282E FOREIGN KEY (formation_id) REFERENCES formation (id) ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_9A27AB4D1445002C FOREIGN KEY (niveau_f_id) REFERENCES niveau_f (id) ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_9A27AB4D2195E0F0 FOREIGN KEY (specialite_id) REFERENCES specialite (id) ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_9A27AB4D6E38C0DB FOREIGN KEY (parcours_id) REFERENCES parcours (id) ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO for_niv_groupe (id, formation_id, niveau_f_id, specialite_id, parcours_id, cout_total, nbgroupetd, nbgroupetp, crespe_b) SELECT id, formation_id, niveau_f_id, specialite_id, parcours_id, cout_total, nbgroupetd, nbgroupetp, crespe_b FROM __temp__for_niv_groupe');
        $this->addSql('DROP TABLE __temp__for_niv_groupe');
        $this->addSql('CREATE INDEX IDX_9A27AB4D6E38C0DB ON for_niv_groupe (parcours_id)');
        $this->addSql('CREATE INDEX IDX_9A27AB4D2195E0F0 ON for_niv_groupe (specialite_id)');
        $this->addSql('CREATE INDEX IDX_9A27AB4D1445002C ON for_niv_groupe (niveau_f_id)');
        $this->addSql('CREATE INDEX IDX_9A27AB4D5200282E ON for_niv_groupe (formation_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__for_niv_groupe AS SELECT id, formation_id, niveau_f_id, specialite_id, parcours_id, cout_total, nbgroupetd, nbgroupetp, crespe_b FROM for_niv_groupe');
        $this->addSql('DROP TABLE for_niv_groupe');
        $this->addSql('CREATE TABLE for_niv_groupe (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, formation_id INTEGER NOT NULL, niveau_f_id INTEGER NOT NULL, specialite_id INTEGER NOT NULL, parcours_id INTEGER NOT NULL, cout_total INTEGER NOT NULL, nbgroupetd INTEGER NOT NULL, nbgroupetp INTEGER NOT NULL, crespe_b BOOLEAN NOT NULL, CONSTRAINT FK_9A27AB4D5200282E FOREIGN KEY (formation_id) REFERENCES formation (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_9A27AB4D1445002C FOREIGN KEY (niveau_f_id) REFERENCES niveau_f (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_9A27AB4D2195E0F0 FOREIGN KEY (specialite_id) REFERENCES specialite (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_9A27AB4D6E38C0DB FOREIGN KEY (parcours_id) REFERENCES parcours (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO for_niv_groupe (id, formation_id, niveau_f_id, specialite_id, parcours_id, cout_total, nbgroupetd, nbgroupetp, crespe_b) SELECT id, formation_id, niveau_f_id, specialite_id, parcours_id, cout_total, nbgroupetd, nbgroupetp, crespe_b FROM __temp__for_niv_groupe');
        $this->addSql('DROP TABLE __temp__for_niv_groupe');
        $this->addSql('CREATE INDEX IDX_9A27AB4D5200282E ON for_niv_groupe (formation_id)');
        $this->addSql('CREATE INDEX IDX_9A27AB4D1445002C ON for_niv_groupe (niveau_f_id)');
        $this->addSql('CREATE INDEX IDX_9A27AB4D2195E0F0 ON for_niv_groupe (specialite_id)');
        $this->addSql('CREATE INDEX IDX_9A27AB4D6E38C0DB ON for_niv_groupe (parcours_id)');
    }
}
