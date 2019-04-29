const fs = require('fs')
const parse = require('csv-parse/lib/sync')
const codes = require('i18n-iso-countries')

const max = 16
const margin = 0.2
const span = (1.0 - 2 * margin) / max

const tile02long = (x) => {
  return x * 360 - 180
}

const tile02lat = (y) => {
  let n = Math.PI - 2 * Math.PI * y
  return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)))
}

let r = parse(fs.readFileSync('../8bit/board.csv'), { columns: false })

let geojson = {
  type: 'FeatureCollection',
  features: []
}

const createPolygon = (ul) => {
  return {
    type: 'Polygon',
    coordinates: [[
      [
        tile02long(ul[0]),
        tile02lat(ul[1])
      ],
      [
        tile02long(ul[0]),
        tile02lat(ul[1] + span)
      ],
      [
        tile02long(ul[0] + span),
        tile02lat(ul[1] + span)
      ],
      [
        tile02long(ul[0] + span),
        tile02lat(ul[1])
      ],
      [
        tile02long(ul[0]),
        tile02lat(ul[1])
      ] 
    ]]
  }
}

const addPolygonFeature = (i, j, iso2cd) => {
  const upperLeft = [
    margin + span * j,
    margin + span * i
  ]
  let f = {
    type: 'Feature',
    geometry: createPolygon(upperLeft),
    properties: {
      iso2cd: iso2cd,
      iso3cd: codes.alpha2ToAlpha3(iso2cd.toUpperCase()),
      name: codes.getName(iso2cd, 'en')
    }
  }
  if (f.properties.name === 'Swaziland') {
    f.properties.name = 'Eswatini'
  }
  geojson.features.push(f)
}

for (let i = 0; i < max; i++) {
  for (let j = 0; j < max; j++) {
    const iso2cd = r[i + 1][j].trim()
    if (iso2cd !== '') {
      addPolygonFeature(i, j, r[i + 1][j])
    }
  }
}
console.log(JSON.stringify(geojson, null, 2))
