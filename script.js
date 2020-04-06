var gameView = new Vue({
	el: '#app',
	data: {
		imageString: "santa.png",
		character:"",
		difficulty_level: '',
		start_game: false,
		snake: [],
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
		keyMap:{
			"37": "LEFT",
			"38": "UP",
			"39": "RIGHT",
			"40": "DOWN",

		},
			
		
	},
	methods: {



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
		
		//NEED TO WORK ON BASIC MOVEMENTS
		keyMovements: function(key) {
			if(this.start_game){
				let dir = this.keyMap[key];
				console.log(dir);
				switch(dir) {
				case 'right':

				case 'left':
				case 'up':
				case 'down':
				default:
					return 0
				}
			}
			
			
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

		
	},
	mounted () {
		let self = this;
		window.addEventListener("keyup", event => this.keyMovements(event.which));
		

	}

})