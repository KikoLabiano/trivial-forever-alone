var triviaAPI = (function () {



    var publicAPI = {
        getQuestion: (difficulty, category, type) => {
            //Compose API call
            if (difficulty !== "any") {
                difficulty = "&difficulty=" + difficulty;
            } else {
                difficulty = "";
            }
            if (category !== "any") {
                category = "&category=" + category;
            } else {
                category = "";
            }
            if (type !== "any") {
                type = "&type=" + type;
            } else {
                type = "";
            }
            return fetch('https://opentdb.com/api.php?amount=1' + difficulty + category + type)
                .then((response) => {                    
                    return response.json();
                });
        },
        shuffleAnswers: (answers) => {
            return shuffle(answers);
        },
        runner: (gen) => {
            const iterator = gen;
            function run(arg) {
                let res = iterator.next(arg);
                if (res.done) {
                    return res.value;
                } else {
                    return Promise.resolve(res.value).then(run);
                }
            }

            return run();
        }
    };

    function shuffle(array) {
        let currentIndex = array.length,
            temporaryValue, randomIndex;
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