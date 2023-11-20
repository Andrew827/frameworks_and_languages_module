Technical Report
================

(intro describing purpose of report - 200ish words)


Critique of Server/Client prototype
---------------------

### Overview
()

### (name of Issue 1)

```HTML
			<div data-page="myitems">
				<h2>My Page</h2>
				<h3>New Item</h3>
					<form>
						<label for="create_postcode">Postcode</label><input id="create_postcode" type="text" name="postcode"/>
						<button data-action="lookup_postcode">Lookup</button>
						<label for="create_lat">lat</label><input id="create_lat" type="text" name="lat"/>
						<label for="create_lon">lon</label><input id="create_lon" type="text" name="lon"/>
						<label for="create_image">image</label><input id="create_image" type="text" name="image" value="http://placekitten.com/100/100"/>
						<label for="create_keywords">keywords</label><input id="create_keywords" type="text" name="keywords"/>
						<label for="create_description">description</label><textarea id="create_description" type="text" name="description"></textarea>
						<input type="submit" id="action_create" data-action="create_item">
					</form>
				<h3>My Items</h3>
				<div data-page="items"><ul></ul></div>
			</div>
```

### (name of Issue 2)

```python
def options_response(request):
    """
    >>> options_response({'path': '*', 'method': 'OPTIONS'})
    {'code': 204, 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE', 'Access-Control-Allow-Headers': 'Content-Type'}

```
CORS headers are all over the place. They are in multiple functions, this is not necessary.




```python
def serve_app(func_app, port, host=''):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((host, port))
        while True:
            s.listen()
            try:
                conn, addr = s.accept()
            except KeyboardInterrupt as ex:
                break
            with conn:
```


### Recommendation
(why the existing implementation should not be used - 40ish words)
(suggested direction - frameworks 40ish words)


Server Framework Features
-------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Server Language Features
-----------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Client Framework Features
-------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


### (name of Feature 3)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)


Client Language Features
------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)

### (name of Feature 2)

(Technical description of the feature - 40ish words)
(A code block snippet example demonstrating the feature)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words)
(Provide reference urls to your sources of information about the feature - required)



Conclusions
-----------

(justify why frameworks are recommended - 120ish words)
(justify which frameworks should be used and why 180ish words)

Middlewire is the communication layer between the software and server. 
