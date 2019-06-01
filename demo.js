
var express = require('express');
var mysql = require('mysql');
const http = require('http');
var app = new express();
var array = [];

//连接数据库
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
	// 填入数据库密码
    password : '123456',
    port : '3306',
    database : 'test_database'
});
// 执行连接
connection.connect();

// app.get("/",function(req,res){
	
// 	connection.query('SELECT * FROM student_info', (err, results, fields) => {
// 	    if(err){
// 	        console.log(err);
// 	    }
// 	    console.log(results);


// 	})
// });

// app.get('/',(req,res)=>{

// 	connection.query('select*form student_info',(err,results){
//         if (err) console.log(err);
//         res.json({results});
//     });

// });


  
//查
app.get("/query",function(req,res){

	connection.query('SELECT *from student_info', function(err, rows) {
	  	if (err) throw err;
	    	res.json({rows});

	});
});

//增
app.get('/add',function(req,res){
	// let plus = req.query
	// console.log(plus);
	// res.json(req.query);
	var data = req.query
	connection.query('insert into student_info set ?', data ,function(err,results){
		if (err) throw err;
	    
	});

	connection.query('SELECT *from student_info', function(err, rows) {
	  	if (err) throw err;
	    	res.json({rows});

	});
});

//删
app.get('/delete',function(req,res){
	var code = req.query.id;
	console.log(code);
	connection.query('delete from student_info where number=' + code , code , function(err,results){
		if (err) throw err;
	});

	connection.query('SELECT *from student_info', function(err, rows) {
	  	if (err) throw err;
	    	res.json({rows});
	});
});

//改
app.get('/change',function(req,res){
	let code = req.query.number;
	let name = req.query.name;
	let id = req.query.id;
	connection.query("update student_info set name='" + name + "'where number=" + code ,function(err,results){
		if (err) throw err;
	});
	connection.query("update student_info set id='" + id + "'where number=" + code ,function(err,results){
		if (err) throw err;
	});

	connection.query('SELECT *from student_info', function(err, rows) {
	  	if (err) throw err;
	    	res.json({rows});
	});

});








app.listen(3105,function(){
console.log('connect right in localhost:3105');
});






