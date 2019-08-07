const MaxmindReader = require('../index');
const fs = require('fs')
const path = require('path')

const AWS = require('aws-sdk-mock');

AWS.mock('S3', 'getObject', function (params, callback) {
    if(process.env.FAIL_ORIGIN) return callback(new Error(process.env.FAIL_ORIGIN))
	callback(null, { 'Body': fs.readFileSync(path.join(__dirname, './resources/GeoLite2-Country.mmdb')) });
});

const aws = require('aws-sdk')
const S3Tools = require('@voodoo.io/aws-utils').s3
const s3 = new aws.S3();
const s3Tools = new S3Tools(s3);

let reader = null

describe('Class MaxmindReader', () => {

    beforeEach(async () => {
        reader = new MaxmindReader({
            S3_GEOLOC_BUCKET: "bucket",
            S3_GEOLOC_KEY: "GeoLite2-Country.mmdb"
        }, s3Tools)
        await reader.init()
    })
    afterEach(async () => {
        reader.destroy()
    })

    describe('getCountry', () => {
		it('should return null cause ip is empty', async () => {
			const country = reader.getCountry();
			expect(country).toEqual(null);
		})

		it('should get country', () => {
			const country = reader.getCountry('149.62.156.82');
			expect(country).toEqual('FR');
        })
        
        it('should get country after a reloading', async (done) => {
            reader = new MaxmindReader({
                S3_GEOLOC_BUCKET: "bucket",
                S3_GEOLOC_KEY: "GeoLite2-Country.mmdb",
                delay: 500
            }, s3Tools)
            await reader.init()
            setTimeout(() => {
                const country = reader.getCountry('149.62.156.82');
                expect(country).toEqual('FR');
                done()
            }, 650)
        })
        
        it('should failed and retry', async () => {
            try {
                process.env.FAIL_ORIGIN = 'error cause S3 failed'
                await reader.safeUpdateGeolocDb();
			    throw new Error('This should has failed!')
            } catch (err) {
                expect(err.message).toEqual('error cause S3 failed')
            }
		})
	})
})