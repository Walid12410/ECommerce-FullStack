const { sql, poolPromise } = require("../config/connectToDB");


const genderModel = {
    async getGender() {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .query(`SELECT * FROM Gender`);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch gender ", error);
            throw error;
        }
    },

    async createGender(data) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input("Gender", sql.NVarChar, data.name)
                .input("ImageURL",sql.NVarChar,data.imageUrl)
                .input("ImagePublicID",sql.NVarChar,data.imageId)
                .query(`
                    IF EXISTS (SELECT * FROM Gender WHERE Gender= @Gender)
                    BEGIN
                        SELECT 'exists' AS Status
                    END
                    ELSE BEGIN
                        INSERT INTO Gender (Gender, ImageURL, ImagePublicID) VALUES (@Gender, @ImageURL, ImagePublicID)

                        SELECT 'success' AS Status
                `);

            const status = result.recordset[0].Status;
            if (status === 'exists') return { exists: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to create gender");

        } catch (error) {
            console.log("Error create gender: ", error);
            throw error;
        }
    },

    async updateGender(gender) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input("GenderID", sql.Int, gender.id)
                .input("Gender", sql.NVarChar, gender.name)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Gender WHERE GenderID = @GenderID)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN
                        UPDATE Gender SET Gender = @Gender WHERE GenderID = @GenderID

                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordset[0].Status;
            if (status === 'notFound') return { notFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to update gender");
        } catch (error) {
            console.log("Error update gender", error);
            throw error;
        }
    },

    async deleteGender(GenderID) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('GenderID', sql.Int, GenderID)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Gender WHERE GenderID = @GenderID)
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    IF EXISTS (SELECT 1 FROM Product WHERE GenderNo = @GenderID)
                    BEGIN
                        SELECT 'usedInProduct' AS Status
                    END
                    ELSE BEGIN
                        DELETE Gender WHERE GenderID = @GenderID

                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordset[0].Status.toLowerCase();
            if (status === "notFound") return { notFound: true };
            if (status === "usedInProduct") return { usedInProduct: true };
            if (status === "success") return { success: true };

            throw new Error("Failed to delete gender");
        } catch (error) {
            console.error("Error deleting gender: ", error.message);
            throw new Error("Error deleting gender: " + error.message);
        }
    }
}

module.exports = genderModel;