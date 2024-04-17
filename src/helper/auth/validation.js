// Validate username function
function validateUsernames(username) {
    // Length constraints (example: between 3 and 20 characters)
    const minLength = 3;
    const maxLength = 20;

    // Allowed characters (alphanumeric characters, underscores, dashes)
    const allowedCharacters = /^[a-zA-Z0-9_-]+$/;

    // Check length
    if (username.length < minLength || username.length > maxLength) {
        return false; // Username length is invalid
    }

    // Check character set
    if (!allowedCharacters.test(username)) {
        return false; // Username contains disallowed characters
    }

    return true;
}

function validateFullName(value) {
    let error;
    if (value === "admin") {
      error = "Nice try!";
    }
    return error;
  }
  
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }
  
  function validateUsername(value) {
    let error;
    if (value === "admin") {
      error = "Nice try!";
    }
    return error;
  }
  
  function validatePassword(value) {
    let error;
    if (value === "admin") {
      error = "Nice try!";
    }
    return error;
  }
  
  function validateConfirmPassword(value) {
    let error;
    if (value === "admin") {
      error = "Nice try!";
    }
    return error;
  }

export {
    validateUsername,
    validateFullName,
    validateEmail,
    validatePassword,
    validateConfirmPassword
}