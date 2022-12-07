const homeScoreElem = document.getElementById("home--score")
const awayScoreElem = document.getElementById("away--score")
const periodElem = document.getElementById("period--number")
const scoreButtons = document.querySelectorAll(".score-btn")
const resetBtn = document.getElementById("reset-btn")

class Team {
    constructor(score) {
        this.score = score
    }
 }

const home = new Team(0,0)
const away = new Team(0,0)
let period = 1

const updateElems = () => {
    homeScoreElem.innerText = home.score
    awayScoreElem.innerText = away.score
    periodElem.innerHTML = period
    highlightLeader()
}

const resetScore = () => {
    home.score = 0
    away.score = 0
    period = 1
    updateElems()
}

updateElems()


for (const button of [...scoreButtons]) {
    button.addEventListener("click", () => {
        const buttonArray = button.name.split("-")
        const name = buttonArray[0]
        const point = parseInt(buttonArray[1])
        if (name === "home") {
            home.score += point
        } else if (name === "away") {
            away.score += point
        }
        updateElems()
        })
}

resetBtn.addEventListener("click", resetScore)

function highlightLeader() {
    const result = checkScores()
    if (!result) {return}
    document.getElementById(`${result[0]}--title`).style.setProperty("border-color", "red")
    document.getElementById(`${result[1]}--title`).style.setProperty("border-color", "darkred")
}

function checkScores() {
    return home.score > away.score 
    ? ["home", "away"]
    : away.score > home.score && ["away", "home"]
}