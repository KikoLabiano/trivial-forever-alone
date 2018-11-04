var enumDif = {

}

$(function () {
    //newQ($("#trivia_difficulty").val(), $("#trivia_category").val(), $("#trivia_type").val());
    $("#btnNewQ").on("click", function () {
        newQ($("#trivia_difficulty").val(), $("#trivia_category").val(), $("#trivia_type").val());
    });
});

function newQ(diff, cat, ty) {
    //Clear responses background
    $(".card-body").css("background-color", "white");

    //Get the new question
    triviaAPI.getQuestion(diff, cat, ty)
        .then((q) => {
            var {
                response_code,
                results: [{
                    category,
                    correct_answer,
                    incorrect_answers: [a0, a1, a2],
                    question,
                    type
                }]
            } = q;
            console.log(q);
            console.log(response_code);
            console.log(category);
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
                    //     newQ(1, 1, 1);
                    // }, "1000");
                });
            });
        });

}