/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {             
    if (n >= 0 && n < array.length) {           //checking if it's between 0 and length of array.
      return array.slice(0, n);
    }else if(n > array.length) {                //if greater than length of array, just return whole array
      return array;
    }
    else {                                      //if n isn't given, return first element of array
      return array[0];
    }

  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n >= 0 && n < array.length) {
      return array.slice(array.length-n);
    }else if (n > array.length) {
      return array;
    }
    else {
      return array[array.length-1];
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var res;
    _.each(array, function(item, index) {
      if (item === target && res === undefined) {
        return res = index;
      }
    })
      return res || -1 ;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {              //refactor with each
    var newArray = [];
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (iterator(collection[i])) {
          newArray.push(collection[i]);
        }
      }
    }else {
      for (var each in collection) {
        if (iterator(collection[each])) {
          newArray.push(collection[each]);
        }
      }
    }
    return newArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply   // this really means ".filter()"
    // copying code in and modifying it
    var filteredArray = _.filter(collection, iterator);
    var diff = function (i) {
      return !(filteredArray.indexOf(i) != -1);     //determines if an item is in the filtered array
      }
    var result = _.filter(collection, diff);        //I'm filtering the collection based on whether the item is in the filtered array.
    return result; 
    }

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
     var newArray = [];
    for (var i = 0; i < array.length; i++) {
      if (newArray.indexOf(array[i]) == -1) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      newArray.push(iterator(array[i]));
    }
    return newArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var func;
    if (typeof methodName === 'string') {       
      func = list[methodName];
    } else {
      func = methodName;
    }

    var result = [];
    for (var i = 0; i < list.length; i++) {
      result.push(func.apply(list[i], args));
    };
    return result;
  }
     

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to the first element in the input array.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {                   //use each
    initialValue = typeof initialValue !== 'undefined' ? initialValue : 0;
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
      initialValue = iterator(initialValue, collection[i]);
    }
    }else {
      for (var key in collection) {
        initialValue = iterator(initialValue, collection[key]);
      }
    }
    return initialValue;
    
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (collection.length === 0) {                      //handling case of empty array
      return true;
    }
    if (iterator === undefined) {                       //setting default for no iterator
      return true;
    }
    return _.reduce(collection, function(wasFound, item) {    //this function must do every iteration. You can't just return out of it
      if (!wasFound) {                                        //if anything isn't found, this kills any future chance of returning true.
        return false;
      }else if(iterator(item)){                               
        return true;
      }else{
        return false;
      }
    }, true)
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here. 
    if (collection.length === 0) {
      return false;
    }

    iterator = iterator !== undefined ? iterator : function(item){return item;};  //setting default iterator function

    return _.reduce(collection, function(wasFound, item) {       //this is the same as 'every' except the first 'if' is flipped. try to be clever later and refactor this
      if (wasFound) {
        return true;
      }else if(iterator(item)) {
        return true;
      }else{
        return false;
      }
    }, false)
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var each in arguments[i]) {
        obj[each] = arguments[i][each];
      }  
    }
    
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var each in arguments[i]) {
        if (!(each in obj)) {
          obj[each] = arguments[i][each];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var result
    var storedFunc;
    var storedParameters;

    return function() {
      if (storedFunc === func && storedParameters === arguments) {
        return result;
      }else {
        storedFunc = func;
        storedParameters = arguments;
        result = func.apply(this, arguments);
        return result;
      }

    }

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {                    //talk to someone about this, this seems like a bad answer;
  var params = [];
  if (arguments.length > 2) {
    for (var i = 2; i < arguments.length; i++) {
      params.push(arguments[i]);
    }
    setTimeout(func.apply(this, params), wait);
  } else {
    setTimeout(func, wait);
    }

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    var bag = [];
    var shuffled = [];
    for (var i = 0; i < array.length; i++) {
      bag.push(i);
    }
    for (var j = 0; j < array.length; j++) {
      var randomIndex = Math.floor(Math.random() * array.length)
      shuffled[randomIndex] = array[j];
    }
    return shuffled;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var cleanCollection = [];
    var item = _.each(collection, function(item) {
      var result = iterator(item);
      if (result) {
        cleanCollection.push(item);
      }
    });
    console.log(cleanCollection);

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    //create a new array that contains many arrays, each one containing one of each of that index. 
    //create master array. 
    //go through each argument, take the item and if the master array doesn't have that index number, create an array at that index number, and add the item to that.
    var zippedArray = [];
    var maxLength = 0;
    for (var each in arguments) {                            //grabbing max length; feels hacky. don't like this.
      var length = arguments[each].length;
      if (length > maxLength) {
        maxLength = length;
      }
    }

    for (var i = 0; i < arguments.length; i++) {            //go through every passed in array
      var currentArray = arguments[i];                      //just declaring for readability
      for (var j = 0; j < maxLength; j++) {       
        if (zippedArray[j] === undefined) {                 //if the array index doesn't exist, create an array at that index and populate with current item
          zippedArray[j] = [currentArray[j]];
        }
        else {
          zippedArray[j].push(currentArray[j]);             //if the index already exists, then add the current item to the index.
        }
      }
    }
    return zippedArray;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) { 
    var flattened = [];
    //loop through whole array. if you see an array, recurse down. keep recursing till you find an item, then push that to the flattened.
    _.each(nestedArray, function(item) {
      if (Array.isArray(item)) {
        var temp = _.flatten(item)
        if (temp) {
          for (var i = 0; i < temp.length; i++) {
            flattened.push(temp[i]);
          }
        }
        return flattened;
      }else {
        return flattened.push(item);
      }
    })
    return flattened;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    //use arguments to go through each passed in array. 
    //really, just take first argument, use it as "master". then go through, and check against other arguments.
    //use splice (index, 1) to remove the item from the list. This changes the original array, which is what we want in this case. 
    var firstArray = arguments[0]
    var master = [];
    for (var k = 0; k < firstArray.length; k++) {
      master.push(firstArray[k]);
    }

    for (var i = 1; i < arguments.length; i++) {          //loop through each argument starting with the 2nd
      var currentArray = arguments[i];                    //just naming for readability
      for (var j = 0; j < firstArray.length; j++) {           //loop through each item in the current argument.
        if (currentArray.indexOf(firstArray[j]) === -1) {       
            master.splice(master.indexOf(firstArray[j]), 1);   //if the current item is not contained in the master array, delete item from the master. 
        }       
      }
    }
    return master;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var firstArray = arguments[0]
    var master = [];
    for (var k = 0; k < firstArray.length; k++) {
      master.push(firstArray[k]);
    }
   
    for (var i = 1; i < arguments.length; i++) {          //loop through each argument starting with the 2nd
      var currentArray = arguments[i];                    //just naming for readability
      for (var j = 0; j < firstArray.length; j++) {           //loop through each item in the current argument.
        if (currentArray.indexOf(firstArray[j]) != -1) {       
            master.splice(master.indexOf(firstArray[j]), 1);                          //if the current item is in another array, it's not different, so we'll remove it from the master array. 
        }
      }
    }
    return master;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Return an object that responds to chainable function calls for map, pluck,
  // select, etc.
  //
  // See the Underbar readme for details.
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
