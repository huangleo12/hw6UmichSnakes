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
	
		

		},

		showWindow: function() {
			return this.start_game;
		},

		renderEl: function() {
			return "<img class='character' src='img/" + this.imageString + "'/>";
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