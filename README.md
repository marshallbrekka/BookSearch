JS Book Search
==================================================

This is a book search application that uses the [CampusBooks](https://partners.campusbooks.com) API for searching and price comparison. 



It is designed in such a way that you should be able to just drop it in to your existing site without much configuration. 

[View the demo](http://dev.marshallbrekka.com/booksearch)


## Building
--------------------------------------

The build script runs using Node.js.

1. Install Node.js and NPM.
2. From the command line `cd build`
3. Install the required dependencies `npm install`
4. Build it `node build.js`

There will now be a `dist` directory in the root of the project. There are full and minimized versions of both the CSS and JS files.

## Usage
--------------------------------------


To use in your page simply include the relevant CSS and JS files, as well as the jQuery library, and run:

```javascript
BookSearch.init({container:'#bookSearchJS', apiKey:'#######'});
````

where container can be a CSS selector or a DOMNode object.

The only other requirement is **the container must be positioned.** So if you are only using `width` and `height` to define its size, just add `position:relative` to its CSS style, otherwise the app will fill the entire browser window.

You can use the `index.html` file in the `dist` directory as an example.


## Configuration Options
---------------------------
There aren't many configuration options, but I intend to add more in the future.

All options are set as properties to the object that is passed in to the init method.

#### Required 
- `container` CSS selector or DOMNode
- `apiKey` your campus books api key

#### Optional
- `bookImageSmall` int value of small book image max width and height 
- `bookImageLarge` int value of large book image max width and height


#### CSS Configuration
In the future I'll try and make the CSS file easier to modify things like colors and sizes. Most colors are defined at the top as variables, but if you want to make further modifications you'll have to dig deeper.
