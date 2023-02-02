export default function getStringUntilComa(address){
    let newString = "";
    for (let i = 0; i < address.length; i++) {
      if (address[i] !== ",") {
        newString = newString + address[i];
      } else {
        break;
      }
    }
    return newString;
  };