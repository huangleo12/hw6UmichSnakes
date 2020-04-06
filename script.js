$(document).ready( function() {
	$(".btn btn-lg").click(function() {
		console.log(createCharater("santa.png"));
		$("#gameWindow").append(createCharater("santa.png"));
	});

});

function createCharater(imageString){
	return "<div class='character'><img src='img/" + imageString + "'/></div>";
}



var gameView = new Vue({
	el: '#app',
	data: {
		imageString: "santa.png",
		character:"",
		difficulty_level: '',
		start_game: false,
		powerups: {
			ricks: {
				displayDesc: false,
			},
			blankslate: {
				displayDesc: false,
			},
			zingermans: {
				displayDesc: false,
			},
			football: {
				displayDesc: false,
			},
			construction: {
				displayDesc: false,
			},
		},
	},
	methods: {

		spawnCharacter: function (imageString){
			this.character=  "<div class='character'><img src='img/" + this.imageString + "'/></div> ";

		},

		beginGame: function(level) {
			this.start_game = true;
			this.difficulty_level = level
			console.log(this.difficulty_level)
			document.getElementById("intro").style.display = "none"
			document.getElementById("b1").style.display = "none"
			document.getElementById("b2").style.display = "none"
			document.getElementById("b3").style.display = "none"
			this.spawnCharacter(this.imageString);
			console.log(this.character);
			// $('#gameWindow').append(this.character);
		

		},

		showWindow: function() {
			return this.start_game;
		},
		openSettings: function() {
			document.getElementById("settingsPage").style.width = "100%";
		},
		closeSettings: function() {
			document.getElementById("settingsPage").style.width = "0%";
		},
		openRules: function() {
			document.getElementById("rulesPage").style.width = "100%";
		},
		closeRules: function() {
			document.getElementById("rulesPage").style.width = "0%";
		}
	}
})