Technical Report
================

Introduction:

This technical report comprehensively critiques a server/client prototype, examining both the client-side JavaScript code and the server-side implementation. Our analysis delves into various aspects, including code organisation, error handling, and scalability. We highlight the strengths and weaknesses of the prototype, with a particular focus on issues like CORS redundancy and the absence of asynchronous I/O on the server. To address these challenges, we propose the integration of Mojolicious on the server side and Alpine.js on the client side. This cohesive approach capitalises on each technology's strengths to create a harmonious and performant system. Our report underscores the critical role of frameworks in achieving this synergy for enhanced scalability and responsiveness.


Critique of Server/Client prototype
---------------------

### Overview

In this section, we conduct a detailed evaluation of the server/client prototype. We analyse its JavaScript code organisation, error handling, and scalability while highlighting concerns such as CORS redundancy and server-side limitations.

### Example client Review 

The JavaScript code leverages ECMAScript modules indicated by `type="module"` for organised and modular development. This approach promotes code encapsulation and facilitates the export and import of functionalities between files, enhancing maintainability. Essential functions, such as `post_item`, `create_item`, and `delete_item`, encapsulate HTTP requests, providing a modular and reusable structure for data interactions. However, comprehensive error handling for fetch requests and input validation for security are essential considerations. Additionally, ensuring compatibility across browsers, especially regarding ES6 module support, is crucial for robust asynchronous data retrieval.

The code also contains hardcoded URLs, such as Gravatar and image URLs, which can be problematic. Hardcoding URLs limits flexibility and challenges adapting to dynamic environments or server changes. This practice hinders scalability, as updates require manual changes across the codebase. In a technical context, dynamic URL generation allows for easy configuration and adaptation, promoting maintainability.


` 
// Hardcoded Gravatar URL
function gravatar_url(email) {
    return `https://secure.gravatar.com/avatar/${md5(email.toLowerCase().trim())}`;
}
`

### Example server review 

The implementation contains many redundancies in setting Cross-Origin Resource Sharing (CORS) headers. CORS headers are redundantly configured in the `encode_response` and `options_response` functions. The current implementation introduces code repetition and increases the likelihood of inconsistencies and maintenance challenges. A unified approach, consolidating CORS header logic into a single function, would enhance code clarity, reduce redundancy, and simplify future modifications. This will promote better maintainability and mitigate the risk of unintentional discrepancies in CORS configuration across different areas of the codebase.
The server's code also lacks asynchronous I/O (async I/O), limiting scalability and responsiveness. Without async I/O, the server can handle only one connection simultaneously, causing bottlenecks, especially when handling concurrent requests. The current implementation results in poor utilisation of system resources and sluggish response times as the server waits for each operation to complete sequentially. Incorporating async I/O would allow the server to handle concurrent requests.

### Recommendation

The current implementation exhibits issues like CORS redundancy, absence of asynchronous I/O, and incomplete HTTP parsing, compromising reliability and security. Mojolicious ensures robustness, simplifies async I/O with built-in support, and provides comprehensive tools. Pairing Mojolicious on the server with Alpine on the client enhances efficiency, as Alpine offers a lightweight JavaScript framework. Together, they offer a more secure, performant, and maintainable solution than the current implementation, addressing the identified shortcomings.

Server Framework Features
-------------------------

### Hypnotoad Preforking in Mojolicious

Technical Description:

Hypnotoad is a pre-forking, non-blocking server for Mojolicious. It efficiently handles concurrent connections by creating multiple worker processes, improving performance and responsiveness.

'
# Enable hypnotoad in the Mojolicious application
$ hypnotoad ./myapp.pl
'

Problem-solving/Benefits: 

Hypnotoad's preforking enhances Mojolicious application performance, allowing it to handle numerous simultaneous connections. This feature is crucial for scalability and responsiveness in production environments, providing better user experiences in web applications.

References:

Mojolicious Documentation - https://docs.mojolicious.org/Mojo/Server/Hypnotoad
Perl Mavan - https://perlmaven.com/deploying-a-mojolicious-application


### WebSockets

Mojolicious provides native WebSocket support, facilitating real-time bidirectional communication between web servers and clients. Leveraging the WebSocket protocol establishes a persistent connection, enabling efficient data exchange with low latency. This feature enhances interactive, dynamic web applications by allowing servers to push updates to connected clients instantly, creating a responsive and interactive user experience without the need for frequent HTTP polling or page reloads.

Example Code 


`
use Mojolicious::Lite;

# Route HTML page
get '/' => 'index';

# WebSocket route
websocket '/echo' => sub {
    my $self = shift;

    $self->on(message => sub {
        my ($self, $message) = @_;
        $self->send("You said: $message");
    });
};

app->start;

@@ index.html.ep
<!DOCTYPE html>
<html>
<head>
  <title>Mojolicious WebSocket Example</title>
</head>
<body>
  <h1>WebSocket Echo</h1>
  <script>
    var ws = new WebSocket('<%= url_for('echo')->to_abs %>');
    ws.onmessage = function(event) {
      alert(event.data);
    };
    ws.onopen = function() {
      ws.send('Hello, WebSocket!');
    };
  </script>
</body>
</html>
`


Problem-solving/Benefits:  

WebSocket support in Mojolicious addresses the limitations of traditional HTTP communication by enabling real-time, bidirectional data exchange between servers and clients. This solves the problem of latency in updating web content, allowing servers to push updates instantly. Benefits include a more responsive user experience, reduced reliance on frequent HTTP requests, and efficient dynamic content handling.


References: 

Mullengada, R.C. (2021) WebSockets using mojolicious, The Curious Technoid. Available at: https://thecurioustechnoid.com/websockets-using-mojolicious

Berger, J. (2012) Joel Berger, A WebSocket Mojolicious/DBI Example | Joel Berger [blogs.perl.org]. Available at: https://blogs.perl.org/users/joel_berger/2012/10/a-websocket-mojoliciousdbi-example.html 

Mojolicious Documentation https://docs.mojolicious.org/Mojo/Transaction/WebSocket



### JSON and RESTful API support

Mojolicious streamlines JSON and RESTful API support, easing data interchange. It simplifies JSON handling, enabling seamless serialisation and deserialisation. With built-in RESTful routing, developers create scalable, maintainable APIs. The framework's intuitive structure encourages REST principal adherence, resulting in robust, stateless APIs. Its flexibility and native JSON and REST support enhance modern web app efficiency.

`
use Mojolicious::Lite;

# Route for handling JSON data
under '/api' => sub {
    my $self = shift;

    # Middleware to ensure content type is JSON
    $self->req->headers->content_type('application/json');
};

# RESTful route for handling JSON data
post '/api/data' => sub {
    my $self = shift;

    # Access JSON data from the request
    my $json_data = $self->req->json;

    # Process JSON data (e.g., store in a database)

    # Respond with JSON
    $self->render(json => { status => 'success' });
};

app->start;
`
Problem-solving/Benefits: 

Mojolicious solves data exchange challenges with JSON and RESTful APIs. It streamlines serialization and scalable APIs and promotes industry best practices for robust, maintainable web apps, fostering seamless system communication.

References:

Bell, D. (2017) Day 8: Mocking a REST API. Available at: https://mojolicious.io/blog/2017/12/08/day-8-mocking-a-rest-api/ 

Medley, B. (2016) Brian Medley, REST API with Mojolicious | Brian Medley [blogs.perl.org]. Available at: https://blogs.perl.org/users/brian_medley/2016/06/rest-api-with-mojolicious.html 

Rai, G. (2021) Creating rest apis with perl, Mojolicious and openapi, DEV Community. Available at: https://dev.to/raigaurav/creating-rest-apis-with-perl-mojolicious-and-openapi-1bng 



Server Language Features
-----------------------

### CGI (Common Gateway Interface) Support

CGI support in Perl enables web servers to execute scripts for dynamic content generation, fostering interactive web applications by facilitating communication between servers and external programs for personalised user experiences. The CGI (Common Gateway Interface) in Perl addresses the need for dynamic web content by allowing external scripts to communicate with web servers. This facilitates interactive and personalised web applications, enhancing user experiences. CGI enables server-side processing, supporting tasks like form handling and data processing, making websites more dynamic, responsive, and feature-rich.
Code Example:

``` 
#!/usr/bin/perl

use strict;
use warnings;

# Send the appropriate HTTP header
print "Content-Type: text/html\n\n";

# Print the HTML content
print "<html>\n";
print "<head><title>CGI Example</title></head>\n";
print "<body>\n";
print "<h1>Hello, CGI!</h1>\n";
print "<p>This is a simple Perl CGI script.</p>\n";
print "</body>\n";
print "</html>\n";
```

References:

Jacoby, D. (2018) Perl and CGI, Perl.com. Available at: https://www.perl.com/article/perl-and-cgi/

Szabo, G. (2014) CGI - common gateway interface, Perl Maven. Available at: https://perlmaven.com/cgi

### Dynamic typing

Perl's dynamic typing permits variable changes during runtime, enhancing programming flexibility. Unlike static languages, it allows irregular type shifts, simplifying code. However, caution is needed to prevent unintended runtime errors due to the adaptability of dynamic typing.

```
# Dynamic typing example in Perl

# Variable $dynamic_var starts as a scalar
my $dynamic_var = "Hello, ";

# Later assigned an array reference
$dynamic_var = [1, 2, 3];

# Assign a hash reference
$dynamic_var = { key => 'value' };

# Print the variable (could be an array or hash reference)
print "Dynamic Variable: ", join(", ", keys %$dynamic_var), "\n";
```

Problem Solving/Benefits:

Dynamic typing in Perl solves the need for flexible data handling, allowing variables to change types during runtime. This provides adaptability in representing various data structures and values within a program. The benefits include more expressive and concise code. However, developers must exercise caution to prevent unintended type-related errors that may arise from the flexibility of dynamic typing.

Client Framework Features
-------------------------

### DOM manipulation 

Alpine.js simplifies DOM manipulation through directives like x-bind, allowing dynamic updates of HTML attributes and properties based on model changes. The x-model directive facilitates two-way data binding, syncing form inputs with underlying data. Additionally, x-ref provides a straightforward way to reference and manipulate DOM elements programmatically. These directives empower developers to create interactive web applications efficiently by directly expressing data-driven behaviour within the HTML markup, reducing the need for explicit JavaScript code for joint DOM manipulations.

`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/alpinejs@2.8.2/dist/alpine.min.js" defer></script>
  <title>Alpine.js DOM Manipulation</title>
</head>
<body x-data="{ counter: 0 }">
  
  <h1 x-text="'Counter: ' + counter"></h1>

  <button x-on:click="counter++">Increment</button>
  <button x-on:click="counter--">Decrement</button>

</body>
</html>
`
Problem solving / benefits:

Alpine.js addresses the need for a lightweight JavaScript framework by providing a declarative syntax for DOM manipulation and data binding without the complexities of larger frameworks. Its benefits include simplicity, ease of integration, and reduced development overhead. Alpine.js empowers developers to create interactive web applications efficiently, particularly in smaller projects or when a minimalistic approach to front-end development is preferred, avoiding the complexities associated with larger frameworks.

References:

Templating (no date) Templating - Alpine.js. Available at: https://alpinejs.dev/essentials/templating 

Teskeredzic, S. (2021) State & Dom manipulation with alpinejs, DEV Community. Available at: https://dev.to/semirteskeredzic/state-dom-manipulation-with-alpinejs-3l4h 


### Conditional rendering

Alpine.js employs x-show and x-if directives for conditional rendering. X-show displays or hides elements based on expressions, while x-if conditionally adds/removes elements in the DOM. This simplifies responsive and interactive UIs without complex JavaScript. It effectively enhances code expressiveness, readability, and maintenance, responding to dynamic conditions.

`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/alpinejs@2.8.2/dist/alpine.min.js" defer></script>
  <title>Alpine.js Conditional Rendering</title>
</head>
<body x-data="{ showElement: true }">

  <button x-on:click="showElement = !showElement">Toggle Element</button>

  <div x-show="showElement">
    <p>This element is conditionally rendered.</p>
  </div>

</body>
</html>
`

References: 

(.JS, A. (no date) X-IF, if - Alpine.js. Available at: https://alpinejs.dev/directives/if (Accessed: 25 December 2023). 

Lea, T. (2021) Alpinejs conditional classes, Alpinejs conditional classes. Available at: https://devdojo.com/tnylea/snippet/alpinejs-conditional-classes 

Mohsen (2022) Dynamic content rendering in alpine.js, DEV Community. Available at: https://dev.to/mohsenkamrani/dynamic-content-rendering-in-alpinejs-3b6l 



### declarative syntax

Alpine.js employs a declarative syntax, allowing developers to express dynamic behaviour directly within HTML markup using directives like x-data and x-bind. The x-data directive initialises the component state, while x-bind binds data to HTML attributes or properties. This declarative approach simplifies code by specifying what behaviour should occur, making it more readable and reducing the need for imperative JavaScript. Developers define the desired state and interactions directly in the markup, promoting a more intuitive and expressive development experience. Alpine.js addresses the challenge of enhancing interactivity in web applications with a minimalistic approach. It simplifies frontend development by providing a declarative syntax, reducing reliance on verbose JavaScript. Developers benefit from streamlined DOM manipulation, two-way data binding, and conditional rendering, resulting in cleaner, more maintainable code. Alpine.js is particularly advantageous for small to medium-sized projects, offering an efficient solution for creating dynamic user interfaces without the overhead of larger frameworks, promoting simplicity and ease of integration.
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/alpinejs@2.8.2/dist/alpine.min.js" defer></script>
  <title>Alpine.js Declarative Syntax</title>
</head>
<body x-data="{ message: 'Hello, Alpine.js!' }">

  <div x-text="message"></div>

  <input type="text" x-model="message" placeholder="Type a message">

</body>
</html>
`


References:

Emiroglu (2023) Getting started with alpine.js, Medium. Available at: https://emiroglu.medium.com/getting-started-with-alpine-js-7719e9de6228 

Nnamdi, C. (2021) Getting started with alpine.js - the ultimate guide, RSS. Available at: https://daily.dev/blog/alpine-js-the-ultimate-guide 

Vrachliotis, S. (no date) Sprinkle declarative, reactive behaviour on your HTML with Alpine JS, egghead. Available at: https://egghead.io/courses/sprinkle-declarative-reactive-behaviour-on-your-html-with-alpine-js-5f8b 



Client Language Features
------------------------

### Functions as first-class

As first-class citizens in JavaScript, functions allow treating functions like any other data type. For instance, a function can be assigned to a variable, passed as an argument to another function, or returned from a function. This flexibility facilitates functional programming paradigms, enabling the creation of higher-order functions. JavaScript's functions as first-class citizens solve the challenge of treating functions like any other data type, enabling more flexible and expressive coding patterns. This approach simplifies code by assigning functions to variables, passing them as arguments and returning from other functions. Benefits include the creation of higher-order functions and facilitating. Functional programming and modular code design. However, misuse can lead to complex code, and understanding function context is crucial to leveraging this feature effectively.
`
// Function assigned to a variable
const add = function (a, b) {
  return a + b;
};

// Function passed as an argument
const result = [1, 2, 3].map(add.bind(null, 5)); // Adds 5 to each array element
`

References:

Functions as first-class objects in JavaScript: Why does this matter? (2022) Pluralsight. Available at: https://www.pluralsight.com/blog/data-professional/
javascript-functions-as-first-class-objects 
JavaScript functions are first-class citizens (2023) JavaScript Tutorial. Available at: https://www.javascripttutorial.net/javascript-functions-are-first-class-citizens

What is First Class Citizen in JavaScript ? (2021) GeeksforGeeks. Available at: https://www.geeksforgeeks.org/what-is-first-class-citizen-in-javascript/ 


### Garbage collection

Garbage collection in JavaScript automates memory management, preventing memory leaks by identifying and reclaiming unused memory. The JavaScript engine periodically scans for unreferenced objects, eliminating the need for manual memory deallocation and enhancing developer productivity. However, improper handling of references, circular references, or large objects can impact performance. Modern JavaScript engines employ garbage collection algorithms like mark-and-sweep, generational, and incremental to optimise memory management. While this automated process ensures efficient memory usage, developers should be cautious of potential pitfalls, such as circular references or long-lived objects, which may impact garbage collection efficiency and application performance if not handled appropriately.

Knupfer, F. (2022) Java garbage collection: What is it and how does it work?, New Relic. Available at: https://newrelic.com/blog/best-practices/java-garbage-collection#:~:text=Garbage%20collection%20in%20Java%20is,Java%20apps%20easier%20for%20developers. 

Nayak, S. (2021) Garbage collection in java – what is GC and how it works in the JVM, freeCodeCamp.org. Available at: https://www.freecodecamp.org/news/garbage-collection-in-java-what-is-gc-and-how-it-works-in-the-jvm/ 

What is garbage collection in Java? (no date) IBM. Available at: https://www.ibm.com/topics/garbage-collection-java). 


### Conclusion: Leveraging the Synergy of Mojolicious and Alpine.js

Integrating robust server-side technologies with agile client-side frameworks is essential for a harmonious and performant system. The fusion of Mojolicious with Alpine.js delivers a seamless, scalable, and user-friendly experience. Mojolicious, with non-blocking I/O and event-driven architecture, excels in server-side development, handling concurrent connections for optimal performance. Its RESTful routing and WebSocket support align with interactive demands, enabling real-time updates. Alpine.js on the client side complements this with a minimalistic footprint, simplifying DOM manipulation and enhancing front-end interactivity. This cohesive integration forms a full-stack solution, capitalising on each technology's strengths for scalability and responsiveness, offering a performant and user-friendly platform. Frameworks play a crucial role in achieving this synergy.