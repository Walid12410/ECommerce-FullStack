const { sql, poolPromise } = require("../config/connectToDB");
const bcrypt = require('bcrypt');

const userModel = {
    async createUser(data) {
        try {
            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(data.password, 10);

            // Get the connection pool
            const pool = await poolPromise();

            // Use parameterized query to avoid SQL injection
            const result = await pool.request()
                .input('UserName', sql.NVarChar, data.UserName)
                .input('Email', sql.NVarChar, data.Email)
                .input('Password', sql.NVarChar, hashedPassword)
                .input('PhoneNumber', sql.NVarChar, data.PhoneNumber)
                .query('INSERT INTO Users(UserName, Email, Password, PhoneNumber) VALUES (@UserName, @Email, @Password, @PhoneNumber)');

            return result.rowsAffected;  // Returns the number of rows affected
        } catch (error) {
            console.error('Error create users:', error); // Log the error
            throw error;  // Propagate the error
        }
    },

    async updateUser(data) {
        try {
            const pool = await poolPromise();
    
            // Execute the update query
            const result = await pool.request()
                .input('UserName', sql.NVarChar, data.UserName)
                .input('PhoneNumber', sql.NVarChar, data.PhoneNumber)
                .input('UserNo', sql.BigInt, data.UserNo)
                .query('UPDATE Users SET UserName=@UserName, PhoneNumber=@PhoneNumber WHERE UserNo=@UserNo');
    
            // If no rows were affected, the user was not found or updated
            if (result.rowsAffected[0] === 0) {
                throw new Error('User not found or no changes made');
            }
    
            // Fetch the updated user details from the database
            const updatedUser = await pool.request()
                .input('UserNo', sql.NVarChar, data.UserNo)
                .query('SELECT UserNo, UserName, Email, PhoneNumber, IsAdmin, IsActive, CreatedAt FROM Users WHERE UserNo=@UserNo');
    
            // Return the updated user details
            return updatedUser.recordset[0]; // Return the first (and only) user object
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;  // Propagate the error
        }
    },

    async getUserById(id) {
        try {
            const pool = await poolPromise();

            // Use parameterized query to avoid SQL injection
            const result = await pool.request()
                .input('UserNo', sql.Int, id)
                .query('SELECT * FROM Users WHERE UserNo = @UserNo');

            // return the first record if found , otherwise undefined or null
            return result.recordset[0];
        } catch (error) {
            console.error('Error fetching user by email:', error); // Log the error
            throw error;
        }
    },

    async getUserByEmail(email) {
        try {
            const pool = await poolPromise();

            // Use parameterized query to avoid SQL injection
            const result = await pool.request()
                .input('Email', sql.NVarChar, email)
                .query(`SELECT * FROM Users WHERE Email = @Email`);

            // return the first record if found , otherwise undefined or null
            return result.recordset[0];
        } catch (error) {
            console.error('Error fetching user by email:', error); // Log the error
            throw error;
        }
    },

    async getUsers(page, limit) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('page', sql.BigInt, page)   // Input page number
                .input('limit', sql.BigInt, limit) // Input limit
                .query(`
                    SELECT UserNo, UserName, Email, PhoneNumber, IsAdmin, IsActive, CreatedAt 
                    FROM Users
                    ORDER BY CreatedAt
                    OFFSET (@page - 1) * @limit ROWS
                    FETCH NEXT @limit ROWS ONLY
                `);

            return result.recordset;
        } catch (error) {
            console.error('Error fetching users:', error); // Log the error
            throw error; // Re-throw the error for upstream handling
        }
    },

    async getAllUser() {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .query(`
                    SELECT UserNo, UserName, Email, PhoneNumber, IsAdmin, IsActive, CreatedAt
                    FROM Users
                `);

            return result.recordset;
        } catch (error) {
            console.error('Error fetching users:', error); // Log the error
            throw error; // Re-throw the error for upstream handling
        }
    },

    async countUsers() {
        try {
            const pool = await poolPromise();
    
            const result = await pool.request()
                .query(`
                    SELECT COUNT(*) AS UserCount
                    FROM Users
                `);
    
            return result.recordset[0].UserCount; // Return the count of users
        } catch (error) {
            console.error('Error counting users:', error); // Log the error
            throw error; // Re-throw the error for upstream handling
        }
    }
    
};


module.exports = userModel;

