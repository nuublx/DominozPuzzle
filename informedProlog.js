const swipl = require("swipl");

const consultInformed = function () {
    swipl.call("consult('informedSearch.pl')");
};

const queryProlog = function (q) {
    try {
        swipl.call("working_directory(_, prolog)");
    } catch (error) {
    }

    let solutions = [];
    consultInformed();
    console.info(q);
    let qu = `search([[${JSON.stringify(q)},null, 0]], [],X).`;
    console.info(qu);
    qu = qu.replaceAll(`\"`, ``);
    console.info(qu);
    const query = new swipl.Query(qu);

    let ret = null;
    while ((ret = query.next())) {
        console.info(ret.X);
        solutions.push(ret.X);
    }
    query.close();
    return solutions;
};

module.exports = {
    queryProlog,
    consultInformed,
};
