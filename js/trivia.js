var enumDif = {

}

$(function () {

    // $("#newQ").on("click",function(e){
    triviaAPI.getQuestion(1, 1, 1)
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
            $("#cardQ").html(question);
            console.log(q);
            console.log(response_code);
            console.log(category);
            let answers = triviaAPI.shuffleAnswers([a0, a1, a2, correct_answer]);
            if (type === "multiple") {
                $("#cardA1Text").html(answers[0]);
                $("#cardA2Text").html(answers[1]);
                $("#cardA3Text").html(answers[2]);
                $("#cardA4Text").html(answers[3]);
            } else {
                $("#cardA34").addClass("d-none");
                answers = answers.filter((el) => {
                    return el != null;
                });
                $("#cardA1Text").html(answers[0]);
                $("#cardA2Text").html(answers[1]);
            }

            $(".cardA").each(function(){
                $(this).on("click",function(){
                    if($(this).find(".card-text").html() === correct_answer){
                        $(this).find(".card-body").css("background-color","green");
                    }
                    else{
                        $(this).find(".card-body").css("background-color","red");
                    }
                });
            });


        });
    //  });
});