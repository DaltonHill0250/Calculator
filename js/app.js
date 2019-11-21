(function() {
  "use strict";
  // get elements
  var el = function(element) {
    if (element.charAt(0) === "#") { //id passed
      return document.querySelector(element); //return single element
    }
    return document.querySelectorAll(element); //returns nodelist
  };
  // variables
  var viewer = el("#viewer"), // number display
    equals = el("#equals"), // equal 
    nums = el(".num"), // numbers
    ops = el(".ops"), // operators
    theNum = "", // Current number
    oldNum = "", // First number
    resultNum, // Result
    operator; 
  // number selector
  var setNum = function() {
    if (resultNum) { // If a result was displayed, gv  reset number
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else { // Otherwise, add digit to previous number (this is a string!)
      theNum += this.getAttribute("data-num");
    }
    viewer.innerHTML = theNum; // show number
  };
  // turn curent num to oldnum
  // select and save operator
  var moveNum = function() {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");
    equals.setAttribute("data-result", ""); // reset in attr
  };
  // calculations
  var displayNum = function() {
    // turn string to numbers (herb taught me this one)
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);
    // operation
    switch (operator) {
      case "plus":
        resultNum = oldNum + theNum;
        break;
      case "minus":
        resultNum = oldNum - theNum;
        break;
      case "times":
        resultNum = oldNum * theNum;
        break;
      case "divided by":
        resultNum = oldNum / theNum;
        break; 
      default:
        resultNum = theNum;// keep num if there is no operation
    }
    // result
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);
    // reset oldNum and keep result
    oldNum = 0;
    theNum = resultNum;
  };
  // clear viewer
  var clearAll = function() {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  /* click events */
  // add click event to numbers
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }
  // add click event to operators
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }
  // add click event to equal sign
  equals.onclick = displayNum;
  // add click event to clear button
  el("#clear").onclick = clearAll;
}());