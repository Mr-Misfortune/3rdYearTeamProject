function addRow() {
    //get the container
    const ingredientsContainer = document.getElementById("ingredients-container");

    var formGroup = document.createElement('div');
    formGroup.className = 'form-group row';

    formGroup.innerHTML = `
        <label class="col-1"></label>
        <div class="col-5">
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <i class="fa fa-balance-scale"></i>
                    </div>
                </div>
                <input name="measurements" placeholder="Measurements" type="text" required="required" class="form-control">
            </div>
        </div>
        <div class="col-5">
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <i class="fa fa-list-ul"></i>
                    </div>
                </div>
                <input name="ingredients" placeholder="Ingredients" type="text" required="required" class="form-control">
            </div>
        </div>
        <div class="col-1">
            <button type="button" class="btn-delete" onclick="deleteRow(this)">-</button>
        </div>
    `;

    //add row
    ingredientsContainer.appendChild(formGroup);
}

function deleteRow(button) {
    //row you want to delete
    var row = button.closest('.form-group.row');
    
    //remove the row from the container
    row.parentNode.removeChild(row);
}