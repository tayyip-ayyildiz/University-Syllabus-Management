<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230628141613 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__tab_a AS SELECT id, tab_for_n_id FROM tab_a');
        $this->addSql('DROP TABLE tab_a');
        $this->addSql('CREATE TABLE tab_a (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, tab_for_n_id INTEGER DEFAULT NULL, CONSTRAINT FK_52F2E6F60109204 FOREIGN KEY (tab_for_n_id) REFERENCES for_niv_groupe (id) ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO tab_a (id, tab_for_n_id) SELECT id, tab_for_n_id FROM __temp__tab_a');
        $this->addSql('DROP TABLE __temp__tab_a');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_52F2E6F60109204 ON tab_a (tab_for_n_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__tab_a AS SELECT id, tab_for_n_id FROM tab_a');
        $this->addSql('DROP TABLE tab_a');
        $this->addSql('CREATE TABLE tab_a (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, tab_for_n_id INTEGER NOT NULL, CONSTRAINT FK_52F2E6F60109204 FOREIGN KEY (tab_for_n_id) REFERENCES for_niv_groupe (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO tab_a (id, tab_for_n_id) SELECT id, tab_for_n_id FROM __temp__tab_a');
        $this->addSql('DROP TABLE __temp__tab_a');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_52F2E6F60109204 ON tab_a (tab_for_n_id)');
    }
}
