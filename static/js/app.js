// from data.js
const tableData = data;


// YOUR CODE HERE!

// Setting the 'tbody' -i.e. table body to a const variable by same name
const tbody = d3.select('tbody')

// Confirm the data gets to the console
console.log(data);

// Building the table from the data list dictionary for each data row and append
// in the table, calling on the table row 'tr' and table data 'td' tags 
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

// Filters section for 'date', 'city', 'state', 'country', 'shape' and 'duration' entered 
// by user
var filters = {};
function addFilters(){
    var changedInput = d3.select(this).select("input");
    var filterValue = changedInput.property("value");
    var filterId = changedInput.attr("id");

    if (filterValue){
        filters[filterId] = filterValue;

    }
    else{
        delete filters[filterId]
    }
    click();
}

// Setting up a function for filtering table for filters dictionary
function click(){
    let filter = tableData;
    Object.entries(filters).forEach(([k,v]) => {
        filter = filter.filter(i => i[k] === v);
    })
    buildTable(filter);
}


d3.selectAll(".filter").on("change", addFilters);

// buildTable(tableData)
// Logging filters output to console
console.log(filters)

//For filtering table by date entries
function click1(){
    const date = d3.select('#datetime').property('value');
    let filter = tableData;
    if (date){
        filter = filter.filter(i => i.datetime === date);

    }
    buildTable(filter);
}


d3.selectAll("#submit-btn").on('click', click1);

// Building table data on webpage rendered via index.html
buildTable(tableData)