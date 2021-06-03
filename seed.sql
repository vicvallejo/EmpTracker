


INSERT INTO department ( depto_id , depto_name )
VALUES
	( 200 , 'PAYROLL'),
	( 300 , 'MANAGEMENT'),
	( 400 , 'SALES'),
    ( 500 , 'OPERATIONS'),
	( 600 , 'FINANCE');
    
   INSERT INTO role_e ( role_id , role_title , role_salary , depto_id )
 VALUES
	( 101 , 'GENERAL MANAGER' , 50000 , '300' ),
	( 102 , 'OPERATIONS SUPERVISOR' , 30000 , '500' ),
	( 103 , 'PAYROLL CLERCK' , 15000 , '200'  ),
	( 104 , 'FINANCE CLERCK' , 15000 , '600'  ),
	( 105, 'SALES CLERCK' , 15000  , '400' );
 
 INSERT INTO employee ( emp_id , first_name , last_name , role_id , manager_id )
 VALUES
	( 1001 , 'VICTOR' , 'VALLEJO' , '101' ,   '0'   ),
	( 1002 , 'ISRAEL' , 'MIRANDA' , '102' , '1001'  ),
	( 1003 , 'ARTURO' , 'JAUREZ' , '103' , '1002'  ),
	( 1004 , 'RICARDO' , 'MONDRAGON' , '103' , '1002'  ),
	( 1005 , 'ESTEBAN' , 'LOPEZ' , '104' , '1002'  ),
	( 1006 , 'FABIOLA' , 'ANDRADE' , '104' , '1002'  ),
	( 1007, 'OSCAR' , 'PACHECO' , '105' , '1001'  ),
	( 1008, 'MAURICIO' , 'GARCIA' , '105' , '1001'  );
    
    
  