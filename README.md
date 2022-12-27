<div align="center">
<b>Maxmind reader</b><br/>
<br/><br/>
</div>

[![npm version](https://badge.fury.io/js/%40voodoo.io%2Fmaxmind-reader.svg)](https://badge.fury.io/js/%40voodoo.io%2Fmaxmind-reader)
[![GitHub license](https://img.shields.io/github/license/VoodooTeam/maxmind-reader)](https://github.com/VoodooTeam/maxmind-reader/blob/master/LICENSE)
[![CI pipeline](https://github.com/VoodooTeam/maxmind-reader/workflows/Node.js%20CI/badge.svg)](https://github.com/VoodooTeam/maxmind-reader/actions?query=workflow%3A%22Node.js+CI%22)
[![Opened issues](https://img.shields.io/github/issues-raw/VoodooTeam/maxmind-reader)](https://github.com/VoodooTeam/maxmind-reader/issues)
[![Opened PR](https://img.shields.io/github/issues-pr-raw/VoodooTeam/maxmind-reader)](https://github.com/VoodooTeam/maxmind-reader/pulls)
[![DeepScan grade](https://deepscan.io/api/teams/12068/projects/15411/branches/307224/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=12068&pid=15411&bid=307224)
[![Code coverage](https://codecov.io/gh/VoodooTeam/maxmind-reader/branch/master/graph/badge.svg)](https://codecov.io/gh/VoodooTeam/maxmind-reader)
![Dependencies](https://img.shields.io/david/VoodooTeam/maxmind-reader)


# Purpose

Minimalist, efficient and performance focused module to read a maxmind database.
Basically it can read a maxmind db from S3 and store it into memory.

# Compatibility

**/!\ This module use async/await syntax, this is why you must have node 7.6+.**

Supported and tested : >= 14

| Version       | Supported     | Tested         |
| ------------- |:-------------:|:--------------:|
| 18.x          | yes           | yes            |
| 16.x          | yes           | yes            |
| 14.x          | yes           | yes            |
| 12.x          | no            | yes            |
| 10.x          | no            | yes            |
| 9.x           | no            | yes            |
| 8.x           | no            | yes            |
| >= 7.6        | no            | yes            |

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
