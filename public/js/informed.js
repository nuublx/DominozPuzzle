"use strict";

// for uninformed.ejs

function sendBoard() {
    var arr = makeArray();
    callInformedApi(arr);
}

const callInformedApi = function (arr) {
    fetch("/informed/solution", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(arr),
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        getSolutions(data);
    });
};

const getSolutions = function (data) {
    debugger;
    const boards = [];
    for (let sol of data) {
        let [solution, goal] = parseStringToArray(sol);
        boards.push(solution);
    }
    makeSolutionsBoards(boards)
};
const parseStringToArray = function (str) {
    let arr = [];
    let row = [];
    let goal = -1;
    for (let i = 2; i < str.length - 1; i++) {
        // push row in board
        if (str[i] == "]" && row) {
            arr.push(row);
            row = [];
        }
        // row
        if (str[i] != "[" && str[i] != "]" && str[i] != "," && str[i] != " ") {
            if (str[i] === "*") row.push("f");
            else row.push(str[i]);
        }
        // goal
        if (str[i] == "]" && str[i - 1] == "]") goal = Number(str.slice(i + 1));
    }
    return [arr, goal];
};

