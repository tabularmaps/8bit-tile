# 8bit-tile
vector tile data for the 8bit array

# background
I wanted to create a vector tile data for `8bit`.

# vector tile schema
- Geometries are polygons.
- Layer name is `bnda`.
- Each feature has a property named `iso3cd` that contains CAPITALIZED ISO-3166-1 3-character code.
- Each feature has a property named `iso2cd` that contains downcase ISO-3166-1 2-character code.
- Each feature has a property named `maplab` that contains the name.

# install
```console
git clone git@github.com:tabularmaps/8bit
git clone git@github.com:tabularmaps/8bit-tile
cd 8bit-tile
npm install
```

# run
```console
rake
```
