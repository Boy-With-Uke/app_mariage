# Utiliser une image PHP 8.2
FROM php:8.2-fpm

# Installer les extensions PHP nécessaires pour Symfony
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    zip \
    git \
    unzip \
    && docker-php-ext-install pdo pdo_mysql zip

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installer Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Configurer le répertoire de travail
WORKDIR /var/www/html

# Copier le projet Symfony dans le conteneur
COPY . /var/www/html

# Exposer le port 8000 pour l'application Symfony
EXPOSE 8000

# Commande par défaut pour démarrer le serveur Symfony
CMD ["symfony", "serve", "--no-tls"]
