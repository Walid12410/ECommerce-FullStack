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

    async searchProducts(query, page = 1, limit = 10, companyNo = null, brandNo = null) {
        try {
            const pool = await poolPromise();
    
            const result = await pool.request()
                .input('query', sql.NVarChar, `%${query}%`)
                .input('page', sql.Int, page)
                .input('limit', sql.Int, limit)
                .input('companyNo', sql.Int, companyNo)
                .input('brandNo', sql.Int, brandNo)
                .query(`
                    WITH SearchResults AS (
                        SELECT 
                            p.*,
                            c.CompanyName,
                            b.BrandName,
                            sc.SubCategoryName,
                            cat.CategoryName,
                            ROW_NUMBER() OVER (ORDER BY 
                                CASE 
                                    WHEN p.ProductName LIKE @query THEN 1
                                    WHEN p.ProductDesc LIKE @query THEN 2
                                    WHEN b.BrandName LIKE @query THEN 3
                                    WHEN cat.CategoryName LIKE @query THEN 4
                                    ELSE 5
                                END,
                                p.CreatedAt DESC
                            ) AS RowNum
                        FROM Product p WITH (NOLOCK)
                        LEFT JOIN Company c WITH (NOLOCK) ON p.CompanyNo = c.CompanyNo
                        LEFT JOIN Brand b WITH (NOLOCK) ON p.BrandNo = b.BrandID
                        LEFT JOIN SubCategory sc WITH (NOLOCK) ON p.SubCategoryNo = sc.SubCategoryNo
                        LEFT JOIN Category cat WITH (NOLOCK) ON sc.CategoryNo = cat.CategoryNo
                        WHERE (p.ProductName LIKE @query 
                            OR p.ProductDesc LIKE @query
                            OR b.BrandName LIKE @query
                            OR cat.CategoryName LIKE @query)
                            ${companyNo ? 'AND p.CompanyNo = @companyNo' : ''}
                            ${brandNo ? 'AND p.BrandNo = @brandNo' : ''}
                    )
                    SELECT 
                        ProductNo,
                        ProductName,
                        ProductDesc,
                        Price,
                        Stock,
                        ProductImage,
                        CompanyName,
                        BrandName,
                        SubCategoryName,
                        CategoryName,
                        CreatedAt,
                        (SELECT COUNT(*) FROM SearchResults) AS TotalCount
                    FROM SearchResults
                    WHERE RowNum BETWEEN ((@page - 1) * @limit + 1) AND (@page * @limit)
                    ORDER BY RowNum
                `);
    
            if (result.recordset.length === 0) {
                return {
                    products: [],
                    totalCount: 0,
                    currentPage: page,
                    totalPages: 0
                };
            }

            const totalCount = result.recordset[0].TotalCount;
            const totalPages = Math.ceil(totalCount / limit);
            
            // Remove TotalCount from each product
            const products = result.recordset.map(({ TotalCount, ...rest }) => rest);
    
            return {
                products,
                totalCount,
                currentPage: page,
                totalPages
            };
        } catch (error) {
            console.error("Error searching products:", error);
            throw new Error("Failed to search products. Please try again later.");
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

    },

    async countProduct() {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .query(`SELECT COUNT(*) AS ProductCount FROM Product`);

            return result.recordset[0].ProductCount;
        } catch (error) {
            console.error('Error counting products:', error); // Log the error
            throw error; // Re-throw the error for upstream handling

        }
    }

}

module.exports = productModel;