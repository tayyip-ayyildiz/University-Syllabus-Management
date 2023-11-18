<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230628143134 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__tabc AS SELECT id, link_tabc_id FROM tabc');
        $this->addSql('DROP TABLE tabc');
        $this->addSql('CREATE TABLE tabc (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, link_tabc_id INTEGER DEFAULT NULL, CONSTRAINT FK_F7C700768E4CDAE FOREIGN KEY (link_tabc_id) REFERENCES link (id) ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO tabc (id, link_tabc_id) SELECT id, link_tabc_id FROM __temp__tabc');
        $this->addSql('DROP TABLE __temp__tabc');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_F7C700768E4CDAE ON tabc (link_tabc_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__tabc AS SELECT id, link_tabc_id FROM tabc');
        $this->addSql('DROP TABLE tabc');
        $this->addSql('CREATE TABLE tabc (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, link_tabc_id INTEGER NOT NULL, CONSTRAINT FK_F7C700768E4CDAE FOREIGN KEY (link_tabc_id) REFERENCES link (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO tabc (id, link_tabc_id) SELECT id, link_tabc_id FROM __temp__tabc');
        $this->addSql('DROP TABLE __temp__tabc');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_F7C700768E4CDAE ON tabc (link_tabc_id)');
    }
}
