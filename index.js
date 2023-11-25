const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => 
{
    navbarMenu.classList.toggle('is-active');
});

document.addEventListener("DOMContentLoaded", function () {
    const addItemButton = document.querySelector(".add-item-button");
    const addItemFormContainer = document.getElementById("addItemFormContainer");


    function createAddItemForm() {
        
        addItemFormContainer.innerHTML = "";

      
        const form = document.createElement("form");
        form.classList.add("box"); // Add Bulma's box class for styling

      
        const uploadImageInput = createInputElement("file", "Upload Image", "uploadImage");
        const userIdInput = createInputElement("textarea", "User ID", "userId");
        const descriptionInput = createInputElement("textarea", "Description", "description");
        const keywordsInput = createInputElement("textarea", "Keywords", "keywords");
        const latitudeInput = createInputElement("textarea", "Latitude", "latitude");
        const longitudeInput = createInputElement("textarea", "Longitude", "longitude");


        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.classList.add("button", "is-white"); 
        submitButton.innerText = "Submit";


        form.appendChild(uploadImageInput);
        form.appendChild(userIdInput);
        form.appendChild(descriptionInput);
        form.appendChild(keywordsInput);
        form.appendChild(latitudeInput);
        form.appendChild(longitudeInput);
        form.appendChild(submitButton);


        addItemFormContainer.appendChild(form);

        document.addEventListener("click", handleDocumentClick);
    }

    function createInputElement(type, label, name) {
        const fieldDiv = document.createElement("div");
        fieldDiv.classList.add("field");

        const labelElement = document.createElement("label");
        labelElement.classList.add("label");
        labelElement.innerText = label;

        const controlDiv = document.createElement("div");
        controlDiv.classList.add("control");

        const inputElement = document.createElement(type);
        inputElement.type = type;
        inputElement.name = name;
        inputElement.classList.add("input"); 

        controlDiv.appendChild(inputElement);
        fieldDiv.appendChild(labelElement);
        fieldDiv.appendChild(controlDiv);

        return fieldDiv;
    }

    function handleDocumentClick(event) {
        if (!addItemFormContainer.contains(event.target) && !addItemButton.contains(event.target)) {

            addItemFormContainer.innerHTML = "";
            document.removeEventListener("click", handleDocumentClick);
        }
    }
    addItemButton.addEventListener("click", createAddItemForm);
});