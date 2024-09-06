<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240906154900 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE activity (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, nom_f VARCHAR(255) DEFAULT NULL, nom_h VARCHAR(255) DEFAULT NULL, date_ceremonie VARCHAR(255) DEFAULT NULL, lieux_ceremonie VARCHAR(255) DEFAULT NULL, date_at VARCHAR(255) DEFAULT NULL, jour_j VARCHAR(255) DEFAULT NULL, budget_initial VARCHAR(255) DEFAULT NULL, budget_restant VARCHAR(255) DEFAULT NULL, budget_prestataire VARCHAR(255) DEFAULT NULL, id_prestateur INT DEFAULT NULL, lieux_de_reception VARCHAR(255) DEFAULT NULL, photo_reception VARCHAR(255) DEFAULT NULL, photo_principal VARCHAR(255) DEFAULT NULL, photo_ceremonie VARCHAR(255) DEFAULT NULL, phone_homme INT DEFAULT NULL, phone_femme INT DEFAULT NULL, slogan_texte VARCHAR(255) DEFAULT NULL, fichier_csv VARCHAR(255) DEFAULT NULL, INDEX IDX_AC74095AA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE budget (id INT AUTO_INCREMENT NOT NULL, user_login_id INT NOT NULL, montant_total INT NOT NULL, montant_restant INT NOT NULL, UNIQUE INDEX UNIQ_73F2F77BBC3F045D (user_login_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categorie (id INT AUTO_INCREMENT NOT NULL, titre_categorie VARCHAR(255) NOT NULL, soustitre_categorie VARCHAR(255) NOT NULL, content VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE contact (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, adresse VARCHAR(255) NOT NULL, mail VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, prestataire_id INT NOT NULL, image_name VARCHAR(255) NOT NULL, updated_at DATETIME NOT NULL, INDEX IDX_C53D045FBE3DB2B7 (prestataire_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE image_activity (id INT AUTO_INCREMENT NOT NULL, id_activity INT DEFAULT NULL, ceremonie_image VARCHAR(255) DEFAULT NULL, reception_image VARCHAR(255) DEFAULT NULL, principale_image VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE invite (id INT AUTO_INCREMENT NOT NULL, nominvite VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE presta (id INT AUTO_INCREMENT NOT NULL, description LONGTEXT NOT NULL, contact VARCHAR(255) NOT NULL, adresse VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE prestataire (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) DEFAULT NULL, contact VARCHAR(255) DEFAULT NULL, adresse VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, description LONGTEXT DEFAULT NULL, budget VARCHAR(255) DEFAULT NULL, photo VARCHAR(255) DEFAULT NULL, popul_chiffre INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE prestataire_type (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_login (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, password VARCHAR(255) DEFAULT NULL, reset_token VARCHAR(255) DEFAULT NULL, roles JSON DEFAULT NULL COMMENT \'(DC2Type:json)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE activity ADD CONSTRAINT FK_AC74095AA76ED395 FOREIGN KEY (user_id) REFERENCES user_login (id)');
        $this->addSql('ALTER TABLE budget ADD CONSTRAINT FK_73F2F77BBC3F045D FOREIGN KEY (user_login_id) REFERENCES user_login (id)');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045FBE3DB2B7 FOREIGN KEY (prestataire_id) REFERENCES prestataire (id)');
        $this->addSql('DROP INDEX IDX_59FEBAAEBE3DB2B7 ON prestataire_tarif');
        $this->addSql('DROP INDEX IDX_59FEBAAE56D12E25 ON prestataire_tarif');
        $this->addSql('ALTER TABLE prestataire_tarif ADD presta_id INT DEFAULT NULL, ADD type_id INT DEFAULT NULL, ADD photo VARCHAR(255) DEFAULT NULL, DROP prestataire_id, DROP presta_type_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE activity DROP FOREIGN KEY FK_AC74095AA76ED395');
        $this->addSql('ALTER TABLE budget DROP FOREIGN KEY FK_73F2F77BBC3F045D');
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY FK_C53D045FBE3DB2B7');
        $this->addSql('DROP TABLE activity');
        $this->addSql('DROP TABLE budget');
        $this->addSql('DROP TABLE categorie');
        $this->addSql('DROP TABLE contact');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE image_activity');
        $this->addSql('DROP TABLE invite');
        $this->addSql('DROP TABLE presta');
        $this->addSql('DROP TABLE prestataire');
        $this->addSql('DROP TABLE prestataire_type');
        $this->addSql('DROP TABLE user_login');
        $this->addSql('ALTER TABLE prestataire_tarif ADD prestataire_id INT DEFAULT NULL, ADD presta_type_id INT DEFAULT NULL, DROP presta_id, DROP type_id, DROP photo');
        $this->addSql('CREATE INDEX IDX_59FEBAAEBE3DB2B7 ON prestataire_tarif (prestataire_id)');
        $this->addSql('CREATE INDEX IDX_59FEBAAE56D12E25 ON prestataire_tarif (presta_type_id)');
    }
}
