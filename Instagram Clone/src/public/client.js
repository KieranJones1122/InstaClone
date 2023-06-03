const loginContainer = document.querySelector(".login-form")
const signUpContainer = document.querySelector(".signup-form")

if (loginContainer) {
    // Select redirect buttons
    const redirectSignUpBtn = document.getElementById("redirect-signup")
    const redirectLoginBtn = document.getElementById("redirect-login")

    // helper show functions
    function showSignUp() {
        loginContainer.classList.remove("active");
        signUpContainer.classList.add("active");
    }

    function showLogin() {
        signUpContainer.classList.remove("active");
        loginContainer.classList.add("active");
    }

    // Add event listener to buttons
    redirectSignUpBtn.addEventListener("click", (e) => showSignUp())
    redirectLoginBtn.addEventListener("click", (e) => showLogin())

    // Validating forms
    const loginForm = document.getElementById("login__form");
    const signUpForm = document.getElementById("signup__form");

    // Error handling Message
    const loginError = document.querySelector(".login-error-message");
    const signUpError = document.querySelector(".signup-error-message");

    // Validation forms helper functions

    function composeErrorMessage(msg, node) {
        let message = document.createElement("p");
        message.textContent = msg;
        node.appendChild(message);
    }

    function displayErrorMessage(node) {
        node.classList.add("show");
    }

    function passwordMatches(password, confirm) {
        return password === confirm;
    }

    function validateLogin(data, node) {
        let username = data.username && data.username.trim() !== "";
        let password = data.password && data.password.trim().length > 6;

        let msg = ""
        if (!username) {
            msg = "Invalid Username"; 
            composeErrorMessage(msg, node);
        }

        if (!password) {
            msg = "Invalid Password";
            composeErrorMessage(msg, node);
        }

        if(msg !== "") {
            displayErrorMessage(node.closest("div"));
        }

        return username && password;
    }

    function validateSignUp(data, node) {
        let username = data.username.trim() !== ""
        let email = data.email && data.email.match(/^[\w\.]+@([\w-]+\.)+[\w-]/i)
        let password = data.password && data.password.trim().length > 6

        let msg = ""
        if (!username) {
            msg = "Invalid Username"
            composeErrorMessage(msg, node)
        }
        if (!email) {
            msg = "Invalid Email"
            composeErrorMessage(msg, node)
        }
        if (!password) {
            msg = "Invalid Password"
            composeErrorMessage(msg, node)
        }
        if (!passwordMatches(data.password, data.confirmPassword)) {
            msg = "Passwords don't match"
            composeErrorMessage(msg, node)
        }

        if (msg !== "") {
            displayErrorMessage(node.closest("div"))
            return false
        }
        return true
    }

    const closeErrorMsgBtns = document.querySelectorAll(".close-error-message")

    closeErrorMsgBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.target.closest("div").classList.remove("show");
        })
    } )

    loginForm.addEventListener("submit", (e) => {
        //Deploy the logic login --> API call & validation
        e.preventDefault()
        let loginFormData = new FormData(loginForm);
        let username = loginFormData.get("username");
        let password = loginFormData.get("password");

        let errorMessageNode = loginError.querySelector(".message");
        errorMessageNode.innerHTML = "";

        if (validateLogin ({username, password}, errorMessageNode)) {
            // make the request
            console.log("Logged in")
        }
        return;
    });

    signUpForm.addEventListener("submit", (e) => {
        //Deploy the sign login --> API call & validation
        e.preventDefault()
        let signUpFormData = new FormData(signUpForm);
        let username = signUpFormData.get("username");
        let email = signUpFormData.get("email");
        let password = signUpFormData.get("password");
        let confirmPassword = signUpFormData.get("confirm-password");

        let errorMessageNode = signUpError.querySelector(".message");
        errorMessageNode.innerHTML = "";

        if (validateSignUp ({username, email, password, confirmPassword}, errorMessageNode)) {
          // API call to sign up user
          console.log("Signed up");  
        }
        return;
    });
}