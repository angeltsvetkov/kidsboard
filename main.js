const scoreBoard = {
    _round: 0,
    _home: parseInt(localStorage.getItem("home")),
    _away: parseInt(localStorage.getItem("away")),
    range: [0, 99],
    set home(val) {
        this._home = val;
        document.querySelector('#team1').textContent = this._home;
    },
    set away(val) {
        this._away = val;
        document.querySelector('#team2').textContent = this._away;
    },
    set round(val) {
        this._round = val;
        document.querySelector('#roundnum').textContent = this._round;
    },
    checkRangeAndUpdate(value, operator, step) {
        // destructure max and min
        const [min, max] = this.range;
        // set getter to underscore value for accessing object
        const getter = `_${value}`;
        if (operator === '+' && (this[getter] + step) - 1 < max) {
            // if operator is add and the incrementation wont exceede max increment by step
            this[value] = this[getter] + step;
        }
        if (operator === '-' && (this[getter] - step) + 1 > min) {
            // if operator is sub and the decrementation wont go below min deincrement by step
            this[value] = this[getter] - step;
        }

        localStorage.setItem(value, parseInt(this[getter]) );
        
    },
    homeplus: ['home', '+', 1],
    homeminus: ['home', '-', 1],
    awayplus: ['away', '+', 1],
    awayminus: ['away', '-', 1],
    roundplus: ['round', '+', 1],
    roundminus: ['round', '-', 1]
};

function init() {
    document.getElementById('team1').innerHTML = localStorage.getItem("home");
    document.getElementById('team2').innerHTML = localStorage.getItem("away");
    const container = document.querySelector('.scorecontainer');
    container.addEventListener('click', function (e) {
        // run function with params that match the buttons id
        scoreBoard.checkRangeAndUpdate.apply(scoreBoard, scoreBoard[e.target.id]);
    });
}

init();
