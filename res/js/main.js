// constructor for question
function Frage(frage_id, bereich_id, text, kat_nr, image, erklaerung) {

	this.frage_id = frage_id;
	this.bereich_id = bereich_id;
	this.text = text;
	this.kat_nr = kat_nr;
	this.image = image;
	this.erklaerung = erklaerung;
	this.antworten = new Array();
	this.gegAntworten = new Array();
}

// constructor for answer
function Antwort(antwort_id, frage_id, text, loesung, image) {

	this.antwort_id = antwort_id;
	this.frage_id = frage_id;
	this.text = text;
	this.loesung = loesung;
	this.image = image;

} 

// constructor for category
function Kategorie(bereich_id, kat_nr, bezeichnung) {
	this.bereich_id = bereich_id;
	this.kat_nr = kat_nr;
	this.bezeichnung = bezeichnung;
}

// function for loading questions and answers
// right now hard coded, next with query to php file
// function returns an array of questions
// question has an attribute an array of answers
function loadQuestions() {

	// create questions
	// here will be a select of questions from new bereich/kategorie
	// result will be an array of questions
	var frage1 = new Frage("1", "1", "The correct answer is 2 long text long textlong textlong textlong tlongong textlong textlong textlong textlong text", "11", "none", "I told you it was 2");
	var frage2 = new Frage("2", "1", "The correct answer is 1 and 3", "11", "none", "I told you it was 1");
	var frage3 = new Frage("3", "1", "The correct answer is 3", "11", "none", "I told you it was 3");
	var frage4 = new Frage("4", "1", "The correct answer is \"Teo\"", "11", "none", "I told you it was \"Teo\"");
	
	var fragen = new Array(frage1, frage2, frage3, frage4);

	
	// create answers
	// here will be a for loop going through each question from the array --> select answers WHERE frage_id is the same
	// link the array of answers to the question
	// now everything done statically
	
	//(antwort_id, frage_id, text, loesung, image)
	
	// answers for question 1
	var ant1 = new Antwort("1", "1", "1", "false", "none");
	var ant2 = new Antwort("2", "1", "2", "true", "none");
	var ant3 = new Antwort("3", "1", "3", "false", "none");

	var antworten1 = new Array(ant1, ant2, ant3);
	
	// link answers to question 1
	fragen[0].antworten = antworten1;
	
	// answers for question 2
	var ant4 = new Antwort("4", "2", "1", "true", "none");
	var ant5 = new Antwort("5", "2", "2", "false", "none");
	var ant6 = new Antwort("6", "2", "3", "true", "none");
	var ant7 = new Antwort("7", "2", "4", "false", "none");
	
	var antworten2 = new Array(ant4, ant5, ant6, ant7);
	
	// link answers to question 2
	fragen[1].antworten = antworten2;
	
	// answers for question 3
	var ant8 = new Antwort("8", "3", "1", "false", "none");
	var ant9 = new Antwort("9", "3", "2", "false", "none");
	var ant10 = new Antwort("10", "3", "3", "true", "none");

	var antworten3 = new Array(ant8, ant9, ant10);
	
	// link answers to question 3
	fragen[2].antworten = antworten3;
	
	// answers for question 4
	var ant11 = new Antwort("11", "4", "none", "Teo", "none");

	var antworten4 = new Array(ant11);
	
	// link answers to question 4
	fragen[3].antworten = antworten4;
	
	
	// return the questions linked to their answers
	return fragen;

}

function storeResults() {
	
	var check = $('.checkboxAnswer');
	if(check.length > 0) {
	
		// if we have checkboxes
		// get answer array from question
		var answerArray = new Array();
	
		var ind;
	
		// give own answers
		for( ind = 0; ind < check.length; ++ind) {
		
			if(check[ind].checked == true) {
			
				answerArray.push("true");
			
			}
			else {
				answerArray.push("false");
			}
		
		}
	
		// save own answers to question
		fragen[currentPage].gegAntworten = answerArray;
	
		
	
	}
	
	else {
	
		var text = document.getElementById("inputField").value;
		fragen[currentPage].gegAntworten[0] = text;
		
	}
		
	
}

function displayResults() {

	$('#content').empty();
	
	$('#content').append('<ol id="resultsList"></ol>');
	
	var ind;
	
	// display results in a list
	
	// go through each question
	for (ind = 0; ind < fragen.length; ++ind) {
	
		var frage = fragen[ind];
		
		var i;
		var ant = frage.antworten;
		var gegAnt = frage.gegAntworten;
		
		var correct = true;
		
		
		
		
		// go through answers of the question
		for(i = 0; i < ant.length; ++i) {
		
			//alert(gegAnt[i].loesung.toLowerCase());
		
			if( ant[i].loesung.toLowerCase() != gegAnt[i].toLowerCase() ) {
			
				correct = false;
			
			}
		
		}
		
	
		// display result of the question based on "correct" variable
		if (correct == true) {
		
			$('#resultsList').append('<li id="frageID_'+frage.frage_id+'"><a href="#">'+ (ind+1) + '. ' + frage.text+'<img class="tickImage" src="res/images/checkIcon.png"></a></li>');
		
		}
		
		else {
			$('#resultsList').append('<li id="frageID_'+frage.frage_id+'"><a href="#">' + (ind+1) + '. ' + frage.text+'<img class="xImage" src="res/images/xIcon.png"></a></li>');
		}
	
		
	
	}
	
	// display button to start again
	
	$('.footer').empty();
	$('.footer').append('<div><a id="btnNew" href="#">Neu starten</a></div>');
	
	$('#btnNew').click(function() {
	
		restart();
	
	});

	// link list elements to detail pages
	$('[id^="frageID_"]').click(function() {

		displayExplanation(this);
	
	});	
	
}

function displayExplanation(object) {

	$('#content').empty();
	
	var id = object.id.substr(8);

	var ind;
	var explanation = "";
	
	for(ind=0; ind < fragen.length; ++ind) {
	
		if(fragen[ind].frage_id == id)
			explanation = fragen[ind].erklaerung;
	
	}
	
	$('#content').append('<div class="infoPage">'+ explanation +'</div>');
	
	$('.footer').empty();
	$('.footer').append('<div><a id="btnBack" href="#">Zurück</a></div>');

	$('#btnBack').click(function() {
	
		displayResults();
	
	});
	
}


// display the question from the array with the given index
function displayQuestion() {

	$('#content').empty();

	$('#content').append('<div class="counter">Frage '+(currentPage+1)+' von '+fragen.length+'</div>');

	var frage = fragen[currentPage];
	
	$('#content').append('<div class="frage">'+ (currentPage+1)+'. '+ frage.text +'</div>');
	
	$('#content').append('<form id="answerForm"></form>');
	
	var antworten = frage.antworten;
	
	if(antworten.length > 1) {
		// put in multiple choice test

		var ind;
		
		for(ind = 0; ind < antworten.length; ++ind) {
		
			$('#answerForm').append('<input class="checkboxAnswer" type="checkbox" name="answers" value="true">'+ antworten[ind].text +'<br>');
		
		}

	}
	else {
		// put in input field
		
		$('#answerForm').append('Antwort: <input id="inputField" class="inputAnswer" type="text">');

	}
	
	
}



function goRight() {

	storeResults();
	if(currentPage < fragen.length - 1) {
		currentPage += 1;
		displayQuestion();
	}
	else {
		displayResults(fragen);
	}

}

function goLeft() {
	storeResults();
	
	if(currentPage > 0) {
		currentPage -= 1;
		displayQuestion();
	}
}


function restart() {

	// redisplay buttons
	
	$('.footer').empty();
	$('.footer').append('<ul><li><a id="btnLeft" href="#">Zurück</a></li><li><a id="btnRight" href="#">Weiter</a></li></ul>');
	
	// go right or display results
	$('#btnRight').click(goRight);
		
	// go left or do nothing
	$('#btnLeft').click(goLeft);
	
	currentPage = 0;
	fragen = loadQuestions();
	displayQuestion();
	
	

}

// starting function
{

	$('.footer').empty();
	$('.footer').append('<ul><li><a id="btnLeft" href="#">Zurück</a></li><li><a id="btnRight" href="#">Weiter</a></li></ul>');

	// go right or display results
	$('#btnRight').click(goRight);
		
	// go left or do nothing
	$('#btnLeft').click(goLeft);

	var currentPage = 0;

	var fragen = loadQuestions();
	
	displayQuestion();

}



