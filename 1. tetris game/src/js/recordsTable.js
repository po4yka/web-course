generate_table();

function generate_table() {
    const recordTable = document.getElementsByClassName("zigzag_record_table")[0];
    const recordTableContent = document.createElement("tbody");

    let records = JSON.parse(localStorage["tetris.records"]);
    let row;
    let cell;
    let cellText;

    for (let i = 0; i < records.length; i += 1) {
        if (records[i].name !== 'empty') {
            row = document.createElement("tr");
            for (let j = 0; j < 2; j += 1) {
                cell = document.createElement("td");
                if (j === 0) {
                    cellText = document.createTextNode(records[i].name);
                } else {
                    cellText = document.createTextNode(records[i].score);
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            recordTableContent.appendChild(row);
        }
    }

    recordTable.appendChild(recordTableContent);

    let replayButton = document.getElementById("r_btn_1");
    let loginButton = document.getElementById("r_btn_2");
    replayButton.onclick = () => {
        window.location.href = "/game.html";
    }
    loginButton.onclick = () => {
        window.location.href = "/login.html";
    }
}
