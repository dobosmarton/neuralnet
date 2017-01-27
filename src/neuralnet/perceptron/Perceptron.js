
/**
 * Egy perceptron modellje
 * @param numInputs:          a perceptron bemenetinek száma
 * @param initalWeightClamp:  súly paraméter (generált súlyok esetén számít)
 * @param inputWeights:       a perceptron bemenetein lévő súlyokat előre megadhatjuk
 * @param bias:               a perceptron nulladik bemenetének súlya, azaz a bias
 * @param activationFunction: definiálhatunk saját aktivációs függvényt, az alapértelmezett függvény a tanh
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
    let delta;
    /**
     * Ha nem adtuk meg a súlyokat, akkor random generáljuk őket
     */
    if (inputWeights.length === 0) {
      for (let i = 0; i < numInputs; i++) {
        inputWeights[i] = 2 * (Math.random() - 0.5) * initalWeightClamp;
      }
    }

    const derivative = () => output * ( 1.0 - output );

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

    const updateWeights = (learningFactor, inputs) => {
      for (let i = 0; i < inputs.length; i++) {
        inputWeights[i] += learningFactor * delta * inputs[i];
      }
      if (inputs.length < inputWeights.length) {
        inputWeights[inputWeights.length - 1] += learningFactor * delta;
      }
    }

    const setDelta = error => delta = error * derivative();
    const getDelta = () => delta;
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
      setDelta: setDelta,
      getDelta: getDelta,
      getBias: getBias,
      getWeight: getWeight
    };

    return publicAttrs;
}

export default perceptron;
