import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NumberNamer from './NumberNamer';

function inputHandler(e) {
  const output = document.querySelector("#numberResult");
  const input = e.target.value
  const validInput = new RegExp(/^-?([1-9]\d*|0)(\/-?([1-9]\d*|0))?$/);
  if (validInput.test(input)) {
    //checks to keep input within computational ability
    if (input.length >=  16 && !input.includes("/")) {
      output.innerHTML = "Too large! (Do you 𝘸𝘢𝘯𝘵 the page to crash?)"
    }
    else if ((input.slice(0, input.indexOf("/")).length > 14) || (input.slice(input.indexOf("/")).length > 15)) {
      output.innerHTML = "Too large! (Do you 𝘸𝘢𝘯𝘵 the page to crash?)"
    } else {
      const namNumObject = new NumberNamer(input)
      output.innerHTML = namNumObject.nameNum();
    }
  }
  else {
      output.innerHTML = input === "" ? "None" : "Invalid Input!";
  }
}

document.querySelector("#numberInput").addEventListener("input", inputHandler);