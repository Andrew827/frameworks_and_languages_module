ARG PERL_VERSION=5.34
FROM perl:${PERL_VERSION}

WORKDIR /app/

RUN cpan Mojolicious::Lite
RUN cpan Mojolicious::Plugin::SecureCORS
RUN cpan JSON

COPY app.pl .

EXPOSE 8000

CMD ["morbo", "app.pl", "--listen", "http://0.0.0.0:8000"]


