let playerText = document.getElementById('playerText') //คำสั่งสำหรับการเข้าถึง Element Id ที่ต้องการ
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box')) //getElement โดยใช้ box ออกมาเป็นการค้นหา Element และจะคืนค่าออกมาเป็น Array จะได้ box 9 box

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT //กำหนดให้ผู้เล่นเริ่มต้นเป็น x
let spaces = Array(9).fill(null) //กำหนด space เป็น array 9 ช่องให้เป็นค่าว่าง

const startGame = () => { //function 
    boxes.forEach(box => box.addEventListener('click', boxClicked)) //.forEach ใช้วน loop array 
                                                                    //.addEventListener ใช้สำหรับการกำหนด Event ให้ แก่ Element นั้นๆ 
}
function boxClicked(e) {  //รับค่า id ที่คลิก
    const id = e.target.id 

    if(!spaces[id]){ //ถ้า space เป็นค่าว่างให้ space id เท่ากับ currentPlayer
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer //e รับค่า x หรือ o โดยเช็คด้านล่าง

        if(playerHasWon() !==false){ //เช็คเงือนไขของ function playerHasWon ถ้าค่าไม่เท่ากับ false 
            playerText.innerHTML = `${currentPlayer} has won!` //ให้แสดงข้อความ currentplayer won
            let winning_blocks = playerHasWon() //กำหนดให้ winning_blocks รับค่า return ของ function playerHasWon

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT //check if currentplayer = x ให้ change to O else change to X 
    }
}

const winningCombos = [    //กำหนดค่าตัวแปร array ค่าที่จะ won กำหนดช่วง space
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() { //กำหนดเงื่อนไขของ won
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart) //คลิก ปุ่ม restart แล้วให้เรียก function restart ทำงาน 

function restart() {
    spaces.fill(null)  //clear ค่า array ใน space ให้เป็นค่าว่าง 

    boxes.forEach( box => {
        box.innerText = '' //clear ค่า ใน inner box ให้ว่างเปล่า
        box.style.backgroundColor='' //clear ค่า bg box ให้ว่างเปล่า
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT // กำหน้ดค่าเริ่มต้นให้เป็น x
}

startGame()