import {db} from "./db"

function getProducts() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM products', (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function getProductById(id) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM products where id=(?)',id, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function addProduct(firstName, lastName) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO products (firstName, lastName) VALUES (?, ?)', firstName, lastName, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

function editProduct(id, firstName, lastName) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE products SET firstName = (?), lastName = (?) where id = (?)', [firstName, lastName, id], (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM products WHERE id = (?)', id, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

export {
    getProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct
};
