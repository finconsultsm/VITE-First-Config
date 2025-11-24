const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");

let formData = {
    email: "",
    message: "",
}

const savedData = localStorage.getItem(STORAGE_KEY);

if (savedData) {
    try {
        const parsedData = JSON.parse(savedData);

        formData.email = parsedData.email || "";
        formData.message = parsedData.message || "";

        form.elements.email.value = formData.email;
        form.elements.message.value = formData.message;
    } catch (error) {
        console.log("Invalid data in localStorage, clearing:", error);
        localStorage.removeItem(STORAGE_KEY);
    }
}

form.addEventListener("input", handleInput);

function handleInput(event) {
    const field = event.target.name;
    if (!(field in formData)) return;
    const value = event.target.value.trim();

    formData[field] = value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email || !formData.message) {
        alert('Заповніть дві форми');
        return;
    }

    console.log(formData);
    
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formData = {
        email: "",
        message: "",
    }
}
