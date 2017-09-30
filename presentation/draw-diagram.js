module.exports = function (Reveal, jsPlumb) {
  var common = {
    endpoint: 'Blank'
  }

  jsPlumb.connect({
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

// jsonb iterator next
  jsPlumb.connect({
    source: 'jsonb-diagram__jsonb-iterator',
    target: 'jsonb-diagram__jsonb-iterator-next',
    connector: ['Straight'],
    anchor: ['Bottom', 'Top'],
    overlays: [['Arrow', {width: 12, length: 12, location: 0.67}]]
  }, common)

  jsPlumb.connect({
    source: 'jsonb-diagram__jsonb-iterator-next',
    target: 'jsonb-diagram__jsonb-iterator-token',
    connector: ['Bezier', {curviness: 300}],
    anchor: ['Bottom', 'Right'],
    overlays: [['Arrow', {width: 12, length: 12, location: 0.67}]]
  }, common)
  jsPlumb.connect({
    source: 'jsonb-diagram__jsonb-iterator-next',
    target: 'jsonb-diagram__jsonb-value',
    connector: ['Straight'],
    anchor: ['Bottom', 'Top'],
    overlays: [['Arrow', {width: 12, length: 12, location: 0.67}]]
  }, common)

// end jsonb iterator next
  jsPlumb.connect({
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

// pushjsonbValue
  jsPlumb.connect({
    source: 'jsonb-diagram__jsonb-value',
    target: 'jsonb-diagram__push-jsonb-value',
    connector: ['Bezier', {curviness: 400}],
    anchor: ['Left', 'Bottom'],
    overlays: [['Arrow', {width: 12, length: 12, location: 0.67}]]
  }, common)

  jsPlumb.connect({
    source: 'jsonb-diagram__jsonb-iterator-token',
    target: 'jsonb-diagram__push-jsonb-value',
    connector: ['Straight'],
    anchor: ['Top', 'Bottom'],
    overlays: [['Arrow', {width: 12, length: 12, location: 0.67}]]
  }, common)
  jsPlumb.connect({
    source: 'jsonb-diagram__push-jsonb-value',
    target: 'jsonb-diagram__jsonb',
    connector: ['Straight'],
    anchor: ['Top', 'Bottom'],
    overlays: [['Arrow', {width: 12, length: 12, location: 0.67}]]
  }, common)
// end push jsonb value
  Reveal.layout()
}