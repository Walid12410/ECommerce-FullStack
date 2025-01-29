const { sql, poolPromise } = require("../config/connectToDB");


const productModel = {

    async getProduct(page, limit) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('page', sql.Int, page)
                .input('limit', sql.Int, limit)
                .query(`SELECT * FROM ProductVW 
                    ORDER BY CreatedAt DESC 
                    OFFSET (@page-1)*@limit
                    ROWS FETCH NEXT @limit ROWS ONLY
                `);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch product: ", error);
            throw error;
        }
    },

    async getProductByCompany(page, limit, companyNo) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('page', sql.Int, page)
                .input('limit', sql.Int, limit)
                .input('companyNo', sql.Int, companyNo)
                .query(`SELECT * FROM ProductVW WHERE CompanyNo = @companyNo
                    ORDER BY CreatedAt DESC 
                    OFFSET (@page-1)*@limit
                    ROWS FETCH NEXT @limit ROWS ONLY
                `);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch product: ", error);
            throw error;
        }
    },

    async getProductByBrand(page, limit, brandNo) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('page', sql.Int, page)
                .input('limit', sql.Int, limit)
                .input('brandNo', sql.Int, brandNo)
                .query(`SELECT * FROM ProductVW WHERE BrandNo = @brandNo
                    ORDER BY CreatedAt DESC 
                    OFFSET (@page-1)*@limit
                    ROWS FETCH NEXT @limit ROWS ONLY
                `);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch product: ", error);
            throw error;
        }
    },

    async getProductByGender(page, limit, genderNo) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('page', sql.Int, page)
                .input('limit', sql.Int, limit)
                .input('genderNo', sql.Int, genderNo)
                .query(`SELECT * FROM ProductVW WHERE GenderNo = @genderNo
                    ORDER BY CreatedAt DESC 
                    OFFSET (@page-1)*@limit
                    ROWS FETCH NEXT @limit ROWS ONLY
                `);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch product: ", error);
            throw error;
        }
    },

    async getProductBySubCategory(page, limit, subCategoryNo) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('page', sql.Int, page)
                .input('limit', sql.Int, limit)
                .input('subCategoryNo', sql.Int, subCategoryNo)
                .query(`SELECT * FROM ProductVW WHERE SubCategoryNo = @subCategoryNo
                    ORDER BY CreatedAt DESC 
                    OFFSET (@page-1)*@limit
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
                .input('ColorNo', sql.Int, product.ColorNo)
                .input('BrandNo', sql.Int, product.BrandNo)
                .input('GenderNo', sql.Int, product.GenderNo)
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
                    ELSE IF NOT EXISTS (SELECT 1 FROM Color WHERE ColorID = @ColorNo)
                    BEGIN
                        SELECT 'colorNotFound' AS Status
                    END
                    ELSE IF NOT EXISTS (SELECT 1 FROM Brand WHERE BrandID = @BrandNo)
                    BEGIN
                        SELECT 'brandNotFound' AS Status
                    END
                    ELSE IF NOT EXISTS (SELECT 1 FROM Gender WHERE GenderID = @GenderNo)
                    BEGIN
                        SELECT 'genderNotFound' AS Status
                    END
                    ELSE BEGIN
                        INSERT INTO Product (CompanyNo, ProductName, ProductDesc, Price, Stock, SubCategoryNo, CreatedAt, ProductImage, ProductImageID, ColorNo, BrandNo, GenderNo)
                        VALUES (@CompanyNo, @ProductName, @ProductDesc, @Price, @Stock, @SubCategoryNo, @CreatedAt, @ProductImage, @ProductImageID, @ColorNo, @BrandNo, @GenderNo)

                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordsets[0][0].Status; // Get status result
            if (status === 'subCategoryNotFound') return { subCategoryNotFound: true };
            if (status === 'companyNotFound') return { companyNotFound: true };
            if (status === 'colorNotFound') return { colorNotFound: true };
            if (status === 'brandNotFound') return { brandNotFound: true };
            if (status === 'genderNotFound') return { genderNotFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to create product");


        } catch (error) {
            console.log("Error create product: ", error);
            throw error;
        }
    },

    async updateProduct(product) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('ProductNo', sql.Int, product.ProductNo)
                .input('ProductName', sql.NVarChar, product.ProductName)
                .input('ProductDesc', sql.NVarChar, product.ProductDesc)
                .input('Price', sql.Int, product.Price)
                .input('Stock', sql.Int, product.Stock)
                .input('SubCategoryNo', sql.Int, product.SubCategoryNo)
                .input('ColorNo', sql.Int, product.ColorNo)
                .input('BrandNo', sql.Int, product.BrandNo)
                .input('GenderNo', sql.Int, product.GenderNo)
                .query(`
                IF NOT EXISTS (SELECT 1 FROM SubCategory WHERE SubCategoryNo = @SubCategoryNo)
                BEGIN 
                    SELECT 'subCategoryNotFound' AS Status
                END
                ELSE IF NOT EXISTS (SELECT 1 FROM Color WHERE ColorID = @ColorNo)
                BEGIN
                    SELECT 'colorNotFound' AS Status
                END
                ELSE IF NOT EXISTS (SELECT 1 FROM Brand WHERE BrandID = @BrandNo)
                BEGIN
                    SELECT 'brandNotFound' AS Status
                END
                ELSE IF NOT EXISTS (SELECT 1 FROM Gender WHERE GenderID = @GenderNo)
                BEGIN
                    SELECT 'genderNotFound' AS Status
                END
                ELSE IF NOT EXISTS (SELECT 1 FROM Product WHERE ProductNo = @ProductNo)
                BEGIN
                    SELECT 'productNotFound' AS Status
                END
                ELSE BEGIN
                    UPDATE Product
                    SET ProductName = @ProductName, ProductDesc = @ProductDesc, Price = @Price, Stock = @Stock,
                    SubCategoryNo = @SubCategoryNo, BrandNo = @BrandNo, ColorNo = @ColorNo , GenderNo = @GenderNo
                    WHERE ProductNo = @ProductNo

                    SELECT 'success' AS Status
                END
            `);

            const status = result.recordsets[0][0].Status; // Get status result
            if (status === 'subCategoryNotFound') return { subCategoryNotFound: true };
            if (status === 'productNotFound') return { productNotFound: true };
            if (status === 'colorNotFound') return { colorNotFound: true };
            if (status === 'brandNotFound') return { brandNotFound: true };
            if (status === 'genderNotFound') return { genderNotFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to update product");

        } catch (error) {
            console.log("Error update product: ", error);
            throw error;
        }
    },

    async updateProductImage(product) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('ProductNo', sql.Int, product.ProductNo)
                .input('ProductImage', sql.NVarChar, product.ProductImage)
                .input('ProductImageID', sql.NVarChar, product.ProductImageID)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Product WHERE ProductNo = @ProductNo)
                    BEGIN
                        SELECT 'productNotFound' AS Status
                    END
                    ELSE BEGIN
                        UPDATE Product
                        SET ProductImage = @ProductImage, ProductImageID = @ProductImageID
                        WHERE ProductNo = @ProductNo

                        SELECT 'success' AS Status
                    END
            `);

            const status = result.recordsets[0][0].Status; // Get status result
            if (status === 'productNotFound') return { productNotFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Falid to update image");
        } catch (error) {
            console.log("Error check product: ", error);
            throw error;
        }
    },

    async checkProduct(productNo) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('ProductNo', sql.Int, productNo)
                .query(`SELECT * FROM OrderDetails WHERE ProductNo = @ProductNo`);

            if (result.recordset.length > 0) {
                return { productInOrder: true };
            } else {
                return { productNotFound: true };
            }
        } catch (error) {
            console.log("Error check product: ", error);
            throw error;
        }
    },

    // @TODO: check if product is in order or offer etc... then delete or send message
    async deleteProduct(productNo) {

    }

}

module.exports = productModel;