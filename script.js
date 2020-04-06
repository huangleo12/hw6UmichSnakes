var gameView = new Vue({
	el: '#app',
	data: {
		difficulty_level: '',
		start_game: false,
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