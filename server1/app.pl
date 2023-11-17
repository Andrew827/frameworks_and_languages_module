use Mojolicious::Lite -signatures;
use JSON;
use List::Util qw(first);
use Mojolicious::Plugin::SecureCORS;

plugin 'SecureCORS';

my %items;
my $next_id = 1;

sub item ($user_id, $keywords, $description, $lat, $lon) {
    my $id = $next_id++;
    my $date_from = Mojo::Date->new->to_datetime;
    my $new_item = {
        id          => $id,
        user_id     => $user_id,
        keywords    => $keywords,
        description => $description,
        lat         => $lat,
        lon         => $lon,
        date_from   => $date_from,
    };

    push @{$items{$id}}, $new_item;
    return $new_item;
}

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

get '/' => sub ($c) {
    $c->render(text => 'Hello World!');
};

get '/items' => sub ($c) {
    my @all_items = map { @$_ } values %items;
    $c->render(json => \@all_items);
};

post '/item' => sub ($c) {
    my $params = $c->req->json;
    unless ($params->{user_id} && $params->{keywords} && $params->{description} && $params->{lat} && $params->{lon}) {
        return $c->render(json => { error => 'Missing required fields' }, status => 405);
    }

    my $new_item = item($params->{user_id}, $params->{keywords}, $params->{description}, $params->{lat}, $params->{lon});
    $c->render(json => $new_item, status => 201);
};

get '/item/:id' => sub ($c) {
    my $id   = $c->stash('id');
    my $item = first { $_->{id} == $id } map { @$_ } values %items;
    return $c->render(json => $item) if $item;
    $c->render(json => { error => 'Item not found' }, status => 404);
};

del '/item/:id' => sub ($c) {
    my $id      = $c->stash('id');
    my $deleted = remove_item($id);

    return $c->rendered(204) if $deleted;
    $c->render(json => { error => 'Item not found' }, status => 404);
};

app->start('daemon', '-l', 'http://*:8000');
