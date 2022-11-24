(function() {
    // | Copy all underscorejs services into the global scope.
    for (var key in _) {
        if (!(key in window)) {
            window[key] = _[key];
        }
    }
    
    window.global = window;
    
    // | Make math services accessible as global scope services.
    window.random = Math.random.bind(window);
    window.e = Math.E;
    window.pi = Math.PI;
    window.sqrt = Math.sqrt.bind(window);
    window.ln = Math.log.bind(window);
    window.log = Math.log10.bind(window);
    window.trunc = Math.trunc.bind(window);
    window.ceil = Math.trunc.bind(window);
    window.floor = Math.trunc.bind(window);
    
    window.sum = function() {
        return Array.from(arguments[0]).reduce((x1, x2) => x1 + x2);
    };
    window.product = function() {
        return Array.from(arguments[0]).reduce((x1, x2) => x1 * x2);
    };    
    window.mean = function() {
        return window.sum(arguments[0]) / arguments[0].length;
    };    
    window.median = function(xs) {
        var sorted = xs.sort();
        var mid = Math.floor(sorted.length / 2);
        if (sorted.length % 2 == 1) {
            return sorted[mid];
        } else {
            return (sorted[mid - 1] + sorted[mid]) / 2;
        }
    };

    window.mode = function() {
        dict = {};
        var most = Number.NEGATIVE_INFINITY;
        var what = null;
        arguments[0].forEach(x => {
            if (!(x in dict)) {
                dict[x] = 0;
            }
            
            var res = ++dict[x];
            if (res > most) {
                most = res;
                what = x;
                dict[x] = res;
            }
        });
        return what;
    }
    
    window.min = function(xs) {
        return xs.sort()[0];    
    };
    window.max = function(xs) {
        return xs.sort()[xs.length - 1];
    }
    
    Array.prototype.mean = function() {
        return mean(this);
    };
    Array.prototype.median = function() {
        return median(this);
    };
    Array.prototype.mode = function() {
        return mode(this);
    };
    Array.prototype.product = function() {
        return product(this);
    };       
    Array.prototype.sum = function() {
        return sum(this);
    };
    Array.prototype.min = function() {
        return min(this);
    };
    Array.prototype.max = function() {
        return this.sort().reverse()[0];
    }        
    
    window.factorial = function(n) {
        function recur(n, acc) {
            if (n == 0) {
                return acc;
            } else {
                return recur(n-1, n*acc);
            }
        }
        return recur(n, 1);
    }

    window.permutation = function(n, r) {
        return factorial(n) / factorial(n - r)
    }

    window.combination = function(n, r) {
        return permutation(n, r) / factorial(r);
    }; 
    
    window.compose = function(f, g) {
        return function() {
            return f.call(this, g.apply(this, arguments));
        }
    };
})();

(function() {
    'use strict';
    
    var model = {
        'consoleResponseText': '',
        'scriptEditorText': ''
    };
    
    var app = angular.module('app', []);
    app.run(function($rootScope) {
        $rootScope.activeView = 'script-editor.html'
        $rootScope.model = model;
    });    
    
    window.display = function(text) {
        model.consoleResponseText = text + "\n" + model.consoleResponseText;
    };
    
    app.controller('scriptEditorCtrl', ['$scope', function($scope) {
        $scope.model = model;
        // | The `run` service evaluates the playground text and prepends it to the transcript text.
        $scope.run = function() {   
            var evalResult = eval(model.scriptEditorText);
            var prevText = model.consoleResponseText; 
            var newResponseText = evalResult + "\n" + prevText;
            
            model.consoleResponseText = newResponseText;
        };
        // | The `clear` service erases the transcript text.
        $scope.clearConsoleResponseText = function() {
            model.consoleResponseText = '';
        };
        $scope.clearScriptEditorText = function() {
            model.scriptEditorText = '';        
        };
    }]);
})();
