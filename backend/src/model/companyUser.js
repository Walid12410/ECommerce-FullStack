const { sql, poolPromise } = require("../config/connectToDB");
const bcrypt = require('bcrypt');

const companyUserModel = {
    async createUser(user) {
        try {
            const hashedPassword = await bcrypt.hash(user.Password, 10);

            const pool = await poolPromise();

            const result = await pool.request()
                .input('FullName', sql.NVarChar, user.FullName)
                .input('Email', sql.NVarChar, user.Email)
                .input('Password', sql.NVarChar, hashedPassword)
                .input('CompanyNo', sql.Int, user.CompanyNo)
                .query(`
                    IF EXISTS (SELECT 1 FROM CompanyUser WHERE Email = @Email)
                    BEGIN
                        SELECT 'exists' AS Status
                    END
                    ELSE IF NOT EXISTS (SELECT 1 FROM Company WHERE CompanyNo = @CompanyNo)
                    BEGIN
                        SELECT 'companyNotFound' AS Status
                    END
                    ELSE
                    BEGIN
                        INSERT INTO CompanyUser (FullName, Email, Password, CompanyNo)
                        VALUES (@FullName, @Email, @Password, @CompanyNo)
                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordset[0].Status;
            if (status === 'exists') return { exists: true };
            if (status === 'companyNotFound') return { companyNotFound: true };
            if (status === 'success') return { success: true };

           // throw new Error("Failed to create user");
        } catch (error) {
            console.log("Falid to create user: ", error);
            throw error;
        }
    },

    async getUserByEmail(email) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('Email', sql.NVarChar, email)
                .query('SELECT * FROM CompanyUser WHERE Email = @Email');

            return result.recordset[0];
        } catch (error) {
            console.log("Falid to get user: ", error);
            throw error;
        }
    },

    async getUserByCompanyId(id) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('CompanyNo', sql.BigInt, id)
                .query(`SELECT UserNo, FullName, Email,
                    Password, CompanyNo FROM CompanyUser WHERE CompanyNo = @CompanyNo
                `);

            return result.recordset[0];
        } catch (error) {
            console.log("Falid to get user: ", error);
            throw error;
        }
    }

}


module.exports = companyUserModel;