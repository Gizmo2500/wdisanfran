//Simple Search
function simpleSearch(arr , val){
    for(var i = 0; i < arr.length; i++){
        if(arr[i] === val){
            return  i;
        }
        
    }
}