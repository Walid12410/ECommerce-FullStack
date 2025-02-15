const { sql, poolPromise } = require("../config/connectToDB");


const offerModel = {
    async getOffers(currentTime,page,limit) {
        try {
            const pool = await poolPromise();
    
            const result = await pool.request()
                .input('CurrentTime', sql.DateTime, currentTime)
                .input("page", sql.Int, page)
                .input("limit", sql.Int, limit)
                .query(`
                    SELECT * 
                    FROM OfferVW 
                    WHERE StartDate <= @CurrentTime AND EndDate >= @CurrentTime
                    ORDER BY StartDate
                    OFFSET (@page - 1) * @limit ROWS 
                    FETCH NEXT @limit ROWS ONLY
                `);
    
            return result.recordset;
        } catch (error) {
            console.error("Error fetching offers:", error);
            throw error;
        }
    },
    
    async getOneOffer(offerNo) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('OfferNo', sql.Int, offerNo)
                .query(`SELECT * FROM Offer WHERE OfferNo = @OfferNo`);

            return result.recordset[0];
        } catch (error) {
            console.log("Error fetch offer: ", error);
            throw error;
        }
    },

    async createOffer(offer) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('ProductNo', sql.Int, offer.productNo)
                .input('DiscountAmt', sql.Decimal, offer.discount)
                .input('StartDate', sql.DateTime, offer.startDate)
                .input('EndDate', sql.DateTime, offer.endDate)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Product WHERE ProductNo = @ProductNo)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN
                        INSERT INTO Offer (ProductNo, DiscountAmt, StartDate, EndDate)
                        VALUES (@ProductNo, @DiscountAmt, @StartDate, @EndDate)

                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordsets[0][0].Status; // Get status result

            if (status === 'notFound') return { notFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to create offer");
        } catch (error) {
            console.log("Error create offer: ", error);
            throw error;
        }
    },

    async updateOffer(offer) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('OfferNo', sql.Int, offer.id)
                .input('ProductNo', sql.Int, offer.productNo)
                .input('DiscountAmt', sql.Decimal, offer.discount)
                .input('StartDate', sql.DateTime, offer.startDate)
                .input('EndDate', sql.DateTime, offer.endDate)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Product WHERE ProductNo = @ProductNo)
                    BEGIN
                        SELECT 'productNotFound' AS Status
                    END
                    IF NOT EXISTS (SELECT 1 FROM Offer WHERE OfferNo = @OfferNo)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN
                        UPDATE Offer 
                        SET ProductNo = @ProductNo, DiscountAmt = @DiscountAmt,
                        StartDate = @StartDate, EndDate = @EndDate
                        WHERE OfferNo = @OfferNo

                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordsets[0][0].Status; // Get status result

            if (status === 'productNotFound') return { productNotFound: true };
            if (status === 'notFound') return { notFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to update offer");
        } catch (error) {
            console.log("Error update offer: ", error);
            throw error;
        }
    },

    async deleteOffer(offerNo) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('OfferNo', sql.Int, offerNo)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Offer WHERE OfferNo = @OfferNo)
                    BEGIN 
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN
                        DELETE Offer WHERE OfferNo = @OfferNo

                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordsets[0][0].Status; // Get status result

            if (status === 'notFound') return { notFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to delete offer");

        } catch (error) {
            console.log("Error delete offer: ", error);
            throw error;
        }
    }
}

module.exports = offerModel;