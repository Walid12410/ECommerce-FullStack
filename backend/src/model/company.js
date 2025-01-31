const { sql, poolPromise } = require("../config/connectToDB");


const companyModel = {
    async getAllCompany() {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .query(`SELECT * FROM Company`);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch company", error);
            throw error;
        }
    },

    async createCompany(company) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('CompanyName', sql.NVarChar, company.name)
                .input('CompanyEmail', sql.NVarChar, company.email)
                .input('CompanyNumber', sql.NVarChar, company.number)
                .input('CompanyLocation', sql.NVarChar, company.location)
                .input('CompanyImage', sql.NVarChar, company.image)
                .input('CompanyImageID', sql.NVarChar, company.imageID)
                .input('Description', sql.NVarChar, company.desc)
                .query(`
                    IF EXISTS (SELECT 1 FROM Company WHERE CompanyEmail = @CompanyEmail)
                    BEGIN
                        SELECT 'exists' AS Status
                    END
                    ELSE BEGIN
                        INSERT INTO Company (CompanyName, CompanyEmail, CompanyNumber, CompanyLocation, CompanyImage, CompanyImageID, Description )
                        VALUES (@CompanyName, @CompanyEmail, @CompanyNumber, @CompanyLocation, @CompanyImage, @CompanyImageID, @Description)

                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordset[0].Status;
            if (status === 'exists') return { exists: true };
            if (status === 'success') return { success: true };

            throw new Error("Failed to create company");
        } catch (error) {
            console.log("Error create company", error);
            throw error;
        }
    },


    // @TODO: MAKE THE DELETE AND REMOVE COMPANY PRODUCT, Offer and order history
}

module.exports = companyModel;