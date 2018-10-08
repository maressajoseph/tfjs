import * as tensorflow from '@tensorflow/tfjs'

export const tf = tensorflow

// Defining The Model

// The machine learning scenario is based on the formula Y=2X-1, a linear regression.

// create new model instance (sequential model is any model where
//   the outputs of one layer are the inputs to the next layer (stack of layers))
export const modelLinear = tf.sequential()

// add first dense layer (in a dense layer every node in the layer
//   is connected to every node in the preceding layer)
modelLinear.add(tf.layers.dense({ units: 1, inputShape: [1] }))

// specify the loss and optimizer function for the model by passing config object to the compile method
// loss function maps values of one/more variables onto a real number that represents costs associated with the value
//   meanSquaredError: measures average squares of the errors (difference between the estimated values and what is estimated)
// optimizer function sgd: Stands for Stochastic Gradient Descent (suitable for linear regression tasks)
modelLinear.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })
