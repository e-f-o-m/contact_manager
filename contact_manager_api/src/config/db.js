import mysql from 'mysql2/promise';
import { db } from './config.js';

const connection = await mysql.createConnection(db);

connection.connect(function(err){
  if(!!err){
      console.log('>> ',err)
  } else{
      console.log('Connected')
  }
})

export default connection;
