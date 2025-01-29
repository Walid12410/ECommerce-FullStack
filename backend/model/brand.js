const { sql, poolPromise } = require("../config/connectToDB");


const brandModel = {
    async getBrand() {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .query(`SELECT * FROM Brand`);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch brand: ", error);
            throw error;
        }
    },

    async createBrand(brand) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('BrandName', sql.NVarChar, brand.name)
                .input('BrandImage', sql.NVarChar, brand.image)
                .input('ImageID', sql.NVarChar, brand.imageId)
                .query(`
                    IF EXISTS (SELECT 1 FROM Brand WHERE BrandName = @BrandName)
                    BEGIN
                        SELECT 'exists' AS Status
                    END
                    ELSE BEGIN
                      INSERT INTO Brand (BrandName, BrandImage, ImageID ) VALUES (@BrandName, @BrandImage, @ImageID) 

                      SELECT 'success' AS Status
                    END
                `)

            const status = result.recordset[0].Status;

            if (status === 'exists') return { exists: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to create brand");
        } catch (error) {
            console.log("Error create brand: ", error);
            throw error;
        }
    },

    async updateBrand(brand) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('BrandID', sql.Int, brand.brandId)
                .input('BrandName', sql.NVarChar, brand.name)
                .query(`
                    IF NOT EXISTS (SELECT * FROM Brand WHERE BrandID = @BrandID)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN
                        UPDATE Brand SET BrandName = @BrandName WHERE BrandID = @BrandID

                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordset[0].Status;
            if (status === 'notFound') return { notFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to update brand");
        } catch (error) {
            console.log("Error update brand", error);
            throw error;
        }
    },

    async changeBrandImage(brand) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('BrandID', sql.Int, brand.brandId)
                .input('BrandImage', sql.NVarChar, brand.image)
                .input('ImageID', sql.NVarChar, brand.imageId)
                .query(`
                    IF NOT EXISTS (SELECT * FROM Brand WHERE BrandID = @BrandID)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN
                        UPDATE Brand SET BrandImage = @BrandImage, ImageID = @ImageID WHERE BrandID = @BrandID

                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordset[0].Status;
            if (status === 'notFound') return { notFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to update brand");
        } catch (error) {
            console.log("Error update brand", error);
            throw error;
        }
    },

    async checkBrand(brandID){
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('BrandID',sql.Int, brandID)
                .query(`SELECT * FROM Brand WHERE BrandID = @BrandID`);

            if (result.recordset.length > 0) {
                return { brandInOrder: true };
            } else {
                return { brandNotFound: true };
            }
    
        } catch (error) {
            console.log("Error check brand: ", error);
            throw error;
        }
    },

    async deleteBrand(brandNo) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input("BrandID", sql.Int, brandNo)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Brand WHERE BrandID = @BrandID)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE IF EXISTS (SELECT 1 FROM Product WHERE BrandNo = @BrandID)
                    BEGIN
                        SELECT 'usedInProduct' AS Status
                    END
                    ELSE BEGIN
                        DELETE FROM Brand WHERE BrandID = @BrandID
                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordset[0].Status.toLowerCase();
            if (status === "notFound") return { notFound: true };
            if (status === "usedInProduct") return { usedInProduct: true };
            if (status === "success") return { success: true };

            throw new Error("Failed to delete brand");
        } catch (error) {
            console.error("Error deleting brand: ", error.message);
            throw new Error("Error deleting brand: " + error.message);
        }
    },

}

module.exports = brandModel;
