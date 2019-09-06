// This is the model
const model = tf.sequential();
// This is the optimizer function that uses statastic gradient descent
const sgd = tf.train.sgd(0.1);

// Create the hidden layer
// dense is a "fully connected layer"
const hidden = tf.layers.dense({
  units: 4,             // number of nodes
  inputShape: [2],      // input shape
  activation: 'sigmoid' // type of activation function
});
model.add(hidden);      // add the layer

// Create another layer
const output = tf.layers.dense({
  units: 1, 
  // here the input shape is "inferred" from the previous layer, hence why it isn't explicity defined
  activation: 'sigmoid'
});
model.add(output); // add the layer

// The model has been configured so compile it
model.compile({
  optimizer: sgd,
  loss: tf.losses.meanSquaredError
});

const xs = tf.tensor2d([
  [0, 0],
  [0.5, 0.5],
  [1, 1],
]);

const ys = tf.tensor2d([
  [1],
  [0.5],
  [0],
]);

train().then(() => {
  console.log('training complete');
  let outputs = model.predict(xs);
  outputs.print();
});

async function train() {
  for (let i = 0; i < 1000; i++) {
    const config = {
      shuffle: true,
      epochs: 10
    }
    const response = await model.fit(xs, ys, config);
    console.log(response.history.loss[0]);
  }
}

// const xs = tf.tensor2d([
//   [0.25, 0.92],
//   [0.12, 0.3],
//   [0.4, 0.74],
//   [01, 0.22],
// ]);
// let outputs = model.predict(xs);
// outputs.print();