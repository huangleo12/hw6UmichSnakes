var gameView = new Vue({
	el: '#app',
	data: {
		imageString: "img/santa.png",
		character:"",
		difficulty_level: "",
		start_game: false,
		game_over: false,
		interval1: '',
		powerup_interval: '',
		food: {},
		M_tile: {},
		// default tick speed - easy
		easy_def_tick: 500,
		//med
		med_def_tick: 300,
		//hard
		hard_def_tick: 180,
		num_tick: 300,
		snake: {
			head: {},
			tail:[],
		},
		currentDirection: 'right',
		powerups: {
			curr: 0,
			currentLoc: {},
			ricks: {
				displayDesc: false,
			},
			blankslate: {
				displayDesc: false,
			},
			zingermans: {
				invincible: false,
				displayDesc: false,
			},
			football: {
				displayDesc: false,
				music: '',
			},
			construction: {
				num_holes: 0,
				displayDesc: false,
				potholes: [
					{col:-1, row:-1},
					{col:-1, row:-1},
					{col:-1, row:-1},
					{col:-1, row:-1},
					{col:-1, row:-1},
				],
				isPothole: [false, false, false, false, false],
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
		changeChar: function(character) {
			this.imageString = "img/" + character + ".png";
			console.log(this.imageString);
		},
		beginGame: function(level) {
			this.start_game = true;
			this.difficulty_level = level;
			console.log(this.difficulty_level)
			document.getElementById("intro").style.display = "none"

			this.food = this.getRandGrid()
			this.M_tile = this.getRandGrid()

			var temp_powerup = this.getRandPowerUp();
			this.powerups.curr = temp_powerup.temp_idx;
			this.powerups.currentLoc = temp_powerup.temp_loc

			this.powerups.construction.num_holes = Math.floor((Math.random() * 4)) + 1;
			// this.powerups.construction.num_holes = 1;
			for (let i = 0; i < this.powerups.construction.num_holes; ++i) {
				this.powerups.construction.potholes[i] = this.getRandGrid();
				// console.log("HELLLLOOOOOOOOOO");
				// console.log(this.powerups.construction);
			}

			//football powerup
			this.powerups.football.music = document.getElementById("music");

			// make sure food doesn't spawn on M tile
			while (this.food.row === this.M_tile.row && this.food.col === this.M_tile.col) {
				this.food = this.getRandGrid();
			};
			this.powerUpTick();

			this.snake.head = this.getCenter()
			this.snake.tail = []
			this.loadGrid()
		},
		loadGrid: function() {
			// initialize grid
			this.grid = [];
			for (let row=0; row < this.rows; row++) {
				for (let col=0; col < this.cols; col++) {
					var isFood = (this.food.row === row && this.food.col === col);
					var isM = (this.M_tile.row === row && this.M_tile.col === col);
					var isHead = (this.snake.head.row === row && this.snake.head.col === col);
					var isPowerUp = (this.powerups.currentLoc.row === row && this.powerups.currentLoc.col === col);
					
					var isPothole0 = (this.powerups.construction.potholes[0].row === row && this.powerups.construction.potholes[0].col === col && this.powerups.construction.isPothole[0]);
					var isPothole1 = (this.powerups.construction.potholes[1].row === row && this.powerups.construction.potholes[1].col === col && this.powerups.construction.isPothole[1]);
					var isPothole2 = (this.powerups.construction.potholes[2].row === row && this.powerups.construction.potholes[2].col === col && this.powerups.construction.isPothole[2]);
					var isPothole3 = (this.powerups.construction.potholes[3].row === row && this.powerups.construction.potholes[3].col === col && this.powerups.construction.isPothole[3]);
					var isPothole4 = (this.powerups.construction.potholes[4].row === row && this.powerups.construction.potholes[4].col === col && this.powerups.construction.isPothole[4]);

					let isTail = false;
					this.snake.tail.forEach(t => {
					  if (t.row === row && t.col === col) {
						isTail = true;
					  }
					})
					//game over
					if ((isHead && isM) || (isHead && isPothole0) || (isHead && isPothole1)
					|| (isHead && isPothole2) || (isHead && isPothole3) ) {
						isM = false;
						this.game_over = true;
						alert('You died');
						this.beginGame();
					}

					// grow snake
					if (isHead && isFood) {
						isFood = false;
						//this.food = this.getRandGrid();
						//need to grow snake

						// this.snake.tail.unshift({
						// 	row: this.snake.head.row,
						// 	col: this.snake.head.col,
						// })
				
						// // Snake does potty, only when not eating
						// if (this.snake.head.row === this.food.row && this.snake.head.col === this.food.col) {
						// 	this.food = this.getRandGrid();
						// } else {
						// 	this.snake.tail.pop();
						// }
					}
					
					if (isHead && isPowerUp) {
						isPowerUp = false;
						this.powerups.currentLoc = {};
						switch(this.powerups.curr) {
							case 1: //ricks = slow down + input delay
								this.num_tick = this.num_tick * 1.3;
								this.gameTick();
								this.powerUpTick();
								this.powerupTimeout();
								break;
							case 2: //blankslate = speed up + 1.5* points
								this.num_tick = this.num_tick * .65;
								this.gameTick();
								this.powerupTimeout();
								this.points_increment = this.points_increment * 1.5;
								break;
							case 3: //zingermans = invincibility + speed up
								this.powerups.zingermans.invincible = true;
								this.num_tick = this.num_tick * .65;
								this.gameTick();
								this.powerupTimeout();
								break;
							case 4: //football -> 2 cases...
								this.num_tick = this.num_tick * .8;
								this.powerups.football.music.play();
								this.gameTick();
								this.powerupTimeout();
								break;
							case 5: //construction = slow down + pothole spawns
								this.powerups.construction.isPothole[0] = true;
								this.powerups.construction.isPothole[1] = true;
								this.powerups.construction.isPothole[2] = true;
								this.powerups.construction.isPothole[3] = true;
								this.powerups.construction.isPothole[4] = true;
								this.num_tick = this.num_tick * 1.3;
								this.gameTick();
								this.powerupTimeout();
								break;
						}
					}

					this.grid.push({
						row,
						col,
						isFood,
						isHead,
						isM,
						isPowerUp,
						isTail,
						isPothole0,
						isPothole1,
						isPothole2,
						isPothole3,
						isPothole4,
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
			//console.log("in move snake")
			//console.log(this.snake)
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
		getRandPowerUp: function() {
			return {
				temp_idx: Math.floor((Math.random() * 6)),
				// temp_idx: 5,
				temp_loc: this.getRandGrid(),
			}
		},
		powerUpTick: function () {
			clearInterval(this.powerup_interval);
			this.powerup_interval = setInterval(function() {
				var temp_powerup = this.getRandPowerUp();
				this.powerups.curr = temp_powerup.temp_idx;
				this.powerups.currentLoc = temp_powerup.temp_loc;
			}.bind(this), this.num_tick * 30);
		},
		powerupTimeout: function() {
			setTimeout(function() {
				if (this.difficulty_level === "easy") {
					this.num_tick = this.easy_def_tick;
				}
				else if (this.difficulty_level === "medium") {
					this.num_tick = this.med_def_tick;
				}
				else if (this.difficulty_level === "hard") {
					this.num_tick = this.hard_def_tick;
				}
				
				this.powerups.construction.isPothole[0] = false;
				this.powerups.construction.isPothole[1] = false;
				this.powerups.construction.isPothole[2] = false;
				this.powerups.construction.isPothole[3] = false;
				this.powerups.construction.isPothole[4] = false;

				this.powerups.zingermans.invincible = false;
				
				// this.num_tick = 300;
				this.gameTick();

			}.bind(this), this.num_tick * 20);
		},
		caughtFood:function(){
			// BECAUSE OF THIS, THIS ALWAYS START W A HEAD AND TAIL
			this.snake.tail.unshift({
				row: this.snake.head.row,
				col: this.snake.head.col,
			})
	
			
			if (this.snake.head.row === this.food.row && this.snake.head.col === this.food.col) {
				this.food = this.getRandGrid();
			} else {
				this.snake.tail.pop();
			}

			// SNAKE MOVEMENT NEEDED TO MOVE THE HEAD
			this.moveSnake();
			  
			  let die = false;
			  if (this.snake.head.row < 0 ||
				this.snake.head.row >= this.rows ||
				this.snake.head.col < 0 ||
				this.snake.head.col >= this.rows
			  ) {
				alert('You died');
				this.beginGame();
			
			  }
		},
		
		gameTick: function () {
			clearInterval(this.interval1);
			this.interval1 = setInterval(function() {
				
				this.caughtFood();
				this.loadGrid();
				
				//console.log(this.currentDirection)
			}.bind(this), this.num_tick);
		},
	},
	mounted () {
		let self = this;
		window.addEventListener("keyup", event => this.keyMovements(event.which));
		this.gameTick()
	}

})