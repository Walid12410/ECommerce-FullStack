const { sql, poolPromise } = require("../config/connectToDB");

const couponModel = {
    async getAllCoupons() {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .query(`
                    SELECT c.*, co.CompanyName 
                    FROM Coupon c
                    JOIN Company co ON c.CompanyNo = co.CompanyNo
                    ORDER BY c.StartDate DESC
                `);
            return result.recordset;
        } catch (error) {
            console.log("Error fetching coupons:", error);
            throw error;
        }
    },

    async getCouponByCode(code) {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .input('Code', sql.NVarChar, code)
                .query(`
                    SELECT c.*, co.CompanyName 
                    FROM Coupon c
                    JOIN Company co ON c.CompanyNo = co.CompanyNo
                    WHERE c.Code = @Code
                `);
            return result.recordset[0];
        } catch (error) {
            console.log("Error fetching coupon by code:", error);
            throw error;
        }
    },

    async getCouponsByCompany(companyNo) {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .input('CompanyNo', sql.Int, companyNo)
                .query(`
                    SELECT c.*, co.CompanyName 
                    FROM Coupon c
                    JOIN Company co ON c.CompanyNo = co.CompanyNo
                    WHERE c.CompanyNo = @CompanyNo
                    ORDER BY c.StartDate DESC
                `);
            return result.recordset;
        } catch (error) {
            console.log("Error fetching company coupons:", error);
            throw error;
        }
    },

    async checkCouponValidity(code, currentTime) {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .input('Code', sql.NVarChar, code)
                .input('CurrentTime', sql.DateTime, currentTime)
                .query(`
                    SELECT c.*, co.CompanyName 
                    FROM Coupon c
                    JOIN Company co ON c.CompanyNo = co.CompanyNo
                    WHERE c.Code = @Code 
                    AND c.StartDate <= @CurrentTime 
                    AND c.ExpiryDate >= @CurrentTime
                `);
            return result.recordset[0];
        } catch (error) {
            console.log("Error checking coupon validity:", error);
            throw error;
        }
    },

    async createCoupon(coupon) {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .input('CompanyNo', sql.Int, coupon.CompanyNo)
                .input('Code', sql.NVarChar, coupon.Code)
                .input('Savings', sql.Decimal(10, 2), coupon.Savings)
                .input('MinOrderValue', sql.Decimal(10, 2), coupon.MinOrderValue)
                .input('StartDate', sql.DateTime, coupon.StartDate)
                .input('ExpiryDate', sql.DateTime, coupon.ExpiryDate)
                .query(`
                    INSERT INTO Coupon (
                        CompanyNo, Code, Savings, MinOrderValue, 
                        StartDate, ExpiryDate
                    )
                    VALUES (
                        @CompanyNo, @Code, @Savings, @MinOrderValue,
                        @StartDate, @ExpiryDate
                    )
                `);
            return { success: true };
        } catch (error) {
            if (error.number === 2627) { // SQL Server unique constraint violation
                return { exists: true };
            }
            console.log("Error creating coupon:", error);
            throw error;
        }
    },

    async updateCoupon(coupon) {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .input('CouponNo', sql.Int, coupon.CouponNo)
                .input('CompanyNo', sql.Int, coupon.CompanyNo)
                .input('Code', sql.NVarChar, coupon.Code)
                .input('Savings', sql.Decimal(10, 2), coupon.Savings)
                .input('MinOrderValue', sql.Decimal(10, 2), coupon.MinOrderValue)
                .input('StartDate', sql.DateTime, coupon.StartDate)
                .input('ExpiryDate', sql.DateTime, coupon.ExpiryDate)
                .query(`
                    UPDATE Coupon
                    SET Code = @Code,
                        Savings = @Savings,
                        MinOrderValue = @MinOrderValue,
                        StartDate = @StartDate,
                        ExpiryDate = @ExpiryDate
                    WHERE CouponNo = @CouponNo AND CompanyNo = @CompanyNo
                `);
            
            if (result.rowsAffected[0] === 0) {
                return { notFound: true };
            }
            return { success: true };
        } catch (error) {
            if (error.number === 2627) { // SQL Server unique constraint violation
                return { exists: true };
            }
            console.log("Error updating coupon:", error);
            throw error;
        }
    },

    async deleteCoupon(couponNo, companyNo) {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .input('CouponNo', sql.Int, couponNo)
                .input('CompanyNo', sql.Int, companyNo)
                .query(`
                    DELETE FROM Coupon
                    WHERE CouponNo = @CouponNo AND CompanyNo = @CompanyNo
                `);
            
            if (result.rowsAffected[0] === 0) {
                return { notFound: true };
            }
            return { success: true };
        } catch (error) {
            console.log("Error deleting coupon:", error);
            throw error;
        }
    }
};

module.exports = couponModel; 