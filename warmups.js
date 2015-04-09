//Simple Search
function simpleSearch(arr , val){
    for(var i = 0; i < arr.length; i++){
        if(arr[i] === val){
            return  i;
        }
        
    }
}



var binSearch = function (arr,val) {

  var min = 0;
  var max = arr.length;
  var mid = Math.floor((max+min)/2);

  while(min <= max) {
    if (val === arr[mid]) {
      return mid;
    } else if (val < arr[mid]) {
      max = mid - 1;
      mid = Math.floor((max+min)/2);
    } else {
      min = mid + 1;
      mid = Math.floor((max+min)/2);
    }
  }

  return -1;
};



var merge = function(left, right){
    var result  = [],
        il      = 0,
        ir      = 0;

    // So first we need to loop through both arrays, adding the element that is smallest
    while (il < left.length && ir < right.length){
        if (left[il] < right[ir]){ // If left is less than right, add the left element
            result.push(left[il]);
            il += 1;
        } else { // Else add the right element
            result.push(right[ir]);
            ir +=1;
        }
    }

    // Now we add on any elements that remain at the end of one array or the other.
    if (il < left.length) {
        for (var i = il; i < left.length; i++) {
            result.push(left[i]);
        }
        return result;
    } else if(ir < right.length) {
        for (var i = ir; i < right.length; i++) {
            result.push(right[i]);
        }   
        return result;
    } else {
        return result;
    }
}


// And we can test this with:

merge([3, 8, 22], [1, 5, 7]); // returns [1, 3, 5, 7, 8, 22];

merge([6, 7, 50, 55], [2, 12, 35, 71]); // returns [2, 6, 7, 12, 35, 50, 55, 71]


// A fun version using .concat
var merge2 = function(left, right){
    var result  = [],
        il      = 0,
        ir      = 0;

    while (il < left.length && ir < right.length){
        if (left[il] < right[ir]){
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }

    return result.concat(left.slice(il)).concat(right.slice(ir));
}
//bubble sort
function bubbleSort(a)
{
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}
 
bubbleSort(a);
console.log(a);
