var sum = function () {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }

    return total;
}


// console.log(sum(1,1,1,1,1,1));

Function.prototype.myBind = function() {
    var current_func = this;
    var obj = arguments[0];
    var bindArgs = [].slice.call(arguments,1);
    var return_fun = function() {
        current_func.apply(obj, bindArgs)
    }

    return return_fun
}


function times(num, fun) {
  for (var i = 0; i < num; i++) {
    fun(); // call is made "function-style"
  }
}


var cat = {
  age: 5,

  ageOneYear: function () {
    this.age += 1;
    console.log(arguments)
  }
};

// times(10, cat.ageOneYear.myBind(cat,3,4));

function curriedSum (numArgs) {
    var numbers = [];
    var _curriedSum = function (numArg) {
        numbers.push(numArg);

        if (numbers.length === numArgs) {
            var total = 0
            for (var i = 0; i < numbers.length; i++) {
                total += numbers[i];
            }
            return total;
        } else {
            return _curriedSum;
        }
    };

    return _curriedSum;
}

// var sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1));

Function.prototype.curry  = function (numArgs) {
    var collectedArgs = [];
    var currentFunction = this;
    var something = function () {
        var args = [].slice.call(arguments);
        collectedArgs = collectedArgs.concat(args);
        if (collectedArgs.length === numArgs) {
            return currentFunction.apply(currentFunction, collectedArgs);
        } else {
           return something;
        }
    };
    return something;
};

// function sumThree(num1, num2, num3) {
//   return num1 + num2 + num3;
// }
//
//
// function sumThree(num1, num2, num3) {
//   return num1 + num2 + num3;
// }
//
// sumThree(4, 20, 3); // == 27
//
// // you'll write `Function#curry`!
// var f1 = sumThree.curry(3);
// var f2 = f1(4);
// var f3 = f2(20);
// var result = f3(3); // = 27
//
// // or more briefly:
// sumThree.curry(3)(4)(20)(3); // == 27