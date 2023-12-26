function checkSignup() {
    let inputUsername = document.getElementById("inputUsername").value;
    let inputEmail = document.getElementById("inputEmail").value;
    let inputPassword = document.getElementById("inputPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let errorMessage = document.getElementById("errorMessage");
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let validPassword = passwordPattern.test(inputPassword);

    if (!inputUsername || !inputEmail || !inputPassword) {
        errorMessage.innerText = "Enter valid details";
        return false;
    } else if (!validPassword) {
        errorMessage.innerText = "Enter valid password";
        return false;
    } else if (inputPassword !== confirmPassword) {
        errorMessage.innerText = "Enter password correctly";
        return false;
    } else {
        errorMessage.innerText = "";
        return true;
    }
}
