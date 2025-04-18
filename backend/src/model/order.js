const { sql, poolPromise } = require("../config/connectToDB");

const orderModel = {
    async createOrder(order) {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .input('UserNo', sql.Int, order.UserNo)
                .input('TotalAmount', sql.Decimal(10, 2), order.TotalAmount)
                .input('Status', sql.NVarChar(50), order.Status)
                .query(`
                    INSERT INTO Orders (UserNo, OrderDate, TotalAmount, Status)
                    OUTPUT INSERTED.OrderNo
                    VALUES (@UserNo, GETDATE(), @TotalAmount, @Status)
                `);

            return result.recordset[0].OrderNo;
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    },

    async createOrderDetails(orderDetails) {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .input('OrderNo', sql.Int, orderDetails.OrderNo)
                .input('ProductNo', sql.Int, orderDetails.ProductNo)
                .input('ProductPrice', sql.Decimal(10, 2), orderDetails.ProductPrice)
                .input('ProductQty', sql.Int, orderDetails.ProductQty)
                .query(`
                    INSERT INTO OrderDetails (OrderNo, ProductNo, ProductPrice, ProductQty)
                    VALUES (@OrderNo, @ProductNo, @ProductPrice, @ProductQty)
                `);

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("Error creating order details:", error);
            throw error;
        }
    },

    async getOrdersByUser(userNo, page = 1, limit = 10) {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .input('UserNo', sql.Int, userNo)
                .input('page', sql.Int, page)
                .input('limit', sql.Int, limit)
                .query(`
                    WITH OrderCTE AS (
                        SELECT 
                            o.*,
                            ROW_NUMBER() OVER (ORDER BY o.OrderDate DESC) AS RowNum
                        FROM Orders o
                        WHERE o.UserNo = @UserNo
                    )
                    SELECT 
                        o.*,
                        (SELECT COUNT(*) FROM OrderCTE) AS TotalCount
                    FROM OrderCTE o
                    WHERE RowNum BETWEEN ((@page - 1) * @limit + 1) AND (@page * @limit)
                    ORDER BY o.OrderDate DESC
                `);

            if (result.recordset.length === 0) {
                return {
                    orders: [],
                    totalCount: 0,
                    currentPage: page,
                    totalPages: 0
                };
            }

            const totalCount = result.recordset[0].TotalCount;
            const totalPages = Math.ceil(totalCount / limit);
            
            const orders = result.recordset.map(({ TotalCount, ...rest }) => rest);

            return {
                orders,
                totalCount,
                currentPage: page,
                totalPages
            };
        } catch (error) {
            console.error("Error getting orders:", error);
            throw error;
        }
    },

    async getOrderDetails(orderNo) {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .input('OrderNo', sql.Int, orderNo)
                .query(`
                    SELECT 
                        od.*,
                        p.ProductName,
                        p.ProductImage,
                        p.BrandName,
                        p.CategoryName,
                        p.SubCategoryName
                    FROM OrderDetails od
                    JOIN ProductDetailsVW p ON od.ProductNo = p.ProductNo
                    WHERE od.OrderNo = @OrderNo
                `);

            return result.recordset;
        } catch (error) {
            console.error("Error getting order details:", error);
            throw error;
        }
    },

    async updateOrderStatus(orderNo, status) {
        try {
            const pool = await poolPromise();
            const result = await pool.request()
                .input('OrderNo', sql.Int, orderNo)
                .input('Status', sql.NVarChar(50), status)
                .query(`
                    UPDATE Orders
                    SET Status = @Status
                    WHERE OrderNo = @OrderNo
                `);

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("Error updating order status:", error);
            throw error;
        }
    },

    async getAllOrders(page = 1, limit = 10, status = null) {
        try {
            const pool = await poolPromise();
            const offset = (page - 1) * limit;
            
            let query = `
                SELECT 
                    o.*,
                    u.UserName,
                    u.Email,
                    COUNT(*) OVER() as TotalCount
                FROM Orders o
                JOIN Users u ON o.UserNo = u.UserNo
            `;
            
            if (status) {
                query += ` WHERE o.Status = @Status`;
            }
            
            query += `
                ORDER BY o.OrderDate DESC
                OFFSET @Offset ROWS
                FETCH NEXT @Limit ROWS ONLY
            `;
            
            const request = pool.request()
                .input('Offset', sql.Int, offset)
                .input('Limit', sql.Int, limit);
                
            if (status) {
                request.input('Status', sql.NVarChar(50), status);
            }
            
            const result = await request.query(query);
            
            return {
                orders: result.recordset,
                totalCount: result.recordset[0]?.TotalCount || 0
            };
        } catch (error) {
            console.log("Error getting all orders: ", error);
            throw error;
        }
    }
};

module.exports = orderModel; 