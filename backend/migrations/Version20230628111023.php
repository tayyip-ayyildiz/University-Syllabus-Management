<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230628111023 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE competence (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, theme_c_id INTEGER NOT NULL, nom VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, CONSTRAINT FK_94D4687FDB106FEE FOREIGN KEY (theme_c_id) REFERENCES theme_c (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_94D4687FDB106FEE ON competence (theme_c_id)');
        $this->addSql('CREATE TABLE for_niv_groupe (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, formation_id INTEGER NOT NULL, niveau_f_id INTEGER NOT NULL, specialite_id INTEGER NOT NULL, parcours_id INTEGER NOT NULL, cout_total INTEGER NOT NULL, nbgroupetd INTEGER NOT NULL, nbgroupetp INTEGER NOT NULL, crespe_b BOOLEAN NOT NULL, CONSTRAINT FK_9A27AB4D5200282E FOREIGN KEY (formation_id) REFERENCES formation (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_9A27AB4D1445002C FOREIGN KEY (niveau_f_id) REFERENCES niveau_f (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_9A27AB4D2195E0F0 FOREIGN KEY (specialite_id) REFERENCES specialite (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_9A27AB4D6E38C0DB FOREIGN KEY (parcours_id) REFERENCES parcours (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_9A27AB4D5200282E ON for_niv_groupe (formation_id)');
        $this->addSql('CREATE INDEX IDX_9A27AB4D1445002C ON for_niv_groupe (niveau_f_id)');
        $this->addSql('CREATE INDEX IDX_9A27AB4D2195E0F0 ON for_niv_groupe (specialite_id)');
        $this->addSql('CREATE INDEX IDX_9A27AB4D6E38C0DB ON for_niv_groupe (parcours_id)');
        $this->addSql('CREATE TABLE formation (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ratio_tarif_id INTEGER NOT NULL, nom VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, CONSTRAINT FK_404021BFD8531BA8 FOREIGN KEY (ratio_tarif_id) REFERENCES tarif (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_404021BFD8531BA8 ON formation (ratio_tarif_id)');
        $this->addSql('CREATE TABLE link (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, formation_id INTEGER NOT NULL, niveau_f_id INTEGER NOT NULL, parcours_id INTEGER NOT NULL, matiere_id INTEGER NOT NULL, specialite_id INTEGER DEFAULT NULL, for_niv_groupe_id INTEGER NOT NULL, hcm INTEGER NOT NULL, htd INTEGER NOT NULL, htp INTEGER NOT NULL, cout_htd DOUBLE PRECISION NOT NULL, cout_total DOUBLE PRECISION NOT NULL, CONSTRAINT FK_36AC99F15200282E FOREIGN KEY (formation_id) REFERENCES formation (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_36AC99F11445002C FOREIGN KEY (niveau_f_id) REFERENCES niveau_f (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_36AC99F16E38C0DB FOREIGN KEY (parcours_id) REFERENCES parcours (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_36AC99F1F46CD258 FOREIGN KEY (matiere_id) REFERENCES matiere (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_36AC99F12195E0F0 FOREIGN KEY (specialite_id) REFERENCES specialite (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_36AC99F1F6FA0B70 FOREIGN KEY (for_niv_groupe_id) REFERENCES for_niv_groupe (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_36AC99F15200282E ON link (formation_id)');
        $this->addSql('CREATE INDEX IDX_36AC99F11445002C ON link (niveau_f_id)');
        $this->addSql('CREATE INDEX IDX_36AC99F16E38C0DB ON link (parcours_id)');
        $this->addSql('CREATE INDEX IDX_36AC99F1F46CD258 ON link (matiere_id)');
        $this->addSql('CREATE INDEX IDX_36AC99F12195E0F0 ON link (specialite_id)');
        $this->addSql('CREATE INDEX IDX_36AC99F1F6FA0B70 ON link (for_niv_groupe_id)');
        $this->addSql('CREATE TABLE login (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, datedenaissance DATE NOT NULL, tel INTEGER NOT NULL, roles CLOB NOT NULL --(DC2Type:json)
        )');
        $this->addSql('CREATE TABLE matiere (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, theme_m_id INTEGER NOT NULL, nom VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, CONSTRAINT FK_9014574A3BCF18DD FOREIGN KEY (theme_m_id) REFERENCES theme_m (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_9014574A3BCF18DD ON matiere (theme_m_id)');
        $this->addSql('CREATE TABLE niveau_f (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nom VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE TABLE parcours (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE TABLE refresh_tokens (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, refresh_token VARCHAR(128) NOT NULL, username VARCHAR(255) NOT NULL, valid DATETIME NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9BACE7E1C74F2195 ON refresh_tokens (refresh_token)');
        $this->addSql('CREATE TABLE specialite (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE TABLE tab_a (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, tab_for_n_id INTEGER NOT NULL, CONSTRAINT FK_52F2E6F60109204 FOREIGN KEY (tab_for_n_id) REFERENCES for_niv_groupe (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_52F2E6F60109204 ON tab_a (tab_for_n_id)');
        $this->addSql('CREATE TABLE tab_a_competence (tab_a_id INTEGER NOT NULL, competence_id INTEGER NOT NULL, PRIMARY KEY(tab_a_id, competence_id), CONSTRAINT FK_708F8A8C851C7D5D FOREIGN KEY (tab_a_id) REFERENCES tab_a (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_708F8A8C15761DAB FOREIGN KEY (competence_id) REFERENCES competence (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_708F8A8C851C7D5D ON tab_a_competence (tab_a_id)');
        $this->addSql('CREATE INDEX IDX_708F8A8C15761DAB ON tab_a_competence (competence_id)');
        $this->addSql('CREATE TABLE tabc (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, link_tabc_id INTEGER NOT NULL, CONSTRAINT FK_F7C700768E4CDAE FOREIGN KEY (link_tabc_id) REFERENCES link (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_F7C700768E4CDAE ON tabc (link_tabc_id)');
        $this->addSql('CREATE TABLE tabc_competence (tabc_id INTEGER NOT NULL, competence_id INTEGER NOT NULL, PRIMARY KEY(tabc_id, competence_id), CONSTRAINT FK_E75A2A711582975B FOREIGN KEY (tabc_id) REFERENCES tabc (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_E75A2A7115761DAB FOREIGN KEY (competence_id) REFERENCES competence (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('CREATE INDEX IDX_E75A2A711582975B ON tabc_competence (tabc_id)');
        $this->addSql('CREATE INDEX IDX_E75A2A7115761DAB ON tabc_competence (competence_id)');
        $this->addSql('CREATE TABLE tarif (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ratio_tp DOUBLE PRECISION NOT NULL)');
        $this->addSql('CREATE TABLE theme_c (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nom VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE TABLE theme_m (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nom VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE TABLE messenger_messages (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, body CLOB NOT NULL, headers CLOB NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL)');
        $this->addSql('CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)');
        $this->addSql('CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)');
        $this->addSql('CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE competence');
        $this->addSql('DROP TABLE for_niv_groupe');
        $this->addSql('DROP TABLE formation');
        $this->addSql('DROP TABLE link');
        $this->addSql('DROP TABLE login');
        $this->addSql('DROP TABLE matiere');
        $this->addSql('DROP TABLE niveau_f');
        $this->addSql('DROP TABLE parcours');
        $this->addSql('DROP TABLE refresh_tokens');
        $this->addSql('DROP TABLE specialite');
        $this->addSql('DROP TABLE tab_a');
        $this->addSql('DROP TABLE tab_a_competence');
        $this->addSql('DROP TABLE tabc');
        $this->addSql('DROP TABLE tabc_competence');
        $this->addSql('DROP TABLE tarif');
        $this->addSql('DROP TABLE theme_c');
        $this->addSql('DROP TABLE theme_m');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
