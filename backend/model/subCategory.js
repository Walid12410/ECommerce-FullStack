const { sql, poolPromise } = require("../config/connectToDB");


const subCategoryModel = {
    async getAllSubCategory() {
        try {
            const pool = poolPromise();

            const result = await pool.request()
                .query(`SELECT * FROM SubCategory`);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch sub category: ", error);
            throw error;
        }
    },

    async createSubCategory(SubCategoryName, CategoryNo) {
        try {
            const pool = await poolPromise();
    
            const result = await pool.request()
                .input('SubCategoryName', sql.NVarChar, SubCategoryName)
                .input('CategoryNo', sql.BigInt, CategoryNo)
                .query(`
                    IF EXISTS (SELECT 1 FROM SubCategory WHERE SubCategoryName=@SubCategoryName)
                    BEGIN
                        SELECT 'exists' AS Status
                    END
                    ELSE IF NOT EXISTS (SELECT 1 FROM Category WHERE CategoryNo=@CategoryNo)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN
                        INSERT INTO SubCategory (SubCategoryName, CategoryNo) VALUES (@SubCategoryName, @CategoryNo)
                        SELECT 'success' AS Status
                    END
                `);
                
            const status = result.recordset[0].Status;
    
            if (status === 'exists') return { exists: true };
            if (status === 'notFound') return { notFound: true };
            if (status === 'success') return { message: "SubCategory created successfully" };
    
            throw new Error("Failed to create subCategory");
    
        } catch (error) {
            console.error("Error fetching category: ", error);
            throw error;
        }
    },

    async updateSubCatgory (SubCategoryNo, SubCategoryName, CategoryNo) {
        try {
            const pool = await poolPromise();
    
            const result = await pool.request()
                .input('SubCategoryNo', sql.BigInt, SubCategoryNo)
                .input('SubCategoryName', sql.NVarChar, SubCategoryName)
                .input('CategoryNo', sql.BigInt, CategoryNo)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM SubCategory WHERE SubCategoryNo=@SubCategoryNo)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE IF EXISTS (SELECT 1 FROM SubCategory WHERE SubCategoryName=@SubCategoryName AND CategoryNo=@CategoryNo)
                    BEGIN
                        SELECT 'noChange' AS Status
                    END
                    ELSE BEGIN
                        UPDATE SubCategory SET SubCategoryName=@SubCategoryName, CategoryNo=@CategoryNo WHERE SubCategoryNo=@SubCategoryNo
                        SELECT 'success' AS Status
                    END
                `);
    
            const status = result.recordset[0].Status;
    
            if (status === 'notFound') return { notFound: true };
            if (status === 'noChange') return { noChange: true };
            if (status === 'success') return { message: "SubCategory updated successfully" };
    
            throw new Error("Failed to update subCategory");
    
        } catch (error) {
            console.error("Error fetching category: ", error);
            throw error;
        }
    },

    // TODO delete subCategory with checking if it use in product table
}

module.exports = subCategoryModel;