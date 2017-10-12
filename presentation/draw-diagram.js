module.exports = {
  connectJsonbJsonbIterator,
  connectJsonbIteratorNext,
  connectJsonbValue2jsonb,
  pushJsonbValue,
  drawDiagram,
  clean
}
var connections = []
var common = {
  endpoint: 'Blank'
}
function clean (Reval, jsPlumb) {
  while (connections.length) {
    jsPlumb.deleteConnection(connections.pop())
  }
}

function connectJsonbJsonbIterator (Reveal, jsPlumb) {
  clean(Reveal, jsPlumb)
  var c1 = jsPlumb.connect({
    source: 'jsonb-diagram__jsonb',
    target: 'jsonb-diagram__jsonb-iterator',
    anchor: ['Left', 'Right'],
    connector: ['Straight'],
    overlays: [[
      'Label',
      {
        label: 'JsonbIteratorInit',
        location: 0.30,
        cssClass: 'jsonb-diagram__label'
      }
    ], ['Arrow', {width: 12, length: 12, location: 0.67}]]
  }, common)
  connections.push(c1)
}

function connectJsonbIteratorNext (Reveal, jsPlumb) {
  clean(Reveal, jsPlumb)
  const c1 = jsPlumb.connect({
    source: 'jsonb-diagram__jsonb-iterator',
    target: 'jsonb-diagram__jsonb-iterator-next',
    connector: ['Straight'],
    anchor: ['Bottom', 'Top'],
    overlays: [['Arrow', {width: 12, length: 12, location: 0.67}]]
  }, common)

  const c2 = jsPlumb.connect({
    source: 'jsonb-diagram__jsonb-iterator-next',
    target: 'jsonb-diagram__jsonb-iterator-token',
    connector: ['Bezier', {curviness: 300}],
    anchor: ['Bottom', 'Right'],
    overlays: [['Arrow', {width: 12, length: 12, location: 0.67}]]
  }, common)
  const c3 = jsPlumb.connect({
    source: 'jsonb-diagram__jsonb-iterator-next',
    target: 'jsonb-diagram__jsonb-value',
    connector: ['Straight'],
    anchor: ['Bottom', 'Top'],
    overlays: [['Arrow', {width: 12, length: 12, location: 0.67}]]
  }, common)
  connections.push(c1, c2, c3)
}

function connectJsonbValue2jsonb (Reveal, jsPlumb) {
  clean(Reveal, jsPlumb)
  const c1 = jsPlumb.connect({
    source: 'jsonb-diagram__jsonb-value',
    target: 'jsonb-diagram__jsonb',
    connector: ['Bezier'],
    anchor: ['Left', 'Bottom'],
    overlays: [[
      'Label',
      {
        label: 'JsonbValueToJsonb',
        location: 0.65,
        cssClass: 'jsonb-diagram__label'
      }
    ],
    ['Arrow', {width: 12, length: 12, location: 0.85}],
    ['Arrow', {width: 12, length: 12, location: 1 - 0.85, direction: -1}],
    [
      'Label',
      {
        label: 'findJsonbValueFromContainer',
        location: 1 - 0.6,
        cssClass: 'jsonb-diagram__label'
      }
    ]]
  }, common)
  connections.push(c1)
}

function pushJsonbValue (Reveal, jsPlumb) {
  clean(Reveal, jsPlumb)

  const c1 = jsPlumb.connect({
    source: 'jsonb-diagram__jsonb-value',
    target: 'jsonb-diagram__push-jsonb-value',
    connector: ['Bezier', {curviness: 400}],
    anchor: ['Left', 'Bottom'],
    overlays: [['Arrow', {width: 12, length: 12, location: 0.67}]]
  }, common)

  const c2 = jsPlumb.connect({
    source: 'jsonb-diagram__jsonb-iterator-token',
    target: 'jsonb-diagram__push-jsonb-value',
    connector: ['Straight'],
    anchor: ['Top', 'Bottom'],
    overlays: [['Arrow', {width: 12, length: 12, location: 0.67}]]
  }, common)
  const c3 = jsPlumb.connect({
    source: 'jsonb-diagram__push-jsonb-value',
    target: 'jsonb-diagram__jsonb',
    connector: ['Straight'],
    anchor: ['Top', 'Bottom'],
    overlays: [['Arrow', {width: 12, length: 12, location: 0.67}]]
  }, common)
  connections.push(c1, c2, c3)
}
function drawDiagram (Reveal, jsPlumb) {
  const mConnections = []
  clean(Reveal, jsPlumb)

  connectJsonbJsonbIterator(Reveal, jsPlumb)
  mConnections.push(...connections)
  // so we avoid cleaning them
  connections = []

  connectJsonbIteratorNext(Reveal, jsPlumb)
  mConnections.push(...connections)
  connections = []
  connectJsonbValue2jsonb(Reveal, jsPlumb)
  mConnections.push(...connections)
  connections = []
  pushJsonbValue(Reveal, jsPlumb)
  mConnections.push(...connections)
  connections = mConnections

  Reveal.layout()
}
