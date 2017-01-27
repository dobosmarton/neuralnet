import perceptron from '../perceptron/perceptron';

/**
 * Hálózat modellje
 * @param numInputNeurons:    a hálózat bemenetinek száma
 * @param numHiddenNeurons:   a rejtett réteg neuronjainak száma
 * @param learningFactor:     tanulási paraméter
 * @param initalWeightClamp:  súly paraméter (generált súlyok esetén számít)
 * @param hiddenLayer:        rejtett réteg neuronjai
 * @param outputLayer:        kiemeneti réteg neuronja
 */
const net = ({
  numInputNeurons,
  numHiddenNeurons,
  numOutputNeurons = 1,
  learningFactor = 0.3,
  initalWeightClamp = 0.5,
  hiddenLayer = [],
  outputLayer = [perceptron(numHiddenNeurons, initalWeightClamp)]
}) => {

    /**
     * Ha a rejtett réteget nem kaptuk meg paraméterként,
     * akkor létrehozzuk a perceptronokat véletlen súlyokkal
     */
    if ( hiddenLayer.length === 0) {
      for (let i = 0; i < numHiddenNeurons; i++) {
        hiddenLayer[i] = perceptron(numInputNeurons, initalWeightClamp);
      }
    }

    /// PUBLIC ///

    /**
     * Kiszámoljuk a hálózat kimenetét a megadott bemenet függvényében
     * @param inputs: bemenetek
     */
    const computeOutput = inputs => {
      hiddenLayer.forEach(neuron => neuron.computeOutput(inputs));
      outputLayer.forEach(neuron => neuron.computeOutput(hiddenLayer.map(neuron => neuron.getOutput())));
    }

    const backPropError = expectedOutput => {
      const outputErrors = outputLayer.map((neuron, index) => {
        const error = expectedOutput[index] - neuron.getOutput();
        neuron.setDelta(error);
        return error;
      });
      const hiddenErrors = hiddenLayer.map((hiddenNeuron, index) => {
        const error = outputLayer
                        .map(outputNeuron => outputNeuron.getWeight[index] * outputNeuron.getDelta())
                        .reduce((a, b) => a + b, 0);
        hiddenNeuron.setDelta(error);
        return error;
      });
    }

    const updateWeights = row => {}

    /**
     * Visszaadjuk a hálózat kimenetét
     */
    const getOutput = index => index ? outputLayer[index].getOutput() : outputLayer[0].getOutput();

    /**
     * A modell visszatér a publikusan elérhető függvényekkel,
     * kívülről ezeket lehet elérni
     */
    const publicAttrs = {
      computeOutput: computeOutput,
      getOutput: getOutput
    };

    return publicAttrs;
}

export default net;
