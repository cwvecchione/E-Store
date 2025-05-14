import {db} from "./db"

function getOrders() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM orders', (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function getOrderById(id) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM orders where id=(?)',id, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function addOrder(firstName, lastName) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO orders (firstName, lastName) VALUES (?, ?)', firstName, lastName, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

function editOrder(id, firstName, lastName) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE orders SET firstName = (?), lastName = (?) where id = (?)', [firstName, lastName, id], (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

function deleteOrder(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM orders WHERE id = (?)', id, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

export {
    getOrders,
    getOrderById,
    addOrder,
    editOrder,
    deleteOrder
};
