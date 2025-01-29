const { sql, poolPromise } = require("../config/connectToDB");


const categoryModel = {
    async getAllCategory() {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .query(`SELECT * FROM Category`);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch category: ", error);
            throw error;
        }
    },

    async getAllCategoryAndSubCategory() {
        try {
            const pool = await poolPromise();
    
            const result = await pool.request()
                .query(`
                    SELECT 
                        'Category&SubCategory' AS CustomKey,  -- This is your new key name
                        (
                            SELECT 
                                c.CategoryNo, 
                                c.CategoryName, 
                                (
                                    SELECT 
                                        s.SubCategoryNo, 
                                        s.SubCategoryName 
                                    FROM 
                                        SubCategory s 
                                    WHERE 
                                        s.CategoryNo = c.CategoryNo 
                                    FOR JSON PATH
                                ) AS SubCategories
                            FROM 
                                Category c
                            FOR JSON PATH
                        ) AS categoryjson
                `);
    
            // Returning the JSON of categories and subcategories
            return result.recordset[0].categoryjson;
        } catch (error) {
            console.log("Error fetching categories: ", error);
            throw error;  // Propagate the error to handle it further up the call stack
        }
    },
    

    async createCategory(categoryName) {
        try {
            const pool = await poolPromise();
    
            // Insert the new category and check if exists
            const result = await pool.request()
                .input('CategoryName', sql.NVarChar, categoryName)
                .query(`
                    IF EXISTS (SELECT 1 FROM Category WHERE CategoryName=@CategoryName)
                    BEGIN
                        SELECT 'exists' AS Status
                    END
                    ELSE BEGIN
                        INSERT INTO Category (CategoryName) VALUES (@CategoryName)
                        SELECT 'success' AS Status
                    END
                `);
    
            const status = result.recordset[0].Status;
    
            if (status === 'exists') return { exists: true };
            if (status === 'success') return { message: "Category created successfully" };
    
            throw new Error("Failed to create category");
        } catch (error) {
            console.error("Error creating new category:", error);
            throw error;
        }
    },
    

    async updateCategory(categoryNo, categoryName) {
        try {
            const pool = await poolPromise();
    
            // Perform the update and get updated category details
            const result = await pool.request()
                .input('CategoryNo', sql.BigInt, categoryNo)
                .input('CategoryName', sql.NVarChar, categoryName)
                .query(`
                    IF EXISTS (SELECT 1 FROM Category WHERE CategoryName=@CategoryName)
                    BEGIN
                        SELECT 'noChange' AS Status
                    END
                    ELSE IF NOT EXISTS (SELECT 1 FROM Category WHERE CategoryNo=@CategoryNo)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN
                        UPDATE Category SET CategoryName=@CategoryName WHERE CategoryNo=@CategoryNo;
                        SELECT 'success' AS Status;
    
                        -- Fetch the updated category details
                        SELECT CategoryNo, CategoryName FROM Category WHERE CategoryNo=@CategoryNo;
                    END
                `);
            
            const status = result.recordsets[0][0].Status; // Get status result
            if (status === 'noChange') return { noChange: true };
            if (status === 'notFound') return { notFound: true };
            if (status === 'success') {
                const updatedCategory = result.recordsets[1][0]; // Get updated category data
                return { message: "Category updated successfully", updatedCategory };
            }
    
            throw new Error("Failed to update category");
    
        } catch (error) {
            console.error("Error updating category:", error);
            throw error;
        }
    },
    

    async deleteCategory(categoryNo) {
        try {
            const pool = await poolPromise();

            // Check if the category exists then delete
            const result = await pool.request()
                .input('CategoryNo', sql.BigInt, categoryNo)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Category WHERE CategoryNo=@CategoryNo)
                    BEGIN
                      SELECT 'notFound' AS Status
                    END
                    ELSE IF EXISTS (SELECT 1 FROM SubCategory WHERE CategoryNo=@CategoryNo)
                    BEGIN
                      SELECT 'hasSubCategory' AS Status
                    END
                    ELSE BEGIN
                      DELETE FROM Category WHERE CategoryNo=@CategoryNo;
                      SELECT 'success' AS Status
                    END
                `);

            const status = result.recordset[0].Status;

            if(status === 'notFound') return { notFound : true };
            if(status === 'hasSubCategory') return { hasSubCategory : true };
            if(status === 'success') return { message : "Category deleted successfully" };

            throw new Error("Failed to delete category");

        } catch (error) {
            console.error("Error deleting category:", error.message);
            throw error;
        }
    }
}

module.exports = categoryModel;