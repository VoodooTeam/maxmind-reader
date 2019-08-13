const { Reader } = require('maxmind')
const retry = require('async-await-retry')

class MaxmindReader {
    /**
     * Retrieve maxmind db
     *
     * @param {Object} config : global module oconfiguration
     * @property {Boolean} config.enableScheduler : do we need to retrieve db file periodically?
     * @property {Number} config.delay : interval (in ms) for scheduler
     * @param {class} s3Tools - S3 helper
     */
    constructor (config, s3Tools) {
        this.s3Tools = s3Tools
        this.delay = config.delay || 1000
        this.enableScheduler = config.enableScheduler || true
        this.S3_GEOLOC_KEY = config.S3_GEOLOC_KEY
        this.S3_GEOLOC_BUCKET = config.S3_GEOLOC_BUCKET
    }

    /**
     * Load geoloc db and set up cron to refresh it.
     *
     */
    async init () {
        await this.safeUpdateGeolocDb()
        if (this.enableScheduler) {
            this.timer = setInterval(async () => {
                await this.safeUpdateGeolocDb()
            }, this.delay)
        }
    }

    /**
     * Clean timer
     *
     */
    destroy () {
        clearInterval(this.timer)
    }

    /**
     * Get country from IP from geoloc database.
     *
     */
    getCountry (ip) {
        if (!ip) {
            return null
        }
        const info = this.countryLookup.get(ip)
        return info && info.country ? info.country.iso_code : null
    }

    /**
     * Update geoloc db.
     *
     */
    async updateGeolocDb () {
        const buffer = await this.s3Tools.getObject(
            this.S3_GEOLOC_BUCKET,
            this.S3_GEOLOC_KEY,
            'buffer'
        )
        this.countryLookup = new Reader(buffer)
    }

    /**
     * Same as updateGeolocDb function but with retries.
     *
     */
    async safeUpdateGeolocDb () {
        try {
            await this.updateGeolocDb()
        } catch (err) {
            await retry(this.updateGeolocDb.bind(this), [], 10)
        }
    }
}

module.exports = MaxmindReader
