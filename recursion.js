var spiral = function(n){
    if(n>=0){
        console.log("Spiraling down...", n);
        spiral(n-1);
        console.log("Spiraling up...", n);
    }
};