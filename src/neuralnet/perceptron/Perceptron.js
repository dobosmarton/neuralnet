
/**
 * Egy perceptron modellje
 * @param numInputs:          a perceptron bemenetinek száma
 * @param initalWeightClamp:  súly paraméter (generált súlyok esetén számít)
 * @param inputWeights:       a perceptron bemenetein lévő súlyokat előre megadhatjuk
 * @param bias:               a perceptron nulladik bemenetének súlya, azaz a bias
 * @param activationFunction: definiálhatunk saját aktivációs függvényt
 */
const perceptron = ({
  numInputs,
  initalWeightClamp = 0,
  inputWeights = [],
  bias = 2 * (Math.random() - 0.5) * initalWeightClamp,
  activationFunction = output => Math.tanh(output)
}) => {

    /// PRIVATE ///

    let output;
    /**
     * Ha nem adtuk meg a súlyokat, akkor random generáljuk őket
     */
    if (inputWeights.length === 0) {
      for (let i = 0; i < numInputs; i++) {
        inputWeights[i] = 2 * (Math.random() - 0.5) * initalWeightClamp;
      }
    }

    /// PUBLIC ///

    /**
     * A bemenet függvényében kiszámoljuk a perceptron kimenetét
     * @param inputs: bemenet
     */
    const computeOutput = inputs => {
      let newOutput = bias;
      for (let i = 0; i < inputs.length; i++) {
        newOutput += inputWeights[i] * inputs[i];
      }
      output = activationFunction(newOutput);
    }
    /**
     * Visszatér a perceptron kimenetével
     */
    const getOutput = () => output;
    /**
     * Visszatér a biassal
     */
    const getBias = () => bias;
    /**
     * Visszatér a megadott indexű bemenet súlyával
     */
    const getWeight = index => inputWeights[index];
    /**
     * A modell visszatér a publikusan elérhető függvényekkel,
     * kívülről ezeket lehet elérni
     */
    const publicAttrs = {
      computeOutput: computeOutput,
      getOutput: getOutput,
      getBias: getBias,
      getWeight: getWeight
    };

    return publicAttrs;
}

export default perceptron;
