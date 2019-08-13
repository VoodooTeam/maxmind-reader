<div align="center">
<b>Maxmind reader</b><br/>
<br/><br/>

<a href="https://badge.fury.io/js/maxmind-reader">
   <img src="https://badge.fury.io/js/maxmind-reader.svg" alt="npm version" height="18">
</a>
</div>


# Purpose

Minimalist, efficient and performance focused module to read a maxmind database.
Basically it can read a maxmind db from S3 and store it into memory.

# Compatibility

**/!\ This module use async/await syntax, this is why you must have node 7.6+.**

Supported and tested : >= 7.6

| Version       | Supported     | Tested         |
| ------------- |:-------------:|:--------------:|
| 12.x          | yes           | yes            |
| 10.x          | yes           | yes            |
| 9.x           | yes           | yes            |
| 8.x           | yes           | yes            |
| >= 7.6        | yes           | yes            |

# Installation

```console
$ npm install @voodoo.io/maxmind-reader --save
```

# Usage

## Instantiation & init

```javascript
const S3Tools = require('@voodoo.io/aws-utils').s3
const s3 = new aws.S3()
const s3Tools = new S3Tools(s3)

const Geoloc = require('@voodoo.io/maxmind-reader')
const geoloc = new Geoloc({
  // here is your config
}, s3Tools)

// launch the interval to reload the file
// the delay can be customized as parameter
await geoloc.init()
```

## Basic usage
```javascript
const isoCode = geoloc.getCountry('149.62.156.82')
// isoCode equals 'FR'
```

## Config

| Property           | description                              | Default value  |
| -------------------|:----------------------------------------:|:--------------:|
| `S3_GEOLOC_KEY`    | '/path/to/GeoLite2-Country.mmdb'         | empty          |
| `S3_GEOLOC_BUCKET` | Bucket's name                            | empty          |
| `delay`            | Interval in ms between two reloading     | 3600000 (1hour)|
| `enableScheduler`  | Enable the scheduler?                    | true           |

# Test

```console
$ npm test
```

Coverage report can be found in coverage/.
