// images for current puzzle
var pieces = [
    '<img src="../../assets/images/tiger/images/img1.png" alt="" data-piece="0" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img2.png" alt="" data-piece="1" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img3.png" alt="" data-piece="2" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img4.png" alt="" data-piece="3" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img5.png" alt="" data-piece="4" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img6.png" alt="" data-piece="5" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img7.png" alt="" data-piece="6" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img8.png" alt="" data-piece="7" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img9.png" alt="" data-piece="8" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img10.png" alt="" data-piece="9" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img11.png" alt="" data-piece="10" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img12.png" alt="" data-piece="11" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img13.png" alt="" data-piece="12" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img14.png" alt="" data-piece="13" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img15.png" alt="" data-piece="14" class="puzzle-piece" />',
    '<img src="../../assets/images/tiger/images/img16.png" alt="" data-piece="15" class="puzzle-piece" />'
];

// Function to shuffle array (of pieces)
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// Function to place piece in to Div
function placePiece(item, index) {
    document.getElementById("pieces-area").innerHTML += '<div class="col-3 puzzle-space">' + item + '</div>';
}

// Shuffle the pieces
shuffle(pieces);

// Place the pieces
pieces.forEach(placePiece);

// Puzzle status - trueif piece is in the correct place, otherwise false.
var puzzleStatus = Array(pieces.length).fill(false);

// Wait for website to load then run main jQuery functions
$(document).ready(() => {
    // Make pieces draggable
    $(".puzzle-piece").draggable({
        //snap to grid
        snap: ".puzzle-space-holder",
        snapMode: "inner",
        // When a piece starts to move , mark it as in the wrong place
        start: function (event, ui) {
            puzzleStatus[$(this).data("piece")] = false;
        }
    });

    // Make board droppable
    $(".puzzle-drop-place").droppable({
        // When piece is in a grid square
        drop: function (event, ui) {
            // Check this square is ok to drop in
            if ($(this).data("piece") == ui.draggable.data("piece")) {
                puzzleStatus[$(this).data("piece")] = true;
            } else {
                puzzleStatus[$(this).data("piece")] = false;
            }

            // If all pieces correct then puzzle is complete
            if (puzzleStatus.every(function (value) { return value; })) {
                puzzleComplete();
            }
        }
    });

    // test the finished puzzle
    //pieces.forEach(placePiece);
    // $("#puzzle-complete").show();

});

$('#instructions').click(function () {
    $('.bg').css('background-size', '0%');
    $('#instructions-area').show();
    $('#board').css('display', 'flex');
    $('#pieces-area').css('display', 'none');
});

$('#start').click(function () {
    $('.bg').css('background-size', '0%');
    $('#instructions-area').hide();
    $('#pieces-area').css('display', 'flex');
    $('#board').css('display', 'flex');
});

$('#puzzle-choice').click(function () {
    $("#pieces-area").hide();
    $("#board").slideUp();
    $("#puzzle-complete").show().delay(1500).fadeOut();
    $('#instructions-area').hide();
    $('#puzzle-complete-message').show();
    $("#family-pic").delay(1800).fadeIn(2000);
});

// Call this function when puzzle correctly completed
function puzzleComplete() {
    $("#pieces-area").hide();
    $("#board").slideUp();
    $("#puzzle-complete").show().delay(1500).fadeOut();
    $('#instructions-area').hide();
    $('#puzzle-complete-message').show();
    $("#family-pic").delay(1800).fadeIn(2000);
}
