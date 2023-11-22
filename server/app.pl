use Mojolicious::Lite -signatures;
use Mojo::Date;
use List::Util qw(first);
use Mojolicious::Plugin::SecureCORS;

app->hook(before_dispatch => sub ($c) {
    $c->res->headers->header('Access-Control-Allow-Origin' => '*');
    $c->res->headers->header('Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS');
    $c->res->headers->header('Access-Control-Allow-Headers' => 'Content-Type');
    $c->res->headers->header('Access-Control-Max-Age' => '3600');
});

app->config(hypnotoad => {listen => ['http://*:8000']});

my %items;
my $next_id = 1;

sub iso_datetime {
    return Mojo::Date->new->to_datetime;
}

get '/' => sub ($c) {
    $c->render(text => 'Welcome to the API!');
};

post '/item' => sub ($c) {
    my $params = $c->req->json;
    unless ($params->{user_id} && $params->{keywords} && $params->{description} && $params->{lat} && $params->{lon}) {
        return $c->render(json => { error => 'Missing required fields' }, status => 200);
    }

    my $new_item = {
        id          => $next_id++,
        user_id     => $params->{user_id},
        keywords    => $params->{keywords},
        description => $params->{description},
        lat         => $params->{lat},
        lon         => $params->{lon},
        date_from   => iso_datetime(),  
    };

    push @{$items{$new_item->{id}}}, $new_item;
    $c->render(json => $new_item, status => 201);
};

get '/items' => sub ($c) {
    my @all_items = map { @$_ } values %items;
    $c->render(json => \@all_items, status => 200);
};

get '/item/:id' => sub ($c) {
    my $id   = $c->stash('id');
    my $item = first { $_->{id} == $id } map { @$_ } values %items;

    if ($item) {
        $c->render(json => $item, status => 200);
    } else {
        $c->render(json => { error => 'Item not found' }, status => 404);
    }
};

del '/item/:id' => sub ($c) {
    my $id      = $c->stash('id');
    my $deleted = remove_item($id);

    if ($deleted) {
        $c->rendered(204);
    } else {
        $c->render(json => { error => 'Item not found' }, status => 404);
    }
};

options '/' => sub ($c) {
    $c->rendered(204);
};

options '/item' => sub ($c) {
    $c->rendered(405);
};


sub remove_item ($id) {
    if (exists $items{$id}) {
        delete $items{$id};
        my $index = 1;
        for my $key (keys %items) {
            $_->{id} = $index++ for @{$items{$key}};
        }
        return 1;
    }
    return 0;
}

app->start('daemon', '-l', 'http://localhost:8000');
