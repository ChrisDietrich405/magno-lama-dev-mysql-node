-- CREATE A VIEW THAT SHOWS ALL CUSTOMERS THAT HAVE TWO OR MORE ORDERS

CREATE VIEW selectCustomersWithManyOrders AS 
SELECT name, COUNT(customers.id)
FROM orders
JOIN customers
ON orders.customerId = customers.id
GROUP BY name
HAVING COUNT(customers.id) > 1

