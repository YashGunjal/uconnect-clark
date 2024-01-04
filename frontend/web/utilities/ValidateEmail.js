export const validateEmailAddress = (email) => {
    var re = /\S+@\S+\.\S+/;
    if (email === "") {
      return "Email is required";
    }
    if (!re.test(email)) {
      return "Email format is invalid.";
    }
    if (!email.includes("@clarku.edu")){
      return "Only Clark university registered Email"
    }
  };