// from data.js
const tableData = data;

// CODE STARTS HERE!

// Generating main table setting table body - 'tbody' to a const variable by same name
const tbody = d3.select('tbody')

// Confirm the data gets to the console
console.log(tableData);

// Setting up columns for table
var columns =["datetime","city","state","country","shape","durationMinutes","comments"];

// Submitting queries
var filterTableBtn = d3.select("#filter-btn");
var fullTableBtn = d3.select("#full-btn");

// For the Additional Search Domain Button
var filter_addtn_btn = d3.select("#filter-add-btn");
var add_criteria_btn = d3.select("#add-condition-btn");
var full_addtn_btn = d3.select("#full-add-btn");
var refresh_btn = d3.select("#refresh-btn");

// populating table row with entries
var rows = tbody.selectAll('tr')
              .data(tableData)
              .enter()
              .append('tr');
        
// Filling each cell per row per column
var cells = rows.selectAll('td')
              .data(function (row) {
                return columns.map(function (column) {
                  return {column: column, value: row[column]};
                });
              })
              .enter()
              .append('td')
              .text(function (param) { return param.value; });

// Setting up refresh function
function refreshForm(){
    d3.select("#add-condition-btn").selectAll("li").remove();
    d3.select("#filter_value").property("value"," ");
    filterCond = [];
    filterInput = [];
    clickItem = false;
}

// update the table
function updateTable(data){
 // Update the table
    tbody.selectAll('tr').remove();
    var rows = tbody.selectAll('tr')
             .data(data)
             .enter()
             .append('tr');
       
 // create a cell in each row for each column
    var cells = rows.selectAll('td')
             .data(function (row) {
               return columns.map(function (column) {
                 return {column: column, value: row[column]};
               });
             })
             .enter()
             .append('td')
             .text(function (param) { return param.value; }); 
}

// Select the Full Table Button and update table
fullTableBtn.on("click", function() {
    updateTable(tableData);
});  

// Filter table button on clicking 'Filter Table'
filterTableBtn.on("click", function() {

  // Prevent page from refreshing
  d3.event.preventDefault();

  // Select input element and get the id information
  var inputElement = d3.select("#datetime");

  // obtain value property of input element
  var inputValue = inputElement.property("value");
  
  //logging inputValue to console
  console.log(inputValue);

  // Filtering date 
  var filteredData = tableData.filter(record => record.datetime === inputValue);

  updateTable(filteredData);
});

// Additional Search Form, creating results list
var clickItem = false;
var filterCond = [];
var filterInput = [];

// Calling click function on additional criteria
add_criteria_btn.on("click", function() {
    clickItem = true;
// Prevent page from refreshing
    d3.event.preventDefault();

// Select input element and obtain HTML node
    var inputElement = d3.select("#filter_value");

// Get the value property of the input element
    var inputValue = inputElement.property("value");

// Dropdown for individualcriteria selection
    var conditionInputElement = d3.select("#query_item");
    var conditionInputValue = conditionInputElement.property("value");
    
    d3.select("#add-condition-btn")
    .append("li").text(conditionInputValue+": "+ inputValue);
    filterCond.push(conditionInputValue);
    filterInput.push(inputValue);
    // Logging respective selections to console
    console.log(filterCond);
    console.log(filterInput);
    console.log(clickItem);
});
// Calling click function on button
full_addtn_btn.on("click", function() {
// Updating table
  updateTable(tableData);  
});

// refreshing form
refresh_btn.on("click", function() {
    refreshForm();
    updateTable(tableData);  
});

// Calling click function on button
filter_addtn_btn.on("click", function(){
    var addtn_filter_data = [];

// filter by single criteria, alternatively click the search
    console.log(clickItem);
    d3.event.preventDefault();

        // Select input element and obtain HTML node
            var inputElement = d3.select("#filter_value");
        
        // Obtain value property of input element
            var inputValue = inputElement.property("value");
        
        // Obtain dropdown value
            var conditionInputElement = d3.select("#query_item");
            var conditionInputValue = conditionInputElement.property("value");
            
            // using d3 for filter options and table filter
            d3.select("#add-condition-btn")
            .append("li").text(conditionInputValue+": "+ inputValue);
            filterCond.push(conditionInputValue);
            filterInput.push(inputValue);

    // Criterias Search logged to console:
    console.log(filterCond);
    console.log(filterInput);

    // building filter object
        var filter_array = {};
        filterCond.forEach((key, i) => filter_array[key] = filterInput[i]);
        //log to console
        console.log(filter_array);

    // filter the table using conditional function
        addtn_filter_data= tableData.filter(function(item) {
            for (var key in filter_array) {
                if (item[key] === undefined || item[key] != filter_array[key])
                    return false;
                }
            return true;
            });
   // logging output to console
   console.log("addtn_filter_data",addtn_filter_data);

   // Update table and/or refresh
   updateTable(addtn_filter_data);
   refreshForm();
});