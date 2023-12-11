use Mojolicious::Lite -signatures;
use Mojo::Date;
use List::Util qw(first);
use Mojolicious::Plugin::SecureCORS;
use File::Spec;

# I decided to use this framework to work in a different langague. It was challanging, but i got there. 
# I did slightly pick it due to the name - Mojolicious ... Sounds delicous ... :). 

# Set up cors headers for all routes 
app->hook(
    before_dispatch => sub ($c) {
        $c->res->headers->header( 'Access-Control-Allow-Origin' => '*' );
        $c->res->headers->header( 'Access-Control-Allow-Methods' =>
              'GET, POST, PUT, DELETE, OPTIONS' );
        $c->res->headers->header(
            'Access-Control-Allow-Headers' => 'Content-Type' );
        $c->res->headers->header( 'Access-Control-Max-Age' => '3600' );
    }
);

# Serve the index.html file that shows how to use and interact with the server
get '/' => sub {
    my $c = shift;
    my $file_path = $c->app->home->rel_file('index.html');
    $c->reply->file($file_path);
};

# Configure Hynoptoad to listen on port 8000 - This is a producion ready web serve, it pre-forks
# several worker processes to handle incoming requests. Its also a reference to futurama. :)
app->config( hypnotoad => { listen => ['http://*:8000'] } );

#initialse item stores and ID counter 
my %items;
my $next_id = 1;

# Function to get the current ISO datetime format 
sub iso_datetime {
    return Mojo::Date->new->to_datetime;
}

# Route that returns a text response 
get '/' => sub ($c) {
    $c->render( text => 'Server - Framework Moja' );
};

# This is our create item 
post '/item' => sub ($c) {
    my $params = $c->req->json;
    # Validate fields 
    unless ( $params->{user_id}
        && $params->{keywords}
        && $params->{description}
        && $params->{lat}
        && $params->{lon} )
    {
        return $c->render(
            json   => { error => 'Missing required fields' },
            status => 405
        );
    }
    # Create item with an ID and Time stamp
    my $new_item = {
        id          => $next_id++,
        user_id     => $params->{user_id},
        keywords    => $params->{keywords},
        description => $params->{description},
        lat         => $params->{lat},
        lon         => $params->{lon},
        date_from   => iso_datetime(),
    };

    # Store items and return response
    push @{ $items{ $new_item->{id} } }, $new_item;
    $c->render( json => $new_item, status => 201 );
};

# Retrive all items 

get '/items' => sub ($c) {

    # Flatten items into a list
    my @all_items = map { @$_ } values %items;
    # Set the order i want the data to appear
    my @desired_order = qw(id user_id keywords description lat lon date_from);
    # Sort by ID
    my @sorted_items = sort { $a->{id} <=> $b->{id} } @all_items;
     
     #Perl doesn't have a built-in list comprehension syntax like some other languages, but you can achieve similar results using map and grep functions.
     #The code snippet below demonstrates a simple list comprehension to filter and format items:

    my @formatted_items = map {
        my %formatted_item;
        @formatted_item{@desired_order} = @$_{@desired_order};
        \%formatted_item;
    } @sorted_items;

    # This was part of my code that failed all the time. My data was returning in a weird order so i needed to format the output 
    # into the correct order 

    $c->render( json => \@formatted_items, status => 200 );
};


# Retrieve items by ID

get '/item/:id' => sub ($c) {
    my $id   = $c->stash('id');
    my $item = first { $_->{id} == $id } map { @$_ } values %items;
    
    if ($item) {
        $c->render( json => $item, status => 200 );
    }
    else {
        $c->render( json => { error => 'Item not found' }, status => 404 );
    }
};

# Utility subroutine to format an item to my desired order
sub format_item {
    my ($item) = @_;
    my @desired_order = qw(id user_id keywords description lat lon date_from);
    my %formatted_item;
    @formatted_item{@desired_order} = @{$item}{@desired_order};
    return \%formatted_item;
}

#Delete item by ID
del '/item/:id' => sub ($c) {
    my $id      = $c->stash('id');
    my $deleted = remove_item($id);

    if ($deleted) {
        $c->rendered(204);
    }
    else {
        $c->render( json => { error => 'Item not found' }, status => 404 );
    }
};

#Handles pre flight CORS request for the root
options '/' => sub ($c) {
    $c->rendered(204);
};


# Handles CORS for the /item route
options '/item' => sub ($c) {
    $c->rendered(405);
};

# Utility subroutine to remove item by ID 
sub remove_item ($id) {
    if ( exists $items{$id} ) {
        delete $items{$id};
        my $index = 1;
        for my $key ( keys %items ) {
            $_->{id} = $index++ for @{ $items{$key} };
        }
        return 1;
    }
    return 0;
}

#Start App
app->start( 'daemon', '-l', 'http://localhost:8000' );

# Mojolicous does support asynchronous programming to handle cocurrent requests. 
# This is an extremely simple implemention and use of the framework. You can install
#Mojolicous and use the command mojo generate app server. This creates a scaffold. It creates
# a directory with multiple files and subdir. I am not advanced enough to operate the files correctly.
# I did attempt to convert but i struggled and remained with this simple implementation. Its affective, operational
# and works for small productions. If i wanted to use any perl within my html i would add .ep extension (embedded perl)

# I learned implementation of this langague by following tutorials and documentation
# tutorial example https://www.youtube.com/watch?v=_AInPp-dneQ, https://qntm.org/perl_en (this is a learn perl tutorial in the mojo documentation)
# Framework docs: https://docs.mojolicious.org/


