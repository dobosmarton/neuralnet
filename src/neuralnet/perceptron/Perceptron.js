
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
    let gradient = 0.2;

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

    const computeGradient = (weight, outputGradient) => {
      gradient = output * (1 - output) * weight * outputGradient;
    }

    /**
     * Visszatér a perceptron kimenetével
     */
    const getOutput = () => output;

    const getGradient = () => gradient;

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
      getGradient: getGradient,
      getBias: getBias,
      getWeight: getWeight
    };

    return publicAttrs;
}

export default perceptron;