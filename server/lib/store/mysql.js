const path = require('path');
const result =
    require('dotenv').config({path: path.join(__dirname, '../../../.env')});

const mysql  = require('mysql');
const config = {
	connectionLimit: 1,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
};
const pool = mysql.createPool(config);

const query2 = (sql, bindings) =>
{
	return new Promise(
	    (resolve, reject) =>
	    {
		    pool.query(
		        sql, bindings,
		        (error, results, fields) =>
		        {
			        if (error)
				        reject(error);
			        resolve(results);
		        });
	    });
};


module.exports = {
	pool,
	query2
};
