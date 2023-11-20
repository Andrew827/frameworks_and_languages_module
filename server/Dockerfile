ARG PERL_VERSION=5.34
FROM perl:${PERL_VERSION}

WORKDIR /app

COPY app.pl .

COPY . .

RUN rm -rf /root/.cpanm /usr/src/perl/.cpan /usr/src/perl/ext /usr/src/perl/libperl.* /usr/src/perl/perl.* /usr/src/perl/man /var/lib/apt/lists/*

EXPOSE 8000

CMD ["perl", "app.pl"]
