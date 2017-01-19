import {perceptron, net} from './neuralnet';

const sgnFunc = output => (output > 0);

const attrsAND = {
  numInputs: 2,
  initalWeightClamp: 1.0,
  inputWeights: [1, 1],
  bias: -1.5,
  activationFunction: sgnFunc
};

const percAND = perceptron(attrsAND);

percAND.computeOutput([0, 0]);

console.log('perceptron AND [0, 0]', percAND.getOutput() > 0);

percAND.computeOutput([0, 1]);

console.log('perceptron AND [0, 1]', percAND.getOutput() > 0);

percAND.computeOutput([1, 1]);

console.log('perceptron AND [1, 1]', percAND.getOutput() > 0);

const attrsNAND = {
  numInputs: 2,
  initalWeightClamp: 1.0,
  inputWeights: [-1, -1],
  bias: 1.5,
  activationFunction: sgnFunc
};

const percNAND = perceptron(attrsNAND);
percNAND.computeOutput([0, 0]);

console.log('perceptron NAND [0, 0]', percNAND.getOutput() > 0);

percNAND.computeOutput([0, 1]);

console.log('perceptron NAND [0, 1]', percNAND.getOutput() > 0);

percNAND.computeOutput([1, 1]);

console.log('perceptron NAND [1, 1]', percNAND.getOutput() > 0);

const attrsOR = {
  numInputs: 2,
  initalWeightClamp: 1.0,
  inputWeights: [1, 1],
  bias: -0.5,
  activationFunction: sgnFunc
};

const percOR = perceptron(attrsOR);
percOR.computeOutput([0, 0]);

console.log('perceptron OR [0, 0]', percOR.getOutput() > 0);

percOR.computeOutput([0, 1]);

console.log('perceptron OR [0, 1]', percOR.getOutput() > 0);

percOR.computeOutput([1, 1]);

console.log('perceptron OR [1, 1]', percOR.getOutput() > 0);

const attrsXOR = {
  numInputNeurons: 2,
  numHiddenNeurons: 2,
  learningFactor: 0.3,
  initalWeightClamp: 1.0,
  hiddenLayer: [
    percOR,
    percNAND
  ],
  outputLayer: percAND
};

const netXOR = net(attrsXOR);

netXOR.computeOutput([0, 0]);

console.log('perceptron XOR [0, 0]', netXOR.getOutput() > 0);

netXOR.computeOutput([0, 1]);

console.log('perceptron XOR [0, 1]', netXOR.getOutput() > 0);

netXOR.computeOutput([1, 0]);

console.log('perceptron XOR [1, 0]', netXOR.getOutput() > 0);

netXOR.computeOutput([1, 1]);

console.log('perceptron XOR [1, 1]', netXOR.getOutput() > 0);





