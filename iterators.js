
function eliminateDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}

var uniq = function(array) {
    var uniqueArray = [];

    for (var i = 0; i < array.length; i++) {
        if (uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }

    return uniqueArray;
};

var each = function(array, callback) {
    for (var i = 0; i < array.length; i++) {
        callback(array[i]);
    }

    return array;
}

var map = function(array, callback) {
    var results = [];

    for (var i = 0; i < array.length; i++) {
        results.push(callback[i]);
    }

    return results;
};

