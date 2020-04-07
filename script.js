var gameView = new Vue({
	el: '#app',
	data: {
		imageString: "santa.png",
		character:"",
		difficulty_level: '',
		start_game: false,
		interval1: '',
		food: {},
		snake: {
			head: {
			},
		},
		currentDirection: 'right',
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

			this.food = this.getRandGrid()
			this.snake.head = this.getCenter()
			this.loadGrid()
			
		},
		loadGrid: function() {
			// initialize grid
			this.grid = [];
			for (let row=0; row < this.rows; row++) {
				for (let col=0; col < this.cols; col++) {
					var isFood = (this.food.row === row && this.food.col === col);
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
					case 'RIGHT':
						this.currentDirection = 'right'
						break;
					case 'LEFT':
						this.currentDirection = 'left'
						break;
					case 'UP':
						this.currentDirection = 'up'
						break;
					case 'DOWN':
						this.currentDirection = 'down'
						break;
					default:
						this.currentDirection = 'right'
						return 0
				}
			}
			console.log('currentDirection')
			console.log(this.currentDirection)
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
		moveSnake: function() {
			console.log("in move snake")
			console.log(this.snake)
			switch(this.currentDirection) {
				case 'left':
					this.snake.head.col--;
					break;
				case 'right':
					this.snake.head.col++;
					break;
				case 'down':
					this.snake.head.row++;
					break;
				case 'up':
					this.snake.head.row--;
					break;
				default:
					this.snake.head.col++;
					break;
			}
		},
		gameTick: function () {
			this.interval1 = setInterval(function() {
				this.moveSnake();
				this.loadGrid();
				console.log(this.currentDirection)
			}.bind(this), 300);
		}
		
	},
	mounted () {
		let self = this;
		window.addEventListener("keyup", event => this.keyMovements(event.which));
		this.gameTick()
	}

})