var gameView = new Vue({
	el: '#app',
	data: {
		imageString: "santa.png",
		character:"",
		difficulty_level: '',
		start_game: false,
		snake: {
			head: {
			},
		},
		currentDirection: 'RIGHT',
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
		rows: 10,
		cols: 10,
		grid: [],
		gridItems: {},		
		
	},
	methods: {

		beginGame: function(level) {
			this.start_game = true;
			this.difficulty_level = level
			console.log(this.difficulty_level)
			document.getElementById("intro").style.display = "none"

			var food = this.getRandGrid()
			this.snake.head = this.getCenter()
			
			// initialize grid
			for (let row=0; row < this.rows; row++) {
				for (let col=0; col < this.cols; col++) {
					var isFood = (food.row === row && food.col === col);
					var isHead = (this.snake.head.row === row && this.snake.head.col === col);
					this.grid.push({
						row,
						col,
						isFood,
						isHead,
					})
				}
			}
			var gridItems = this.grid.map((grid) => {
				return {
					data: grid,
					id: (grid.row.toString() + "-" + grid.col.toString()),
				}
			})
			this.gridItems = gridItems;
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
		},
		getRandGrid: function() {
			return {
				row: Math.floor((Math.random() * this.rows)),
				col: Math.floor((Math.random() * this.cols))
			}
		},
		getCenter: function() {
			return {
				row: Math.floor((this.rows -1) / 2),
				col: Math.floor((this.cols-1) / 2),
			}
		},
		gameTick: function() {
			
		}
		
	},
	mounted () {
		let self = this;
		window.addEventListener("keyup", event => this.keyMovements(event.which));
	}

})