<!DOCTYPE html>
<html>
  <head>
    <title>JavaScript</title>

    <!-- boilerplate/web-frameworks -->
    <link rel="manifest" href="manifest.json" />
    <link rel="icon" type="image/ico" href="icons/icon.ico" />    
    <link rel="stylesheet" href="styles/style.css"></link>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="mobile-web-app-capable" content="yes" />   
    <link rel="stylesheet" href="deps/bootstrap.css" />
    <script src="deps/angular.js"></script>
    <script src="deps/jquery.js"></script> 
    <script src="deps/bootstrap.js"></script>
    <script src="deps/underscore.js"></script>    
    <script src="deps/glm_1.js"></script>
    <script src="deps/glm_2.js"></script>
    <script src="app.js"></script>
  </head>
  <body data-ng-app="app">
    <nav class="navbar navbar-inverse navbar-static-top" style="position: absolute; top: 0px; left: 0px; width: 100vw;  overflow-x: hidden">
      <ul class="nav navbar-nav">
        <li><a href="javascript:void(0)" data-ng-click="activeView='console-responses.html'">Console Responses</a></li>
        <li><a href="javascript:void(0)" data-ng-click="activeView='script-editor.html'">Script Editor</a></li>
        <li><a href="javascript:void(0)" data-ng-click="activeView='help.html'">Help</a></li>
      </ul>
    </nav>
    
    <div data-ng-include="activeView" style="position: absolute; box-sizing: border-box; padding-top: 50px; width: 100%; height: 100%;"></div>
  
    <div id="template-cache">
      <script type="text/ng-template" id="console-responses.html">        
        <div style="width: 100%; height: 100%; box-sizing: border-box; padding-bottom: 20px;">
          <textarea 
             data-ng-model="model.consoleResponseText" 
             style="width: 100%; height: 100%; font-family: Courier New; font-size: 10pt; font-weight: bold;">
          </textarea>
        </div>
      </script>

      <script type="text/ng-template" id="script-editor.html">
        <div data-ng-controller="scriptEditorCtrl" style="width: 100%; height: 100%; overflow-x: hidden;">
          <nav class="navbar navbar-inverse navbar-static-top" style="font-size: 8pt !important; padding: 0px !important;">
            <ul class="nav navbar-nav">
              <li><a href="javascript:void(0)" data-ng-click="run()">Run</a></li>
              <li><a href="javascript:void(0)" data-ng-click="clearConsoleResponseText()">Clear Responses</a></li>
              <li><a href="javascript:void(0)" data-ng-click="clearScriptEditorText()">Clear the Script Editor</a></li>
            </ul>
          </nav>

          <textarea data-ng-model="model.scriptEditorText" style="position: absolute; bottom:0px; left: 0px; width: 100%; height: 100%; box-sizing: border-box; padding: 2px; padding-top: 102px; font-family: Courier New; font-size: 10pt; font-weight: bold;"></textarea>
        </div>
      </script>

      <script type="text/ng-template" id="help.html">
        <div data-ng-controller="scriptEditorCtrl" style="width: 100%; height: 100%; overflow-x: hidden;">
<pre>
---
Basic usage:

Script Editor tab can be used to enter computations or scripts and run them.
When a computation is ran, its result is displayed in the Console Responses tab.
If there are multiple statements in the script, only the result of the last
    statement is going to be logged in the console responses tab. You can use
    display function to display multiple statements in one script rather than
    only the last one.    

Here is a brief list of global services, some of which can be accessed through array's dot directly:
    max, min, floor, ceil, trunc, combination, permutation,
    mean, median, mode, e, pi, ln(base e), log(base 10), 
    product, sum, sqrt, display.

Basic use cases(more advanced ones are listed in sections below):
    1. 2 + 2
    2. ln(2) + pi
    3. pi**2
    4. e**(pi*sqrt(e))
    5. combination(3, 2)
    6. permutation(3, 2)
    7. random()
    8. range(100).map(
    9. range(100) // Generates a sequence of numbers 0..100
    10. range(100).map(x => x + 1) generates a sequence of numbers 1..101
    11. range(100).map(random) generates 100 random numbers between 0 and 1
    12. range(100).map(x => trunc(random() * 100)) generates 100 random numbers 0 through 99
    13. 
let x = range(100).map(x => trunc(random() * 100));
display("sequence: " + x);
display("sum: " + x.sum());
display("mean: " + x.mean());
display("mean: " + x.median());
display("mean: " + x.mode());
    14. 
window.comb = combination;  // Alias combination to "comb" as it is shorter, you can also name "c".
comb(3, 2);                 // 3C2 = 3    

In addition, lambda calculator offers a few lambda calculus services, which
is what the calculator is named after - a calculator that supports lambda
calculus

here is an example:

let f = x => 2;         // f(x) = 2
let g = x => 3 * x;     // g(x) = 3*x 
let h = compose(g, f);  // h = g . f = 3*f(x) = 3*2 = 6
display(h(2));          // 6
---
The Lambda Calculator in essence is just a glorified developer console.

While seemingly simple, it is profoundly useful on mobile devices
which do not allow you access to the developer console and 
recently disabled the use of javascript: in URL bar, which is 
a great shame since it was useful for doing fun things like
running `javascript:(()=>{document.body.style.filter = 'invert(100%)'})();`
to invert colors on a webpage or flipping videos on the webpage, or
change video playback speed on a webpage.

The Lambda Calculator was created when I was taking statistics at 
university, and found that I needed a tool to generate a large
set of random numbers, and potentially sort them, find their averages
and so on.

The lambda calculator exposes javascript Math functions to be used without
their Math. prefix, that is, you can use log instead of Math.log and 
random instead of Math.random, pi instead of Math.PI, and e instead of
Math.E.

The Lambda Calculator is a standalone offline web-application, meaning
you can download the applicaiton locally and it will work even without
internet. You can download the project by visiting 
https://github.com/CodeDmitry/Lambda-Calculator/releases/tag/1.0.0
unless it has been renamed or removed.

</pre>          
        </div>
      </script>
      
    </div>
  </body>
</html>
