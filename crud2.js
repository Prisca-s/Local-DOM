var selectedRow = null

const onFormSubmit=()=> {
    console.log('submit button')
    // if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    // }
}

function readFormData() {
    console.log('read form data')
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value;
    formData["Mobilenumber"] = document.getElementById("Mobilenumber").value;
    formData["emloyeeid"] = document.getElementById("emloyee").value;
    formData["joindate"] = document.getElementById("date").value;
    formData["gender"] = document.querySelector("ïnput[name=]'gender']").value;
    console.log(formData)
    return formData;
}

function insertNewRecord(data) {
    console.log(data,'insertnewrecord method')
  
     let dataStorage = []
    let getStorageInfo = localStorage.getItem('nextbewe');
   
    if(getStorageInfo == null){
        dataStorage.push(data)
        localStorage.setItem('nextbewe',JSON.stringify(dataStorage))
    }else{
        getStorageInfo = JSON.parse(getStorageInfo)
        getStorageInfo.push(data)
        localStorage.setItem('nextbewe',JSON.stringify(getStorageInfo))
        // console.log(getStorageInfo)
    }

    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.Name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empCode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("Name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mobile number").value = "";
    document.getElementById("employee").value = "";
    document.getElementById("date").value = "";
    document.querySelector("ïnput[name=]'gender']").value = "";
    selectedRow = null;
}

function onEdit(td) {
    // console.log(td.parentElement.parentElement)
    // console.log(td.parentElement.parentElement.parentElement.parentElement.parentElement)
    selectedRow = td.parentElement.parentElement;
    // console.log(selectedRow)
    document.getElementById("Name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("mobilenumber").value = selectedRow.cells[2].innerHTML;
    document.getElementById("employee").value = selectedRow.cells[3].innerHTML;
    document.getElementById("date").value = selectedRow.cells[4].innerHTML;
    document.querySelector("ïnput[name=]'gender']").value = selectedRow.cells[5].innerHTML;
}
function updateRecord(formData) {
    console.log(selectedRow,formData)
    selectedRow.cells[0].innerHTML = formData.Name;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.Mobilenumber;
    selectedRow.cells[3].innerHTML = formData.employee;
    selectedRow.cells[3].innerHTML = formData.date;
    selectedRow.cells[3].innerHTML = formData.gender;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        console.log(row.rowIndex)
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("Name").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}
