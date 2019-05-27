task :default do
  sh "hjson -c style.hjson > style.json"
  sh "node index.js > 8bit.geojson"
  sh "node index.js | tippecanoe --force --layer=bnda --minimum-zoom=0 --maximum-zoom=0 --base-zoom=0 --output-to-directory=. --no-tile-compression"
end

