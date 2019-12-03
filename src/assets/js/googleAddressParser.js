const GoogleAddress = {
  tokenCount: "",
  addressName: "",
  addressLineOne: "",
  addressLineTwo: "",
  country: "",
  pincode: "",
  state: "",
  city: "",
  area: "",
  orignialAddressString: ""
};

let PINCODE_REGEX_PATTERN = ".*\\d{6}.*";

function init(addressFromGoogle, addressName) {
  GoogleAddress.addressName = "";
  GoogleAddress.addressLineOne = "";
  GoogleAddress.addressLineTwo = "";
  GoogleAddress.country = "";
  GoogleAddress.pincode = "";
  GoogleAddress.state = "";
  GoogleAddress.city = "";
  GoogleAddress.area = "";
  console.log("addressFromGoogle : " + addressFromGoogle);
  console.log("addressName : " + addressName);
  let str = addressFromGoogle.trim();
  console.log("initializing...");
  console.log("length...", str.length);
  if (addressFromGoogle && addressFromGoogle.trim().length > 0) {
    GoogleAddress.orignialAddressString = addressFromGoogle;
    if (addressName && addressName.trim().length > 0) {
      GoogleAddress.addressName = addressName;
    }
    let tokens = addressFromGoogle.split(",");
    // Log.i(TAG, tokens.length + " : " + addressFromGoogle);
    GoogleAddress.tokenCount = tokens.length;
    if (GoogleAddress.tokenCount === 1) {
      processOneTokens(tokens);
    } else if (GoogleAddress.tokenCount === 2) {
      processTwoTokens(tokens);
    } else if (GoogleAddress.tokenCount === 3) {
      processThreeTokens(tokens);
    } else if (GoogleAddress.tokenCount === 4) {
      processFourTokens(tokens);
    } else if (GoogleAddress.tokenCount === 5) {
      processFiveTokens(tokens);
    } else if (GoogleAddress.tokenCount === 6) {
      processSixTokens(tokens);
    } else if (GoogleAddress.tokenCount === 7) {
      processSevenTokens(tokens);
    } else if (GoogleAddress.tokenCount === 8) {
      processEightTokens(tokens);
    } else {
      processGreaterThanEightTokens(tokens);
    }
  }
}

function getCityInformation() {
  if (GoogleAddress.state === "") {
    if (GoogleAddress.city === "") {
      if (GoogleAddress.pincode === "") {
        return "";
      } else {
        return GoogleAddress.pincode;
      }
    } else {
      if (GoogleAddress.pincode === "") {
        return GoogleAddress.city;
      } else {
        return GoogleAddress.city + ", " + GoogleAddress.pincode;
      }
    }
  } else if (GoogleAddress.city === "") {
    if (GoogleAddress.pincode === "") {
      return GoogleAddress.state;
    } else {
      return GoogleAddress.state + ", " + GoogleAddress.pincode;
    }
  } else if (GoogleAddress.pincode === "") {
    return GoogleAddress.city + ", " + GoogleAddress.state;
  } else {
    return (
      GoogleAddress.city +
      ", " +
      GoogleAddress.state +
      ", " +
      GoogleAddress.pincode
    );
  }
}

function isOnlyPincode(pincodeString) {
  let onlyPincode = parseInt(pincodeString);
  return !isNaN(onlyPincode);
}

function processOneTokens(tokens) {
  GoogleAddress.country = tokens[0];
}

function processTwoTokens(tokens) {
  GoogleAddress.state = tokens[0];
  GoogleAddress.country = tokens[1];
}

function processThreeTokens(tokens) {
  //Kesariya - Diu Rd, Daman and Diu 362520, India
  //"Gurugram, Haryana, India",
  GoogleAddress.country = tokens[tokens.length - 1].trim();
  let stateAndPincode = tokens[tokens.length - 2].trim();
  if (isOnlyPincode(stateAndPincode)) {
    GoogleAddress.pincode = stateAndPincode;
  } else {
    if (stateAndPincode.match(PINCODE_REGEX_PATTERN)) {
      //assuming if there is pin code then it will be
      GoogleAddress.pincode = stateAndPincode.replace("[^0-9]", ""); //minus six digit pincode
      GoogleAddress.state = stateAndPincode.replace("[0-9]", "").trim();
    } else {
      GoogleAddress.state = stateAndPincode;
    }
  }
  if (GoogleAddress.state.startsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(1).trim();
  if (GoogleAddress.state.endsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(
      0,
      GoogleAddress.area.length - 2
    );

  GoogleAddress.area = tokens[0].trim();
  if (GoogleAddress.area.startsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(1).trim();
  if (GoogleAddress.area.endsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(
      0,
      GoogleAddress.area.length - 2
    );
}

function processFourTokens(tokens) {
  //Dabolim - Cavelossim Rd, Benaulim, Goa 403716, India
  //Bahour Rd, Uruvaiyar, Puducherry 605110, India
  //Paschim Vihar, New Delhi, Delhi, India
  //India Gate, New Delhi, Delhi, India

  GoogleAddress.addressLineOne = GoogleAddress.addressName;
  GoogleAddress.addressLineTwo = tokens[0];

  GoogleAddress.country = tokens[tokens.length - 1].trim();
  let stateAndPincode = tokens[tokens.length - 2].trim();
  if (isOnlyPincode(stateAndPincode)) {
    GoogleAddress.pincode = stateAndPincode;
  } else {
    if (stateAndPincode.match(PINCODE_REGEX_PATTERN)) {
      //assuming if there is pin code then it will be
      GoogleAddress.pincode = stateAndPincode.replace("[^0-9]", ""); //minus six digit pincode
      GoogleAddress.state = stateAndPincode.replace("[0-9]", "").trim();
    } else {
      GoogleAddress.state = stateAndPincode;
    }
  }
  if (GoogleAddress.state.startsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(1).trim();
  if (GoogleAddress.state.endsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(
      0,
      GoogleAddress.area.length - 2
    );

  GoogleAddress.area = GoogleAddress.orignialAddressString
    .substring(
      0,
      GoogleAddress.orignialAddressString.indexOf(", " + stateAndPincode)
    )
    .trim();
  if (GoogleAddress.area.startsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(1).trim();
  if (GoogleAddress.area.endsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(
      0,
      GoogleAddress.area.length - 1
    );
}

function processFiveTokens(tokens) {
  //Damdama Lake Rd, Shahid Smarak, Sohna, Haryana 122102, India
  //Dhanwantri Rd, Maqbara Diggi, Meerut, Uttar Pradesh 250002, India

  GoogleAddress.addressLineOne = GoogleAddress.addressName;
  GoogleAddress.addressLineTwo = tokens[0] + ", " + tokens[1];

  GoogleAddress.country = tokens[tokens.length - 1].trim();
  let stateAndPincode = tokens[tokens.length - 2].trim();
  if (isOnlyPincode(stateAndPincode)) {
    GoogleAddress.pincode = stateAndPincode;
  } else {
    if (stateAndPincode.match(PINCODE_REGEX_PATTERN)) {
      //assuming if there is pin code then it will be
      GoogleAddress.pincode = stateAndPincode.replace("[^0-9]", ""); //minus six digit pincode
      GoogleAddress.state = stateAndPincode.replace("[0-9]", "").trim();
    } else {
      GoogleAddress.state = stateAndPincode;
    }
  }
  if (GoogleAddress.state.startsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(1).trim();
  if (GoogleAddress.state.endsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(
      0,
      GoogleAddress.area.length - 2
    );

  GoogleAddress.city = tokens[2].trim();
  if (GoogleAddress.city.startsWith(","))
    GoogleAddress.city = GoogleAddress.city.substring(1).trim();
  if (GoogleAddress.city.endsWith(","))
    GoogleAddress.city = GoogleAddress.city.substring(
      0,
      GoogleAddress.area.length - 2
    );

  GoogleAddress.area = GoogleAddress.orignialAddressString
    .substring(
      0,
      GoogleAddress.orignialAddressString.indexOf(", " + GoogleAddress.city)
    )
    .trim();
  if (GoogleAddress.area.startsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(1).trim();
  if (GoogleAddress.area.endsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(
      0,
      GoogleAddress.area.length - 1
    );
}

function processSixTokens(tokens) {
  //70, Sohna Rd, Sector 48, Gurugram, Haryana 122004, India
  //22, Janpath Rd, Windsor Place, New Delhi, Delhi 110001, India
  //3926, Sector 47 D, Sector 47, Chandigarh, 160047, India
  //3rd A Cross, 6th Block, Koramangala, Bengaluru, Karnataka 560095, India
  //62/37, Periyamedu, Choolai, Chennai, Tamil Nadu 600012, India
  //16, Simla, Machuabazar, Kolkata, West Bengal 700009, India

  GoogleAddress.addressLineOne = GoogleAddress.addressName;
  GoogleAddress.addressLineTwo = tokens[1] + ", " + tokens[2];

  GoogleAddress.country = tokens[tokens.length - 1].trim();
  let stateAndPincode = tokens[tokens.length - 2].trim();
  if (isOnlyPincode(stateAndPincode)) {
    GoogleAddress.pincode = stateAndPincode;
  } else {
    if (stateAndPincode.match(PINCODE_REGEX_PATTERN)) {
      //assuming if there is pin code then it will be
      GoogleAddress.pincode = stateAndPincode.replace("[^0-9]", ""); //minus six digit pincode
      GoogleAddress.state = stateAndPincode.replace("[0-9]", "").trim();
    } else {
      GoogleAddress.state = stateAndPincode;
    }
  }
  if (GoogleAddress.state.startsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(1).trim();
  if (GoogleAddress.state.endsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(
      0,
      GoogleAddress.area.length - 2
    );

  GoogleAddress.city = tokens[3].trim();
  if (GoogleAddress.city.startsWith(","))
    GoogleAddress.city = GoogleAddress.city.substring(1).trim();
  if (GoogleAddress.city.endsWith(","))
    GoogleAddress.city = GoogleAddress.city.substring(
      0,
      GoogleAddress.area.length - 2
    );

  GoogleAddress.area = GoogleAddress.orignialAddressString
    .substring(
      tokens[0].length,
      GoogleAddress.orignialAddressString.indexOf(", " + GoogleAddress.city)
    )
    .trim();
  if (GoogleAddress.area.startsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(1).trim();
  if (GoogleAddress.area.endsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(
      0,
      GoogleAddress.area.length - 1
    );
}

function processSevenTokens(tokens) {
  //444P, Medicity, Islampur Colony, Sector 38, Gurugram, Haryana 122018, India
  //15/302, Noori Gate Rd, Bagh Muzaffar Khan, Mantola, Agra, Uttar Pradesh 282002, India
  //335, Savitribai Phule Rd, Ghorpade Peth, Swargate, Pune, Maharashtra 411042, India
  //B-12, Anand Puri, Bis Dhukan, Adarsh Nagar, Jaipur, Rajasthan 302007, India

  GoogleAddress.addressLineOne = GoogleAddress.addressName + ", " + tokens[1];
  GoogleAddress.addressLineTwo =
    tokens[2] + ", " + tokens[3] + ", " + tokens[4];

  GoogleAddress.country = tokens[tokens.length - 1].trim();
  let stateAndPincode = tokens[tokens.length - 2].trim();
  if (isOnlyPincode(stateAndPincode)) {
    GoogleAddress.pincode = stateAndPincode;
  } else {
    if (stateAndPincode.match(PINCODE_REGEX_PATTERN)) {
      //assuming if there is pin code then it will be
      GoogleAddress.pincode = stateAndPincode.replace("[^0-9]", ""); //minus six digit pincode
      GoogleAddress.state = stateAndPincode.replace("[0-9]", "").trim();
    } else {
      GoogleAddress.state = stateAndPincode;
    }
  }
  if (GoogleAddress.state.startsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(1).trim();
  if (GoogleAddress.state.endsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(
      0,
      GoogleAddress.area.length - 2
    );

  GoogleAddress.city = tokens[tokens.length - 3].trim();
  if (GoogleAddress.city.startsWith(","))
    GoogleAddress.city = GoogleAddress.city.substring(1).trim();
  if (GoogleAddress.city.endsWith(","))
    GoogleAddress.city = GoogleAddress.city.substring(
      0,
      GoogleAddress.area.length - 2
    );

  GoogleAddress.area = GoogleAddress.orignialAddressString
    .substring(
      tokens[0].length,
      GoogleAddress.orignialAddressString.indexOf(", " + GoogleAddress.city)
    )
    .trim();
  if (GoogleAddress.area.startsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(1).trim();
  if (GoogleAddress.area.endsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(
      0,
      GoogleAddress.area.length - 1
    );
}

function processEightTokens(tokens) {
  //153, Pocket 6, Pocket 14, Sector-24, Rohini, Delhi, 110085, India
  //1-6-212, Parsigutta Rd, Gangaputra colony, Sanjeevipuram, Gangaputra Nagar, Hyderabad, Telangana 500020, India

  GoogleAddress.addressLineOne = tokens[0] + ", " + tokens[1];
  GoogleAddress.addressLineTwo =
    tokens[2] + ", " + tokens[3] + ", " + tokens[4];

  GoogleAddress.country = tokens[tokens.length - 1].trim();
  let stateAndPincode = tokens[tokens.length - 2].trim();
  if (isOnlyPincode(stateAndPincode)) {
    GoogleAddress.pincode = stateAndPincode;
  } else {
    if (stateAndPincode.match(PINCODE_REGEX_PATTERN)) {
      //assuming if there is pin code then it will be
      GoogleAddress.pincode = stateAndPincode.replace("[^0-9]", ""); //minus six digit pincode
      GoogleAddress.state = stateAndPincode.replace("[0-9]", "").trim();
    } else {
      GoogleAddress.state = stateAndPincode;
    }
  }
  if (GoogleAddress.state.startsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(1).trim();
  if (GoogleAddress.state.endsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(
      0,
      GoogleAddress.area.length - 2
    );

  GoogleAddress.city = tokens[tokens.length - 3].trim();
  if (GoogleAddress.city.startsWith(","))
    GoogleAddress.city = GoogleAddress.city.substring(1).trim();
  if (GoogleAddress.city.endsWith(","))
    GoogleAddress.city = GoogleAddress.city.substring(
      0,
      GoogleAddress.area.length - 2
    );

  //include token[2] in string
  GoogleAddress.area = GoogleAddress.orignialAddressString
    .substring(
      GoogleAddress.orignialAddressString.indexOf(tokens[2]),
      GoogleAddress.orignialAddressString.indexOf(", " + GoogleAddress.city)
    )
    .trim();
  if (GoogleAddress.area.startsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(1).trim();
  if (GoogleAddress.area.endsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(
      0,
      GoogleAddress.area.length - 1
    );
}

function processGreaterThanEightTokens(tokens) {
  //no example

  GoogleAddress.addressLineOne =
    tokens[0] + ", " + tokens[1] + ", " + tokens[2];
  GoogleAddress.addressLineTwo =
    tokens[3] + ", " + tokens[4] + ", " + tokens[5];

  GoogleAddress.country = tokens[tokens.length - 1].trim();
  let stateAndPincode = tokens[tokens.length - 2].trim();
  if (isOnlyPincode(stateAndPincode)) {
    GoogleAddress.pincode = stateAndPincode;
  } else {
    if (stateAndPincode.match(PINCODE_REGEX_PATTERN)) {
      //assuming if there is pin code then it will be
      GoogleAddress.pincode = stateAndPincode.replace("[^0-9]", ""); //minus six digit pincode
      GoogleAddress.state = stateAndPincode.replace("[0-9]", "").trim();
    } else {
      GoogleAddress.state = stateAndPincode;
    }
  }
  if (GoogleAddress.state.startsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(1).trim();
  if (GoogleAddress.state.endsWith(","))
    GoogleAddress.state = GoogleAddress.state.substring(
      0,
      GoogleAddress.area.length - 2
    );

  GoogleAddress.city = tokens[tokens.length - 3].trim();
  if (GoogleAddress.city.startsWith(","))
    GoogleAddress.city = GoogleAddress.city.substring(1).trim();
  if (GoogleAddress.city.endsWith(","))
    GoogleAddress.city = GoogleAddress.city.substring(
      0,
      GoogleAddress.area.length - 2
    );

  GoogleAddress.area = GoogleAddress.orignialAddressString
    .substring(
      GoogleAddress.orignialAddressString.indexOf(tokens[2]),
      GoogleAddress.orignialAddressString.indexOf(", " + GoogleAddress.city)
    )
    .trim();
  if (GoogleAddress.area.startsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(1).trim();
  if (GoogleAddress.area.endsWith(","))
    GoogleAddress.area = GoogleAddress.area.substring(
      0,
      GoogleAddress.area.length - 1
    );
}

// init();
const googleAddressParser = function(addressFromGoogle, name) {
  init(addressFromGoogle, name);

  return {
    getAddress: function() {
      return GoogleAddress;
    },
    getCityInformation: getCityInformation
  };
};

export default googleAddressParser;
