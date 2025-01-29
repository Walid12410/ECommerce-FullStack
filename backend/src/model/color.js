const { sql, poolPromise } = require("../config/connectToDB");


const colorModel = {
    async getColor() {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .query(`SELECT * FROM Color`);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch color ", error);
            throw error;
        }
    },

    async createColor(colorName) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input("ColorName", sql.NVarChar, colorName)
                .query(`
                    IF EXISTS (SELECT * FROM Color WHERE ColorName = @ColorName)
                    BEGIN
                        SELECT 'exists' AS Status
                    END
                    ELSE BEGIN
                        INSERT INTO Color (ColorName) VALUES (@ColorName)

                        SELECT 'success' AS Status
                `);

            const status = result.recordset[0].Status;
            if (status === 'exists') return { exists: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to create color");

        } catch (error) {
            console.log("Error create color: ", error);
            throw error;
        }
    },

    async updateColor(color){
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input("ColorID",sql.Int,color.id)
                .input("ColorName",sql.NVarChar,color.name)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Color WHERE ColorID = @ColorID)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN
                        UPDATE Color SET ColorName = @ColorName WHERE ColorID = @ColorID

                        SELECT 'success' AS Status
                    END
                `);
            
            const status = result.recordset[0].Status;
            if (status === 'notFound') return { notFound: true };
            if (status === 'success') return { success: true };
    
            throw new Error("Failed to update color");
        } catch (error) {
            console.log("Error update color", error);
            throw error;
        }
    },

    async deleteColor(ColorID){
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('ColorID',sql.Int,ColorID)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Color WHERE ColorID = @ColorID)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    IF EXISTS (SELECT 1 FROM Product WHERE ColorNo = @ColorID)
                    BEGIN
                        SELECT 'usedInProduct' AS Status
                    END
                    ELSE BEGIN
                        DELETE Color WHERE ColorID = @ColorID

                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordset[0].Status.toLowerCase();
            if (status === "notFound") return { notFound: true };
            if (status === "usedInProduct") return { usedInProduct: true };
            if (status === "success") return { success: true };
    
            throw new Error("Failed to delete color");
        } catch (error) {
            console.error("Error deleting color: ", error.message);
            throw new Error("Error deleting color: " + error.message);
        }
    }
}

module.exports = colorModel;