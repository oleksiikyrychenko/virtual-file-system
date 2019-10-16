FROM php:7.2-apache

RUN docker-php-ext-install \
    pdo_mysql \
    && a2enmod \
    rewrite

RUN apt-get update

RUN apt-get install -y \
    git \
    nano \
    zip \
    curl \
    sudo \
    unzip \
    libicu-dev \
    libbz2-dev \
    libpng-dev \
    libjpeg-dev \
    libmcrypt-dev \
    libreadline-dev \
    libfreetype6-dev \
    g++

ENV APACHE_DOCUMENT_ROOT=/var/www/html/server/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN a2enmod rewrite headers

RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

RUN docker-php-ext-install \
    bz2 \
    intl \
    iconv \
    bcmath \
    opcache \
    calendar \
    mbstring \
    pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

ARG uid=1000
RUN useradd -G www-data,root -u $uid -d /home/developer developer
RUN mkdir -p /home/developer/.composer && \
    chown -R developer:developer /home/developer
