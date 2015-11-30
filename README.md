#gulp-mv2bass

###A template aliasing plugin for working with basscss(and on top of it)

As web designer and developers, we prefer to use semantic names to refer to styles for specific components of our pages or applications.  As smart CSS authors we like to have low specificity selectors, and use classes that have a focused purpose.  Sometimes these two are at odds.  How can we find a compromise?  With template aliases.

Write your templates with @-prefixed class names, and map them to compositions of basscss style classes.  The plugin will transform them inline and output them wherever you like with the power of gulp.

##Installing

Just install through `npm install --save gulp-mv2bass`, I recommend using the `--save` option so it's listed as a dependency in your package.json.

##Example

See the code in the example directory, or below:

``` html
<html>
  <head></head>
  <body class="@body">
    <h1>This is a header</h1>
    <h2 class="@byline">This is some text acting as a byline</h2>
  </body>
</html>
```

Now, just set up your gulp file to `require('gulp-mv2bass');` and then set up your task.  All the call to the plugin requires is the rules object - a simple JSON object of string key-value pairs.  The key is the alias name, the value is the actual space separated list of class names to apply to the element.  Like the following:

``` json
{
  'body': 'mt5',
  'byline': 'blue mx2 center'
}
```

And then pipe it through:

``` javascript
gulp.task('mv2bass', function() {
  gulp.src('./src/**/*.html')
  .pipe(mv2bass(rules))
  .pipe(gulp.dest('dist'));
});
```

That will, as you would expect, output the following file in the `dist/` directory:

``` html
<html>
  <head></head>
  <body class="mt5">
    <h1>This is a header</h1>
    <h2 class="blue mx2 center">This is some text acting as a byline</h2>
  </body>
</html>
```

##Contributing

Obviously, this is still a work in progress.  Feel free to file an issue for bugs or submit a PR if you have a feature request.
