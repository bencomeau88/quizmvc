var QUESTIONS = [
    {
        text: '<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 0
    },
    {
        text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 1
    },
    {
        text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 2
    },
    {
        text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 3
    }
];


var score = 0;
var count = 0;
var choice = undefined;

var Model = function(questions){
    this.questions = questions;

}
Model.prototype.getQuestionLength=function(){
    return this.questions.length;
}
//will pass question content to view where view will display data depending on the questions count
Model.prototype.getQuestionText= function(count){
    //console.log(this.questions[count]);
    return this.questions[count].text;

}

Model.prototype.getFirstQuestionChoices = function(count){
    return this.questions[count].answers;
}

Model.prototype.getCorrect = function(count){
    return this.questions[count].correct;
}

Model.prototype.getCountGiveNextQuestion = function(count){
        return this.questions[count].text;
    
    
}
Model.prototype.getCountGiveNextChoices = function(count){
    return this.questions[count].answers;
}

var View = function(){
this.questionsPageElement = $('.questions-page');
this.questionCurrentElement = $('.question-current');
this.questionsTotalElement = $('.questions-total');
this.questionElement = $('.question');
this.answersElement = $('.answers');
this.resultsPageElement = $('.results-page');
this.scoreElement = $('.score');
this.restartButtonElement = $('.restart-button');
    
}

View.prototype.showQuestionLength= function(questionLength){
    this.questionsTotalElement.text(questionLength);
}

View.prototype.showQuestionText = function(questionText){
    this.questionCurrentElement.text(count+1);
    this.questionElement.text(questionText);
}

View.prototype.showQuestionChoices = function(Firstchoices){
    for (var i = 0; i<Firstchoices.length;i++){
        this.answersElement.append('<li><button type="button">' + Firstchoices[i] + '</button></li>');
    }
   
}

View.prototype.showNextQuestion = function(questionText){
        this.questionCurrentElement.text(count+1);
        this.questionElement.text(questionText);

}
View.prototype.showNextChoices = function(nextChoices){
        this.answersElement.empty();
        for (var i = 0; i<nextChoices.length;i++){
        this.answersElement.append('<li><button type="button">' + nextChoices[i] + '</button></li>');
        }
        
    }

View.prototype.showResults = function(score){
    this.scoreElement.text(score);
    this.questionsPageElement.hide();
    this.resultsPageElement.show();
    
}


var myModel = new Model(QUESTIONS);
var myView = new View();
$(document).ready(function() {
    myView.showQuestionLength(myModel.getQuestionLength());
    myView.showQuestionText(myModel.getQuestionText(count));
    myView.showQuestionChoices(myModel.getFirstQuestionChoices(count));
    myView.answersElement.on("click", "button", function(){
        choice = $(this).parent().index();
        console.log(choice);
        console.log(myModel.getCorrect(count));
        if (choice === myModel.getCorrect(count)){
            score++;
            
        }
        count++;
        if(count < QUESTIONS.length){
            myView.showNextQuestion(myModel.getCountGiveNextQuestion(count));
            myView.showNextChoices(myModel.getCountGiveNextChoices(count));
        }
        else {
            myView.showResults(score);
        }
        
    });
    myView.restartButtonElement.click(function(){
        score = 0;
        count = 0;
        myView.resultsPageElement.hide(); 
        myView.questionsPageElement.show();
        myView.showQuestionText(myModel.getQuestionText(count));
    });

});
        

