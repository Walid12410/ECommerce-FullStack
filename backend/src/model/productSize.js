const { sql, poolPromise } = require("../config/connectToDB");

const productSizeModel = {

    async getAllProductSize(id) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('id', sql.Int, id)
                .query(`SELECT * FROM ProductSize WHERE ProductNo = @id`);
    
            return result.recordset;
        
        } catch (error) {
            console.log(error);
            throw error;        
        }
    },

    async createProductSize(data) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('ProductNo', sql.Int, data.ProductNo)
                .input('SizeValue', sql.NVarChar, data.SizeValue)
                .input('Quantity', sql.Int, data.Quantity)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Product WHERE ProductNo = @ProductNo)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN 
                        INSERT INTO ProductSize (ProductNo, SizeValue, Quantity) VALUES (@ProductNo, @SizeValue, @Quantity)
                        SELECT 'success' AS Status
                    END
                `);
            const status = result.recordsets[0][0].Status; // Get status result

            if(status === 'notFound') return { notFound: true };
            if(status === 'success') return { success: true };

            throw new Error("Falid to create product size");
        } catch (error) {
            throw error;
        }
    },

    async updateProductSize(data) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('ProductSizeNo', sql.Int, data.ProductSizeNo)
                .input('SizeValue', sql.NVarChar, data.Size)
                .input('Quantity', sql.Int, data.Quantity)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM ProductSize WHERE ProductSizeNo = @ProductSizeNo)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN 
                        UPDATE ProductSize SET SizeValue = @SizeValue, Quantity = @Quantity WHERE ProductSizeNo = @ProductSizeNo
                        SELECT 'success' AS Status
                    END    
                `);

            const status = result.recordsets[0][0].Status; // Get status result
            if(status === 'notFound') return {notFound: true};
            if(status === 'success') return {success: true};

            throw new Error("Falid to update product size");
        } catch (error) {
            throw error;
        }
    },

    async deleteProductSize(id) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('id', sql.Int, id)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM ProductSize WHERE ProductSizeNo = @id)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN 
                        DELETE FROM ProductSize WHERE ProductSizeNo = @id
                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordsets[0][0].Status; // Get status result
            if(status === 'notFound') return {notFound: true};
            if(status === 'success') return {success: true};

            throw new Error("Falid to delete product size");
        } catch (error) {
            throw error;
        }
    }
}


module.exports = productSizeModel;