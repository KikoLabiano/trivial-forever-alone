var enumDif = {
    
}

$(function(){

    $("#newQ").on("click",function(e){
        triviaAPI.getQuestion(1,1,1)
        .then((q)=>{
            console.log(q)
        });           
    });
});