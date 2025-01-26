const { sql, poolPromise } = require("../config/connectToDB");


const productModel = {

    async getAllProduct(page,limit) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('page', sql.Int, page)
                .input('limit', sql.Int, limit)
                .query(`SELECT * FROM Product 
                    ORDER BY ProductNo OFFSET (@page-1)*@limit
                    ROWS FETCH NEXT @limit ROWS ONLY
                `);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch product: ", error);    
            throw error;
        }
    },

    async getAllProductByCompany(page,limit,companyNo) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('page', sql.Int, page)
                .input('limit', sql.Int, limit)
                .input('companyNo', sql.Int, companyNo)
                .query(`SELECT * FROM Product WHERE CompanyNo = @companyNo
                    ORDER BY ProductNo OFFSET (@page-1)*@limit
                    ROWS FETCH NEXT @limit ROWS ONLY
                `);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch product: ", error);
            throw error;
        }
    },

    async getAllProductBySubCategory(page,limit,subCategoryNo) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('page', sql.Int, page)
                .input('limit', sql.Int, limit)
                .input('subCategoryNo', sql.Int, subCategoryNo)
                .query(`SELECT * FROM Product WHERE SubCategoryNo = @subCategoryNo
                    ORDER BY ProductNo OFFSET (@page-1)*@limit
                    ROWS FETCH NEXT @limit ROWS ONLY
                `);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch product: ", error);
            throw error;
        }
    },

    async getOneProduct(productNo) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('productNo', sql.Int, productNo)
                .query(`SELECT * FROM ProductDetailsVW WHERE ProductNo = @productNo`);

            return result.recordset[0];
        } catch (error) {
           console.log("Error fetch product: ", error);
           throw error; 
        }
    },

    async createProduct(product) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('CompanyNo', sql.Int, product.CompanyNo)
                .input('ProductName', sql.NVarChar, product.ProductName)
                .input('ProductDesc', sql.NVarChar, product.ProductDesc)
                .input('Price', sql.Int, product.Price)
                .input('Stock', sql.Int, product.Stock)
                .input('SubCategoryNo', sql.Int, product.SubCategoryNo)
                .input('CreatedAt', sql.DateTime, product.CreatedAt)
                .input('ProductImage', sql.NVarChar, product.ProductImage)
                .input('ProductImageID', sql.NVarChar, product.ProductImageID)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM SubCategory WHERE SubCategoryNo = @SubCategoryNo)
                    BEGIN
                        SELECT 'subCategoryNotFound' AS Status
                    END
                    ELSE IF NOT EXISTS (SELECT 1 FROM Company WHERE CompanyNo = @CompanyNo)
                    BEGIN
                        SELECT 'companyNotFound' AS Status
                    END
                    ELSE BEGIN
                        INSERT INTO Product (CompanyNo, ProductName, ProductDesc, Price, Stock, SubCategoryNo, CreatedAt, ProductImage, ProductImageID)
                        VALUES (@CompanyNo, @ProductName, @ProductDesc, @Price, @Stock, @SubCategoryNo, @CreatedAt, @ProductImage, @ProductImageID)

                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordsets[0][0].Status; // Get status result
            if (status === 'subCategoryNotFound') return { subCategoryNotFound: true };
            if (status === 'companyNotFound') return { companyNotFound: true };
            if (status === 'success') return { success : true};

        } catch (error) {
            console.log("Error create product: ", error);
            throw error;
        }
    },

    async updateProduct(product){

    },

    async deleteProduct(productNo) {

    }

}

module.exports = productModel;