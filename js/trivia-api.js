var triviaAPI= (function(){



    var publicAPI = {
        getQuestion: (difficulty,category,type)=>{
            return fetch('https://opentdb.com/api.php?amount=1') 
            .then((response)=>{              
                return response.json(); 
            });
        },
        shuffleAnswers: (answers)=>{
            return shuffle(answers);
        }
    };

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        console.log(array);
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      console.log(array);
        return array;
      }

    return publicAPI;
})();