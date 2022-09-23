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
    window.sum = function() {
        return Array.from(arguments[0]).reduce((x1, x2) => x1 + x2);
    };
    window.product = function() {
        return Array.from(arguments[0]).reduce((x1, x2) => x1 * x2);
    };    
    window.mean = function() {
        return window.sum(arguments[0]) / arguments[0].length;
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
        'transcriptText': '',
        'playgroundText': ''
    };
    
    var app = angular.module('app', []);
    app.run(function($rootScope) {
        $rootScope.activeView = 'transcript.html'
        $rootScope.model = model;
    });    
    
    app.controller('playgroundCtrl', ['$scope', function($scope) {
        $scope.model = model;
        // | The `run` service evaluates the playground text and prepends it to the transcript text.
        $scope.run = function() {
            model.transcriptText = eval(model.playgroundText) + "\n" + model.transcriptText
        };
        // | The `clear` service erases the transcript text.
        $scope.clear = function() {
            model.transcriptText = '';
        };
        $scope.clearPlayground = function() {
            model.playgroundText = '';        
        };
    }]);
})();
