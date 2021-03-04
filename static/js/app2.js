// from data.js
const tableData = data;

const tbody = d3.select('tbody')

// YOUR CODE HERE!
// Confirm the data gets to the console
console.log(data);

function buildTable(data){
    tbody.html('');
    data.forEach( (dataRow) => {
        const row = tbody.append('tr');
        Object.values(dataRow).forEach((value) => {
            let val = row.append('td');
            val.text(value);
        
        })
    })
}


function click(){
    const date = d3.select('#datetime').property('value');
    let filter = tableData;
    if (date){
        filter = filter.filter(i => i.datetime === date);

    }
    buildTable(filter);
}


d3.selectAll("#filter-btn").on('click', click);

buildTable(tableData)