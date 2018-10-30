var triviaAPI= (function(){



    var publicAPI = {
        getQuestion: (difficulty,category,type)=>{
            return fetch('https://opentdb.com/api.php?amount=1') 
            .then((response)=>{              
                return response.json(); 
            });
        }
    };

    return publicAPI;
})();