
const updatePercentage = (e) => {

    // Get Parent Row
    const parent = e.target.parentElement.parentElement;

    // Get Activity Table Body
    const tableBody = document.getElementById('activityTableBody');

    // Get Number Of Current Row
    let currentRow = parent.dataset.row;

    // Get Percentage Cell
    let row = tableBody.rows[currentRow - 1];
    let cell = row.cells[4];

    // Get Row Inputs
    let gradeOne = document.getElementById('gradeOne' + currentRow).valueAsNumber;
    let gradeTwo = document.getElementById('gradeTwo' + currentRow).valueAsNumber;

    // Validation
    if (gradeTwo >= gradeOne) {

        // Get Percentage, Rounded to 4 Decimal Places
        let percentage = ((gradeOne / gradeTwo) * 100).toFixed(4);

        // Update Percentage Cell
        cell.innerHTML = `${percentage}%`

    } else {
        cell.innerHTML = ' '
    }

}

const addActivity = () => {

    // Get Activity Table Body
    const tableBody = document.getElementById('activityTableBody');

    // Insert New Row
    let row = tableBody.insertRow(-1);
    const rowLength = tableBody.rows.length;
    row.setAttribute("id", `activityTableBodyRow${rowLength}`);
    row.setAttribute("data-row", `${rowLength}`);

    // Insert Cells
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);


    // Set Contents Of New Cells
    cell1.innerHTML = `Activity ${rowLength}`;
    cell2.innerHTML = `A${rowLength}`;
    cell3.innerHTML = `<input id="weight${rowLength}" type="number" name="weight" min="1">`;
    cell4.innerHTML = `<input id="gradeOne${rowLength}" type="number" name="gradeOne" min="1"><strong> / </strong><input id="gradeTwo${rowLength}" type="number" name="gradeTwo" min="1">`;
    cell5.innerHTML = '';

    // Update Fields
    updateFields()

}

const updateResults = (result) => {

    // Get Results Element
    const results = document.getElementById('results-body');

    // Set Results
    results.innerHTML = `${result}%`;

}

const calculateMean = () => {

    // Get Activity Table Body
    const tableBody = document.getElementById('activityTableBody');

    let totalGrade = 0;
    let errorRows = 0;

    // Loop Through All Table Rows
    Array.from(tableBody.rows).forEach(row => {

        // Get Number Of Current Row
        let currentRow = row.dataset.row;

        // Get Row Inputs
        let gradeOne = document.getElementById('gradeOne' + currentRow).valueAsNumber;
        let gradeTwo = document.getElementById('gradeTwo' + currentRow).valueAsNumber;

        // Validation
        if (gradeTwo >= gradeOne) {
            // Do Calculations
            let grade = gradeOne / gradeTwo;
            totalGrade += grade;

            // Remove Highlight if Row Previously Had Error
            row.classList.remove('error-row');
        } else {
            // Highlight Row To Show Error
            row.classList.add('error-row');
            errorRows += 1;
        }

    })

    // Validation
    if (totalGrade > 0) {
        // Update Results Text
        totalGrade = ((totalGrade / (tableBody.rows.length - errorRows)) * 100).toFixed(4);
        updateResults(totalGrade);
    }

}

const calculateWeighted = () => {

    // Get Activity Table Body
    const tableBody = document.getElementById('activityTableBody');

    let totalGrades = 0;
    let totalWeight = 0;

    // Loop Through All Table Rows
    Array.from(tableBody.rows).forEach(row => {

        // Get Number Of Current Row
        let currentRow = row.dataset.row;

        // Get Row Inputs
        let weight = document.getElementById('weight' + currentRow).valueAsNumber;
        let gradeOne = document.getElementById('gradeOne' + currentRow).valueAsNumber;
        let gradeTwo = document.getElementById('gradeTwo' + currentRow).valueAsNumber;

        // Validation
        if (gradeTwo >= gradeOne && weight >= 0) {
            // Add To Calculation Variables
            totalGrades += (gradeOne / gradeTwo) * weight;
            totalWeight += weight;

            // Remove Highlight if Row Previously Had Error
            row.classList.remove('error-row');
        } else {
            // Highlight Row To Show Error
            row.classList.add('error-row');
        }

    })

    let weightedGrade = ((totalGrades / totalWeight) * 100).toFixed(4)

    // Validation
    if (weightedGrade >= 0) {
        // Update Results Text
        updateResults(weightedGrade);
    }

}

const updateFields = () => {

    // Grade One
    let gradeOne = document.getElementsByName('gradeOne');
    gradeOne.forEach(row => {
        row.addEventListener('keyup', updatePercentage)
    })

    // Grade Two
    let gradeTwo = document.getElementsByName('gradeTwo');
    gradeTwo.forEach(row => {
        row.addEventListener('keyup', updatePercentage)
    })

}

updateFields()
