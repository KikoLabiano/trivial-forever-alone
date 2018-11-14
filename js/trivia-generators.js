$(function () {
    $("#btnNewQ").on("click", function () {
        triviaAPI.runner(getQ($("#trivia_difficulty").val(), $("#trivia_category").val(), $("#trivia_type").val()));
    });
});

function* getQ(diff, cat, ty) {
    //Clear responses background
    $(".card-body").css("background-color", "white");

    var q = yield triviaAPI.getQuestion(diff, cat, ty);

    //Intento de crear mi propio iterable
    //     var iterable = {
    //         *[Symbol.iterator]() {
    //             for (let [key, value] of Object.entries(q)) {
    //                 yield value;
    //             }
    //         }
    //     };
    // console.log(typeof iterable);
    // console.log([...iterable]);
    // console.log(typeof iterable[Symbol.iterator]);

    //Este destructuring no sé por qué cullons no funciona.
    //Uncaught (in promise) TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined
    // at getQ (trivia-generators.js:29)
    // at getQ.next (<anonymous>)
    // at run (trivia-api.js:34)
    // var {
    //     response_code,
    //     results: [{
    //         category,
    //         correct_answer,
    //         incorrect_answers: [a0, a1, a2],
    //         question,
    //         type
    //     }]
    // } = q;

    //Más manual
    let res = q.results[0];
    let [category,
        correct_answer,
        [a0, a1, a2],
        question,
        type
    ] = [res.category, res.correct_answer, [res.incorrect_answers[0], res.incorrect_answers[1], res.incorrect_answers[2]], res.question, res.type];

    $("#cardQ").html(question);

    //Random order for answers
    let answers = triviaAPI.shuffleAnswers([a0, a1, a2, correct_answer]);
    //Assign text to cards
    if (type === "multiple") {
        $("#cardA34").removeClass("d-none");
        $("#cardA1Text").html(answers[0]);
        $("#cardA2Text").html(answers[1]);
        $("#cardA3Text").html(answers[2]);
        $("#cardA4Text").html(answers[3]);
    } else {
        //Hide row por non-multiple questions
        $("#cardA34").addClass("d-none");
        //Delete null/undefined answers (True/False type and posible API data errors)
        answers = answers.filter((el) => {
            return el != null;
        });
        $("#cardA1Text").html(answers[0]);
        $("#cardA2Text").html(answers[1]);
    }

    //Card Click binding
    $(".cardA").each(function () {
        $(this).on("click", function () {
            //It's a correct answer?
            if ($(this).find(".card-text").html() === correct_answer) {
                $(this).find(".card-body").css("background-color", "#47FF75");
            } else {
                $(this).find(".card-body").css("background-color", "red");
                //If wrong answer find true one and mark it
                $(".cardA").each(function () {
                    if ($(this).find(".card-text").html() === correct_answer) {
                        $(this).find(".card-body").css("background-color", "#47FF75");
                    }
                });
            }
            // setTimeout(function () {
            //     $(".card-body").css("background-color", "white");                
            // }, "1000");
            // triviaAPI.runner(getQ($("#trivia_difficulty").val(), $("#trivia_category").val(), $("#trivia_type").val()));
        });
    });
}