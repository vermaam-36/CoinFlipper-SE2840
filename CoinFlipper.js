/*
SE2840 Winter 2021 - Lab 3 JS Coin Flipper DOM
Name: Amish Verma
Class Section: 011
*/

// Tell the code inspection tool that we're writing ES6 compliant code:
// jshint esversion: 6
// Tell the code inspection tool that we're using "developer" classes (console, alert, etc)
// jshint devel:true
// See https://jshint.com/docs/ for more JSHint directives
// jshint unused:false

class CoinFlipper {

    constructor() {
        this.init = () => {
        };
        //initialize variables
        this.coinVal=0;
        this.flipVal=0;
        this.frequency = new Array()
        //get button
        let goButton = document.getElementById("button");
        //set up button and thereby main functionality
        goButton.onclick = () => {
            //clear data
            this.frequency=new Array()
            //get data
            this.getFields();
            console.log(this.coinVal);
            console.log(this.flipVal);
            //run experiment
            this.flipCoins(this.flipVal, this.coinVal, this.frequency)
            //plotdata
            this.plotHistogram()
        }

    }

    /**
     * plots data in meter tags
     */
    plotHistogram(){
        let histogram=  document.getElementById("Histogram");
        histogram.innerHTML= "";
       let maxValue= Math.max(...this.frequency)
        for(let i=0; i<this.frequency.length; i++){
            let coinNumber= document.createElement("label");
            coinNumber.innerHTML=i;
            coinNumber.className="coin-label";
            let flipNumber= document.createElement("label");
            flipNumber.className="flip-label";
            flipNumber.innerHTML=this.frequency[i];
            let meter= document.createElement("meter");
            meter.max=maxValue;
            meter.min=0;
            meter.value=this.frequency[i]
            histogram.appendChild(document.createElement("br"));
            histogram.appendChild(coinNumber);
            histogram.appendChild(flipNumber);
            histogram.appendChild(meter);

        }
    }
    /**
     * Retrieves Fields from HTML
     */
      getFields(){
        let tempFLips= document.getElementById("flipVal").value;
        if(isInputAnInteger(tempFLips)){
            document.getElementById("flipErrors").innerText= "Errors: None";
            this.flipVal=tempFLips;
        }else{
            document.getElementById("flipErrors").innerText= "Errors: Flip value must be an integer";

        }
        let tempCoins= document.getElementById("coinVal").value;
        if(isInputAnInteger(tempCoins)){
            document.getElementById("coinErrors").innerText= "Errors: None";
            this.coinVal=tempCoins;
        }else{
            document.getElementById("coinErrors").innerText= "Errors: Coin value must be an integer";
        }
    }

    /**
     * Main loop to flip all coins
     * @param numberOfRepetitions self explanatory
     * @param numberOfCoins self explanatory
     * @param frequency An array containing how many coins landed on heads after each repetition
     */
    flipCoins(numberOfRepetitions, numberOfCoins, frequency) {
        // This loop fills up the frequency bins. Each iteration simulates one group of numCoins coin flips.
        // For example, with a group of flips of 3 coins, heads may come up 0, 1, 2, or 3 times.
        for(let coin=0; coin<numberOfCoins;coin++){
            frequency[coin]=0
        }
        frequency[numberOfCoins]=0
        for( let rep=0; rep<numberOfRepetitions; rep++) {
            // perform a single flip of NUM_OF_COINS coins
            let heads = this.doSingleFlip(numberOfCoins)
            frequency[heads]+=1 // update appropriate bin
        }
        console.log(frequency)
    }
    /**
     * Does one repetitions of flipping
     * @param numberOfCoins number of coins to be flipped
     * @returns {number} amount of heads recorded
     */
    doSingleFlip(numberOfCoins) {
        let heads = 0;
        for( let i=0; i<numberOfCoins; i++ ) { // flip each coin
            let flip=Math.ceil(Math.random() * 2)-1;
            heads +=flip; // computed random int value is either 0 or 1 (tails or heads)
        }
        return heads; // number of heads that came up
    }

}

/**
 * Determines if value is integer
 * @param value value to check
 * @returns {boolean} true if integer
 */
const isInputAnInteger = (value) => {
    // Make sure the input string is a number
    if(isNaN(value)) {
        return false;
    }
    // We now know the string contains a number, but is it an integer?
    // Parse the string to a float (decimal with precision) and then verify that it is an integer
    if(!Number.isInteger(parseFloat(value))) {
        return false;
    }
    // The input string is a number and an integer
    return true;
}
window.onload = () => {
    let cf = new CoinFlipper();
    cf.init();
}
