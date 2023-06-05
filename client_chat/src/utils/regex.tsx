export function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

export function validatePassword(password: string) {
    const requirements = {
      length: 8,
      lowercase: 1,
      uppercase: 1,
      number: 1,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/,
      maxSpecialChars: 2
    };
  
    let specialCharCount = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password[i];
      if (char.match(/[a-z]/)) {
        requirements.lowercase--;
      } else if (char.match(/[A-Z]/)) {
        requirements.uppercase--;
      } else if (char.match(/[0-9]/)) {
        requirements.number--;
      } else if (char.match(requirements.specialChar)) {
        specialCharCount++;
        if (specialCharCount > requirements.maxSpecialChars) {
          return false;
        }
      }
    }
  
    return (
      requirements.length <= 0 &&
      requirements.lowercase <= 0 &&
      requirements.uppercase <= 0 &&
      requirements.number <= 0
    )}