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
  learningFactor = 0.3,
  initalWeightClamp = 0.5,
  hiddenLayer = [],
  outputLayer = perceptron(numHiddenNeurons, initalWeightClamp)
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
      outputLayer.computeOutput(hiddenLayer.map(neuron => neuron.getOutput()));
    }

    /**
     * Visszaadjuk a hálózat kimenetét
     */
    const getOutput = () => outputLayer.getOutput();

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
