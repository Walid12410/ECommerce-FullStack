const { sql, poolPromise } = require("../config/connectToDB");


const featureModel = {
    async getFeature(currentTime, page, limit) {
        try {
            const pool = await poolPromise();
    
            const result = await pool.request()
                .input('CurrentTime', sql.DateTime, currentTime)
                .input('page', sql.Int, page)
                .input('limit', sql.Int, limit)
                .query(`
                    SELECT * FROM FeatureVW
                    WHERE StartDate <= @CurrentTime AND EndDate >= @CurrentTime
                    ORDER BY StartDate DESC -- Adjust based on your sorting needs
                    OFFSET (@page - 1) * @limit ROWS
                    FETCH NEXT @limit ROWS ONLY
                `);
    
            return result.recordset;
        } catch (error) {
            console.log("Error fetching feature", error);
            throw error;
        }
    },

    async createFeature(feature) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('ProductNo',sql.Int,feature.productNo)
                .input('StartDate',sql.DateTime,feature.startDate)
                .input('EndDate',sql.DateTime, feature.endDate)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Product WHERE ProductNo = @ProductNo )
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN
                        INSERT INTO Feature (ProductNo, StartDate, EndDate) VALUES (@ProductNo, @StartDate, @EndDate)

                        SELECT 'success' AS Status
                    END
                `);
            
            const status = result.recordset[0].Status;
            if (status === 'notFound') return { notFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to create feature");

        } catch (error) {
            console.log("Error create feature: ", error);
            throw error;
        }
    },

    async updateFeature(feature) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('FeatureID',sql.Int,feature.id)
                .input('ProductNo',sql.Int,feature.productNo)
                .input('StartDate',sql.DateTime,feature.startDate)
                .input('EndDate',sql.DateTime, feature.endDate)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Feature WHERE FeatureID = @FeatureID )
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    IF NOT EXISTS (SELECT 1 FROM Product WHERE ProductNo = @ProductNo )
                    BEGIN
                        SELECT 'productNotFound' AS Status
                    END
                    ELSE BEGIN
                        UPDATE Feature SET ProductNo = @ProductNo, StartDate = @StartDate, EndDate = @EndDate
                        WHERE FeatureID = @FeatureID

                        SELECT 'success' AS Status
                    END
                `);
            
            const status = result.recordset[0].Status;
            if (status === 'notFound') return { notFound: true };
            if (status === 'productNotFound') return { productNotFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to update feature");

        } catch (error) {
            console.log("Error update feature: ", error);
            throw error;
        }
    },

    async deleteFeature(id) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
            .input('FeatureID',sql.Int,id)
            .query(`
                IF NOT EXISTS (SELECT 1 FROM Feature WHERE FeatureID = @FeatureID )
                BEGIN
                    SELECT 'notFound' AS Status
                END
                ELSE BEGIN
                    DELETE FROM Feature WHERE FeatureID = @FeatureID

                    SELECT 'success' AS Status
                END
            `);
        
        const status = result.recordset[0].Status;
        if (status === 'notFound') return { notFound: true };
        if (status === 'success') return { success: true };

        throw new Error("Failed to delete feature");

        } catch (error) {
            console.log("Error delete feature: ", error);
            throw error;
        }
    }
}

module.exports = featureModel;