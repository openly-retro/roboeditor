window.onload = function () {
//   window.console.log("loadedwooo");
//   // GET ALL THE PLAYERS - DRAGGABLE AND DROP ZONES
  var draggable = document.querySelectorAll(".draggable"),
      dropzones = document.querySelectorAll(".dropzone"),
      worddrop   = document.getElementById("worddrop"),
      storyDrop = document.getElementById('storydrop'),
      storyTitleElement = document.querySelector('.fakeeditor > span.title'),
      currentStoryRef = 'darkAndStormy';

      addDraggableWords( worddrop );

      // Drop generated content into le story

      var currentStory = generateProse( currentStoryRef );
      storyDrop.innerHTML = currentStory.innerHTML;
      storyTitleElement.innerText = getStoryTitle( currentStoryRef );


      $( ".draggable" ).draggable({revert: "invalid"});
      // draggable.forEach( function (grabit) {
      //   $(grabit).draggable({revert: "invalid"});
      // });

      // dropzones.forEach( function (dropit) {
      //   $(dropit).droppable();
      // });
      $('#wordpick').droppable();

      ["noun", "verb", "adjective", "adverb", "nounplural"].forEach( function (wordType) {
        $( ".dropzone."+wordType ).droppable({
          accept: "."+wordType,
          classes: {
            "ui-droppable-active": "ui-state-highlight"
          },
          drop: function( event, ui ) {
            basicDropCallback( event, ui, this);
          }
        });
      });
        

      // $( ".dropzone.noun" ).droppable({
      //   accept: ".noun",
      //   classes: {
      //     "ui-droppable-active": "ui-state-highlight"
      //   },
      //   drop: function( event, ui ) {
      //     basicDropCallback( event, ui, this);
      //   }
      // });

      // $( ".dropzone.verb" ).droppable({
      //   accept: ".verb",
      //   classes: {
      //     "ui-droppable-active": "ui-state-highlight"
      //   },
      //   drop: function( event, ui ) {
      //     basicDropCallback( event, ui, this);
      //   }
      // });

      // $( ".dropzone.adverb" ).droppable({
      //   accept: ".adverb",
      //   classes: {
      //     "ui-droppable-active": "ui-state-highlight"
      //   },
      //   drop: function( event, ui ) {
      //     basicDropCallback( event, ui, this);
      //   }
      // });

      // $( ".dropzone.nounplural" ).droppable({
      //   accept: ".nounplural",
      //   classes: {
      //     "ui-droppable-active": "ui-state-highlight"
      //   },
      //   drop: function( event, ui ) {
      //     basicDropCallback( event, ui, this);
      //   }
      // });

      // $( ".dropzone.adjective" ).droppable(
      //   {
      //     accept: ".adjective",
      //     classes: {
      //       "ui-droppable-active": "ui-state-highlight"
      //     },
      //     drop: function( event, ui ) {
      //       basicDropCallback( event, ui, this);
      //     }
      //   }
      // );

      $('#calculatefix').click(function (event) {
        // $('.calculatescore').text("haha sooo funny");
        window.console.log("im still relevant)");
        var newScore = calculateScore();
        $('.scorecard').show();
        $('.scorecontent').text(
          "Through fine use of wordsmithery and keyboard mashing, " +
          "your efforts have earned you " + String( newScore ) + " points."
         );
      });

      $('#closescorecard').click(function (event) {
        $('.scorecard').hide();
      });
     
}

var basicDropCallback = function basicDropCallback( event, ui, dropObject ) {
  $( dropObject )
      .addClass( "ui-state-default" );
    ui.draggable.draggable("disable");
    fillInDropWithTarget( ui.draggable, $(dropObject) );
    window.console.log("Dropped a word");
}

var fillInDropWithTarget = function fillInDropWithTarget( dragged, dropzone ){
  dropzone.text("");
  dropzone.append(dragged);
  dragged.removeClass(
      "ui-draggable ui-draggable-handle ui-draggable-disabled ui-draggable-dragging"
  );
  dragged.addClass("dropped");
  dragged.attr("style", "");
  
  var oldScore = dropzone.attr("score");
  dragged.attr("oldscore", oldScore);
};

var addDraggableWords = function addDraggableWords( dropzoneElement ) {
  
  var adjectives = createManyWords( "adjective", Math.floor(Math.random()*5) +1);
  var nouns = createManyWords( "noun", Math.floor(Math.random()*5) +1 );
  var adverbs = createManyWords( "adverb", Math.floor(Math.random()*5) + 1);
  var verbs = createManyWords( "verb", Math.floor(Math.random()*5)+1);
  adjectives.forEach( function (draggableWord) {
    dropzoneElement.appendChild(draggableWord);
  });
  nouns.forEach( function (draggableWord) {
    dropzoneElement.appendChild(draggableWord);
  });
  adverbs.forEach( function (draggableWord) {
    dropzoneElement.appendChild(draggableWord);
  });
  verbs.forEach( function (draggableWord) {
    dropzoneElement.appendChild(draggableWord);
  });
}

/**
  return list of DIV-ed up words
*/
var createManyWords = function createManyWords( wordType, numWords ) {
  var wordList = [];
  for (var i = 0; i < numWords; i++) {
    wordList.push( createDraggableWord( wordType ) );
  }
  return wordList;
}

var createDraggableWord = function createDraggableWord( wordType ) {
  // word types: noun, adjective
  let wordList = Object.keys(wordReference[wordType]);
  var randomWordText = wordList[
    Math.floor(Math.random()*wordList.length)
  ];
  var wordScore = wordReference[wordType][randomWordText];
  var draggableWord = document.createElement('DIV');
  draggableWord.classList.add("draggable", wordType);
  draggableWord.setAttribute("score", wordScore);
  draggableWord.textContent = randomWordText;
  return draggableWord;
}

// <div class="draggable adjective">scintillating</div>
//         <div class="draggable adjective">refreshing</div>
//         <div class="draggable nounplural">butterflies</div>

var calculateScore = function calculateScore() {
  var usedWords = document.querySelectorAll('.draggable.dropped');
  var scoreOfExistingWords = 0;
  var scoreOfUsedWords = 0;
  usedWords.forEach( function (wordElement) {
    scoreOfExistingWords += parseInt(wordElement.getAttribute("oldscore"));
    scoreOfUsedWords += parseInt(wordElement.getAttribute("score"));
  });

  return (scoreOfUsedWords - scoreOfExistingWords);
}

var wordReference = {
  adjective: {
    "scintillating": 4,
    "refreshing": 3,
    "valuable": 4,
    "ominous": 3,
    "chipped": 1,
    "fragrant": 2
  },
  noun: {
    "butterfly": 3,
    "clog": 1,
    "sentiment": 3,
    "confusion": 3,
    "forest": 2,
    "cellphone": 2
  },
  adverb: {
    "refreshingly": 4,
    "stupidly": 3,
    "diametrically": 5,
    "really": 2
  },
  verb: {
    "galloped": 2,
    "refuted": 3,
    "agonized": 3,
    "interpolated": 5,
    "magnified": 3,
    "heard": 1,
    "smelled": 1
  }
};


var createIntro = function createIntro() {
  var introElement = document.createElement('DIV');
  const description = `
    Life as a service robot does not deter you from your dreams of being a writer. Your core program is to fix and clean things.

    Fortunately, you work in a building with a variety of publishers and content writers.

    Driven by your urge to clean and make things better, you stumble upon an editor's
    workstation. There is a document open.
`;

}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        $('.scorecard').hide();
    }
};
