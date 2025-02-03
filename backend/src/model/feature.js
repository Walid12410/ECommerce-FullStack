const { sql, poolPromise } = require("../config/connectToDB");


const featureModel = {
    async getFeature(currentTime) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('CurrentTime', sql.DateTime, currentTime)
                .query(`SELECT * FROM FeatureVW WHERE
                    StartDate <= @CurrentTime AND EndDate >= @CurrentTime
                `);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch feature", error);
            throw error;
        }
    },

    async createFeature(feature) {

    }
}

module.exports = featureModel;