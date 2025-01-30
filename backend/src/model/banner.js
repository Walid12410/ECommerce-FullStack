const { sql, poolPromise } = require("../config/connectToDB");


const bannerModel = {
    async getBanners(currentTime) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('CurrentTime', sql.DateTime, currentTime)
                .query(`SELECT * FROM BannerVW WHERE
                    StartDate <= @CurrentTime AND EndDate = @CurrentTime
                    AND IsActive = 1
                `);

            return result.recordset;
        } catch (error) {
            console.log("Error fetch banners", error);
            throw error;
        }
    },

    async getOneBanner(bannerID) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('BannerID', sql.Int, bannerID)
                .query(`SELECT * FROM Banners WHERE BannerID = @BannerID
                `);

            return result.recordset[0];
        } catch (error) {
            console.log("Error fetch banners", error);
            throw error;
        }
    },

    async createBanner(banner) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('Title', sql.NVarChar, banner.title)
                .input('Description', sql.NVarChar, banner.desc)
                .input('ImageURL', sql.NVarChar, banner.imageUrl)
                .input('ImagePublicID', sql.NVarChar, banner.imageID)
                .input('StartDate', sql.DateTime, banner.startTime)
                .input('EndDate', sql.DateTime, banner.endTime)
                .input('IsActive', sql.Bit, banner.isActive)
                .input('SubCategoryNo', sql.Int, banner.subCategory)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM SubCategory WHERE SubCategoryNo = @SubCategoryNo)
                    BEGIN
                        SELECT 'subCategoryNotFound' AS Status
                    END
                    ELSE BEGIN
                        INSERT INTO Banners (Title, Description, ImageURL, ImagePublicID, StartDate, EndDate, IsActive, SubCategoryNo)
                        VALUES (@Title, @Description, @ImageURL, @ImagePublicID, @StartDate, @EndDate, @IsActive, @SubCategoryNo)

                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordset[0][0].Status;

            if (status === 'subCategoryNotFound') return { subCategoryNotFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Falid to create new banner");
        } catch (error) {
            console.log("Falid to create banner", error);
            throw error;
        }
    },

    async updateBanner(banner) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('BannerID', sql.Int, banner.id)
                .input('Title', sql.NVarChar, banner.title)
                .input('Description', sql.NVarChar, banner.desc)
                .input('StartDate', sql.DateTime, banner.startTime)
                .input('EndDate', sql.DateTime, banner.endTime)
                .input('IsActive', sql.Bit, banner.isActive)
                .input('SubCategoryNo', sql.Int, banner.subCategory)
                .query(`
                IF NOT EXISTS (SELECT 1 FROM SubCategory WHERE SubCategoryNo = @SubCategoryNo)
                BEGIN
                    SELECT 'subCategoryNotFound' AS Status
                END
                ELSE BEGIN
                    UPDATE Banners SET Title = @Title, Description = @Description, 
                    StartDate = @StartDate, EndDate = @EndDate, IsActive= @IsActive,
                    SubCategoryNo = @SubCategoryNo WHERE BannerID = @BannerID

                    SELECT 'success' AS Status
                END
            `);

            const status = result.recordset[0][0].Status;

            if (status === 'subCategoryNotFound') return { subCategoryNotFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Falid to update  banner");

        } catch (error) {
            console.log("Falid to update banner", error);
            throw error;
        }
    },

    async updateBannerImage(banner) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('BannerID', sql.Int, banner.BannerID)
                .input('ImageURL', sql.Bit, banner.ImageURL)
                .input('ImagePublicID', sql.Int, banner.ImagePublicID)
                .query(`
                IF NOT EXISTS (SELECT 1 FROM Banners WHERE BannerID = @BannerID)
                BEGIN
                    SELECT 'notFound' AS Status
                END
                ELSE BEGIN
                    UPDATE Banners SET ImageURL = @ImageURL, ImagePublicID = @ImagePublicID
                    WHERE BannerID = @BannerID

                    SELECT 'success' AS Status
                END
            `);

            const status = result.recordset[0][0].Status;

            if (status === 'notFound') return { notFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Falid to update banner image");

        } catch (error) {
            console.log("Falid to update banner", error);
            throw error;
        }
    },


    async deleteBanner(BannerID) {
        try {
            const pool = await poolPromise();

            const result = await pool.request()
                .input('BannerID', sql.Int, BannerID)
                .query(`
                    IF NOT EXISTS (SELECT 1 FROM Banners WHERE BannerID = @BannerID )
                    BEGIN
                        SELECT 'notFound' AS Status
                    END
                    ELSE BEGIN
                        DELETE FROM Banners WHERE BannerID = @BannerID

                        SELECT 'success' AS Status
                    END
                `);

            const status = result.recordset[0][0].Status;

            if (status === 'notFound') return { notFound: true };
            if (status === 'success') return { success: true };

            throw new Error("Falid to delete banner");

        } catch (error) {
            console.log("Falid to delete banner", error);
            throw error;
        }
    }
}


module.exports = bannerModel;
