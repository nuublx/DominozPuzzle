"use strict";
// for uninformed.ejs

function sendBoard() {
    var arr = makeArray();
    callUninformedApi(arr);
}

const callUninformedApi = function (arr) {
    fetch("/uninformed/solution", {
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
        getBoards(data);
    });
};

const getBoards = function (data) {
    const boards = [];
    for (let solution of data) {
        boards.push(parseStringToArray(solution));
    }
    makeSolutionsBoards(boards)

};
const parseStringToArray = function (str) {
    let arr = [];
    let row = [];
    for (let i = 2; i < str.length - 1; i++) {
        if (str[i] == "]" && row) {
            arr.push(row);
            row = [];
        }
        if (str[i] != "[" && str[i] != "]" && str[i] != "," && str[i] != " ") {
            if (str[i] === "*") row.push("f");
            else row.push(str[i]);
        }
    }
    return arr;
};


