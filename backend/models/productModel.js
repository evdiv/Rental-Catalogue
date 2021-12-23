const execute = require('../db')

const getAll = async () => {
    const sql = `SELECT productsID, brandID, brandName, productName, productDescription, productSku, productModel, image1, stockAvail,
                    featured, onSale, rentalRate, reviewCount
                    FROM products 
                    WHERE active = 1 
                    AND rentalRate > 0 
                    LIMIT 30`;
    const rows = await execute(sql)
    if (!rows[0]) {
        throw Error("Products are not found")
    }
    return rows
}

const getByID = async (id) => {
    id = id || 0
    const sql = `SELECT productsID, brandID, brandName, productName, productDescription, productSku, productModel, image1, stockAvail,
                    featured, onSale, rentalRate, reviewCount
                    FROM products 
                    WHERE active = 1 
                    AND productsID = ?`;
    const params = [id]
    const rows = await execute(sql, params)

    if (!rows[0]) {
        throw Error("Product is not found")
    }
    return rows[0]
}

const getFeatured = async() => {
    const sql = `SELECT productsID, brandID, brandName, productName, productDescription, productSku, productModel, image1, stockAvail, 
                    rentalRate, reviewCount, reviewCount
                    FROM products 
                    WHERE active = 1 
                    AND rentalRate > 0 
                    AND featured = 1 
                    LIMIT 6`;
    const rows = await execute(sql)
    if (!rows[0]) {
        throw Error("Featured products are not found")
    }
    return rows
}

const getOnSale = async () => {
    const sql = `SELECT productsID, brandID, brandName, productName, productDescription, productSku, productModel, image1, stockAvail, 
                    rentalRate, reviewCount
                    FROM products 
                    WHERE active = 1 
                    AND rentalRate > 0 
                    AND onSale = 1 
                    LIMIT 6`;
    const rows = await execute(sql)

    if (!rows[0]) {
        throw Error("On Sale products are not found")
    }
    return rows
}

const getByBrandID = async(id) => {
    id = id || 0
    const sql = `SELECT productsID, brandID, brandName, productName, productDescription, productSku, productModel, image1, stockAvail,
                    featured, reviewCount, onSale, rentalRate
                    FROM products 
                    WHERE active = 1 
                    AND rentalRate > 0 
                    AND brandID = ?`;
    const params = [id]
    const rows = await execute(sql, params)

    if (!rows[0]) {
        throw Error("Products are not found")
    }
    return rows
}

const getByDepartmentID = async (id) => {
    id = id || 0
    const sql = `SELECT p.productsID, p.brandID, p.brandName, p.productName, p.productDescription, 
                    p.productSku, p.productModel, p.image1, p.stockAvail, p.featured, p.reviewCount, 
                    p.onSale, p.rentalRate
                    FROM products AS p, departmentproducts AS dp
                    WHERE dp.ProductsID = p.productsID 
                    AND p.active = 1 
                    AND p.rentalRate > 0 
                    AND dp.DepartmentsID = ?`;

    const params = [id]
    const rows = await execute(sql, params)

    if (!rows[0]) {
        throw Error("Products are not found")
    }
    return rows
}

module.exports = { getAll, getByID, getFeatured, getByBrandID, getByDepartmentID, getOnSale }