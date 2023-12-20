CREATE VIEW list_all_orders_by_each_customer AS
SELECT customers.name AS "Customer Name", books.name AS "Book Name", COUNT(customers.id) AS "Total Orders"
FROM books 
JOIN orders
ON books.id = orders.bookId
JOIN customers
ON customers.id = orders.customerId
GROUP BY customers.id, books.name

