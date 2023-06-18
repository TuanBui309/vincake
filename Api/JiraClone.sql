USE [JiraClone2]
select @@VERSION
create database [Clone]
GO
/****** Object:  Database [JiraClone]    Script Date: 4/9/2023 4:18:09 PM ******/
CREATE DATABASE [JiraClone1]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'JiraClone', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS2017\MSSQL\DATA\JiraClone.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'JiraClone_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS2017\MSSQL\DATA\JiraClone_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
delete Customer


/****** vincake ******/
CREATE TABLE Categories(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    tenLoai NVARCHAR(100) NOT NULL,
	image nVARCHAR(200),
	[deleted] [bit] NULL,
	[dateCreated] [datetime] NULL,
  

)

select * from Customer
insert into Categories(tenLoai,image,deleted)
values ('aaaa','aaaa',false)
ALTER TABLE Customer
ADD VerifiedAt datetime;
CREATE TABLE [dbo].[Customer](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[passWord] [nvarchar](255) NULL,
	[avatar] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[phoneNumber] [nvarchar](255) NULL,
	[deleted] [bit] NULL,
	[alias] [nvarchar](255) NULL,
	[facebookId] [nvarchar](max) NULL,
	[dateCreated] [datetime] NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

create table Product(
id INT IDENTITY(1,1) primary key ,
maLoai int foreign key references Categories(id) on delete cascade on update cascade NOT NULL,
tenSP NVARCHAR(350) not null,
giaBan int,
sale int ,
soLuong int,
image nVARCHAR(200),
tinhTrang nvarchar(500),
[deleted] [bit] NULL,
	[dateCreated] [datetime] NULL,

)
CREATE TABLE Customers(
    id INT IDENTITY(1, 1) PRIMARY KEY,
	[name] [nvarchar](255) NULL,
	[passWord] [nvarchar](255) NULL,
	[avatar] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[phoneNumber] [nvarchar](255) NULL,
	[deleted] [bit] NULL,
	[alias] [nvarchar](255) NULL,
	[facebookId] [nvarchar](max) NULL,
	[dateCreated] [datetime] NULL,
)
select * from Orders
select * from DetailOrders
DELETE FROM Orders WHERE id=114
DELETE FROM ShippingAddress WHERE id=57
select * from  ShippingAddress
delete  from ShippingAddress
Create TABLE ShippingAddress (
    id INT IDENTITY(1, 1) PRIMARY KEY,
	
    name NVARCHAR(150) NULL,
    phone CHAR(10) NOT NULL,
    address NVARCHAR(MAX) NULL,
	[deleted] [bit] NULL,
	[dateCreated] [datetime] NULL,
)

insert into ShippingAddress(name,phone,address,deleted)
values('asds','asdas','asdasda',0)
CREATE TABLE Orders(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    customerId INT CONSTRAINT fk_customer_oder FOREIGN KEY(customerId) REFERENCES Customer(id),
    addressId INT CONSTRAINT fk_address_oder FOREIGN KEY(addressId) REFERENCES ShippingAddress(id) ON DELETE CASCADE,
	[deleted] [bit] NULL,

    [dateCreated] [datetime] NULL,
  
    statusId INT CONSTRAINT fk_status_id FOREIGN KEY(statusId) REFERENCES StatusOrder(id) ON DELETE CASCADE,
	total int null,
)

select * from ShippingAddress
select * from DetailOrders
select * from Orders
select * from Cart
CREATE TABLE DetailOrders(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    orderId INT CONSTRAINT fk_order_detail FOREIGN KEY(orderId) REFERENCES Orders(id) ON DELETE CASCADE,
    nameProduct NVARCHAR(250),
	productId int  CONSTRAINT fk_product_detail FOREIGN KEY(productId) REFERENCES Product(id) ON DELETE CASCADE,
   
    image nVARCHAR(200),
    quantity INT NOT NULL,
    price INT NOT NULL,
	[deleted] [bit] NULL,

    [dateCreated] [datetime] NULL,
)

insert into Supplier(name,phone,address,deleted)
values(N'Banh kinh do','0987654321','Hung Yen',0)

drop table shipping_address
select * from ShippingAddress
select * from DetailOrders
select * from Orders
CREATE TABLE Bills(
    id INT IDENTITY(1, 1) PRIMARY KEY,

    userId INT CONSTRAINT fk_userId_bill FOREIGN KEY(userId) REFERENCES UserJira(id),

    supplierId int CONSTRAINT fk_supplier FOREIGN KEY(supplierId) REFERENCES Supplier(id),
    total int,
	[deleted] [bit] NULL,

    [dateCreated] [datetime] NULL,
  
    statusId INT CONSTRAINT fk_status_id1 FOREIGN KEY(statusId) REFERENCES StatusOrder(id) ON DELETE CASCADE,
)
CREATE TABLE BillDetails(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    billId INT CONSTRAINT fk_bill_detail1 FOREIGN KEY(billId) REFERENCES Bills(id) ON DELETE CASCADE,
    nameProduct NVARCHAR(250),
	productId int  CONSTRAINT fk_product_detail1 FOREIGN KEY(productId) REFERENCES Product(id) ON DELETE CASCADE,
   
    image nVARCHAR(200),
    quantity INT NOT NULL,
    price INT NOT NULL,
	[deleted] [bit] NULL,

    [dateCreated] [datetime] NULL,
)
select * from Editor
CREATE TABLE Editor(
 id INT IDENTITY(1, 1) PRIMARY KEY,
 billId INT null,
statusId INT ,
 userId INT CONSTRAINT fk_user_bill FOREIGN KEY(userId) REFERENCES UserJira(id) ON DELETE CASCADE,
  [dateCreated] datetime null,
 

 [deleted] [bit] NULL,





)
CREATE TABLE EditorOrder(
 id INT IDENTITY(1, 1) PRIMARY KEY,
 orderId INT null,
statusId INT ,
 userId INT CONSTRAINT fk_user_order1 FOREIGN KEY(userId) REFERENCES UserJira(id) ON DELETE CASCADE,
  [dateCreated] datetime null,
 

 [deleted] [bit] NULL,





)
select * from Product where tenSP like '%Kem%' or maLoai like '%75%'
drop table   Editor
select * from Editor
CREATE TABLE Supplier(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    name nvarchar(500),
    phone nvarchar(20) ,
   
    address nvarchar(500),
	[deleted] [bit] NULL,
	[dateCreated] [datetime] NULL,
)
create table ProductBill(
id INT IDENTITY(1,1) primary key ,
productId int CONSTRAINT fk_bill_product FOREIGN KEY(productId) REFERENCES Product(id) ON DELETE CASCADE,
userId int CONSTRAINT fk_user_product FOREIGN KEY(userId) REFERENCES UserJira(id) ON DELETE CASCADE,
name NVARCHAR(350) not null,
 price int ,
quantity int,
image nVARCHAR(200),
[deleted] [bit] NULL,
[dateCreated] [datetime] NULL,

)
select * from BillDetails
select * from ProductBill
select * from Bills
SELECT  MONTH(dateCreated), SUM(total) 
FROM Bills where YEAR(dateCreated)=2023
GROUP BY  MONTH(dateCreated);
SELECT  maLoai, SUM(total) 
FROM Bills inner join BillDetails on Bills.id=BillDetails.billId inner join Product on BillDetails.productId=Product.id 
GROUP BY  maLoai;

SELECT  maLoai, SUM(DetailOrders.price*DetailOrders.quantity) 
FROM Product inner join DetailOrders on DetailOrders.productId=Product.id 
GROUP BY  maLoai;
select * from orders
select * from DetailOrders
delete from orders





SELECT top(5) t.name AS nameCustomer, COALESCE(SUM(s.total), 0) AS total from

Customer t
LEFT JOIN (SELECT customerId AS IdCustomer,total FROM Orders where MONTH(dateCreated)=5 )s ON t.id = s.IdCustomer
GROUP BY  t.name
ORDER BY total DESC

SELECT top(5) p.tenSP AS productName, COALESCE(SUM(s.quantity), 0) AS total from
Product p
LEFT JOIN (SELECT productId AS maSP,quantity FROM DetailOrders where orderId in (select id from Orders o where YEAR(o.dateCreated)=4) ) s on p.id=s.maSP


GROUP BY  p.tenSP
ORDER BY total DESC

SELECT t.tenLoai AS category, COALESCE(SUM(s.price*s.quantity), 0) AS total from
Categories t inner join 
Product p on t.id=p.maLoai
LEFT JOIN (SELECT productId AS masp, price,quantity FROM BillDetails where billId IN(select id from Bills b where b.statusId=14) ) s ON p.id = s.masp
GROUP BY  t.tenLoai;
-- thu nhap theo loai
SELECT t.tenLoai AS category, COALESCE(SUM(s.price*s.quantity), 0) AS total from
Categories t inner join 
Product p on t.id=p.maLoai
LEFT JOIN (SELECT productId AS masp, price,quantity FROM DetailOrders where orderId in (select id from Orders o where o.statusId=10 ) ) s ON p.id = s.masp
GROUP BY  t.tenLoai;



select * from Orders




WITH months AS ( SELECT 1 AS month UNION ALL SELECT month + 1 FROM months WHERE month < 12 ) SELECT m.month, COALESCE(sum(s.total), 0) AS total FROM months m LEFT JOIN (SELECT MONTH(dateCreated) AS month, total FROM Orders) s ON m.month = s.month group by m.month ORDER BY m.month

CREATE TABLE Cart(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    customerId  INT CONSTRAINT fk_customer_cart FOREIGN KEY(customerId) REFERENCES Customer(id) ON DELETE CASCADE,
    productId  INT CONSTRAINT fk_cart_product FOREIGN KEY(productId) REFERENCES Product(id),
   
    quantity INT NOT NULL,
	[deleted] [bit] NULL,
	[dateCreated] [datetime] NULL,
)
CREATE TABLE News (
 id INT IDENTITY(1,1) not null primary key,
 image nvarchar(500)  NULL,

 NoiDung nvarchar(500)  NULL,
 userId int CONSTRAINT fk_user_news FOREIGN KEY(userId) REFERENCES UserJira(id) ON DELETE CASCADE,
 [deleted] [bit] NULL,
 
 MoTa nvarchar(max)  NULL,
 [dateCreated] [datetime] NULL,
 
 
)
insert into StatusOrder(statusName,alias,deleted)
 values(N'Hoàn thành','hoan_thanh',0)
 delete from StatusOrder

 select *from StatusOrder
CREATE TABLE [dbo].[StatusOrder](
	 id INT IDENTITY(1, 1) ,
	[statusName] [nvarchar](max) NULL,
	[alias] [nvarchar](max) NULL,
	[deleted] [bit] NULL,
	[dateCreated] [datetime] NULL,
 CONSTRAINT [PK_StatusOrder] PRIMARY KEY CLUSTERED 
(
	id ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
Create TABLE shipping_address (
    id INT IDENTITY(1, 1) PRIMARY KEY,
    name NVARCHAR(150) NOT NULL,
    phone CHAR(10) NOT NULL,
    address NVARCHAR(MAX) NOT NULL,
)
CREATE TABLE [dbo].[CommentCustomer](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NULL,
	[productId] [int] NULL,
	[contentComment] [nvarchar](max) NULL,
	[deleted] [bit] NULL,
	[alias] [nvarchar](max) NULL,
	[dateCreated] [datetime] NULL,
 CONSTRAINT [PK_CommentCustomer] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Priority]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER TABLE [dbo].[CommentCustomer]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Product] FOREIGN KEY([productId])
REFERENCES [dbo].[Product] ([id])
ON DELETE CASCADE
GO
/****** vincake ******/
CREATE TABLE [dbo].[Comment](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NULL,
	[taskId] [int] NULL,
	[contentComment] [nvarchar](max) NULL,
	[projectId] [int] NULL,
	[deleted] [bit] NULL,
	[alias] [nvarchar](max) NULL,
	[dateCreated] [datetime] NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Priority]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Priority](
	[priorityId] [int] NOT NULL,
	[priority] [nvarchar](50) NULL,
	[description] [nvarchar](50) NULL,
	[deleted] [bit] NULL,
	[alias] [nvarchar](50) NULL,
	[dateCreated] [datetime] NULL,
 CONSTRAINT [PK_Priority] PRIMARY KEY CLUSTERED 
(
	[priorityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
insert into  Priority(priorityId,priority,description)
values (1,N'Kha','a')
/****** Object:  Table [dbo].[Project]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Project](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[projectName] [nvarchar](max) NULL,
	[description] [ntext] NULL,
	[categoryId] [int] NULL,
	[alias] [nvarchar](max) NULL,
	[deleted] [bit] NULL,
	[creator] [int] NULL,
	[dateCreated] [datetime] NULL,
 CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Project_User]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Project_User](
	[projectId] [int] NOT NULL,
	[userId] [int] NOT NULL,
	[deleted] [bit] NULL,
	[alias] [nvarchar](50) NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
	[dateCreated] [datetime] NULL,
 CONSTRAINT [PK_Project_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProjectCategory]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectCategory](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[projectCategoryName] [nvarchar](255) NULL,
	[alias] [nvarchar](50) NULL,
	[deleted] [bit] NULL,
	[dateCreated] [datetime] NULL,
 CONSTRAINT [PK_ProjectCategory] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
insert into ProjectCategory([projectCategoryName],[alias],deleted)
values(N'Cong Nghe We adsadb','aaaa',0)
/****** Object:  Table [dbo].[Status]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Status](
	[statusId] [nvarchar](50) NOT NULL,
	[statusName] [nvarchar](max) NULL,
	[alias] [nvarchar](max) NULL,
	[deleted] [bit] NULL,
	[dateCreated] [datetime] NULL,
 CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED 
(
	[statusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Task]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Task](
	[taskId] [int] IDENTITY(1,1) NOT NULL,
	[taskName] [nvarchar](1000) NULL,
	[alias] [nvarchar](1000) NULL,
	[description] [nvarchar](max) NULL,
	[statusId] [nvarchar](50) NULL,
	[originalEstimate] [int] NULL,
	[timeTrackingRemaining] [int] NULL,
	[projectId] [int] NULL,
	[typeId] [int] NULL,
	[deleted] [bit] NULL,
	[reporterId] [int] NULL,
	[priorityId] [int] NULL,
	[timeTrackingSpent] [int] NULL,
	[dateCreated] [datetime] NULL,
 CONSTRAINT [PK_Tasks] PRIMARY KEY CLUSTERED 
(
	[taskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Task_User]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Task_User](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NULL,
	[taskId] [int] NULL,
	[deleted] [bit] NULL,
	[dateCreated] [datetime] NULL,
 CONSTRAINT [PK_Task_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TaskType]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaskType](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[taskType] [nvarchar](50) NULL,
	[deleted] [bit] NULL,
	[alias] [nvarchar](50) NULL,
	[dateCreated] [datetime] NULL,
 CONSTRAINT [PK_TaskType] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserJira]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserJira](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[passWord] [nvarchar](255) NULL,
	[avatar] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[phoneNumber] [nvarchar](255) NULL,
	[deleted] [bit] NULL,
	[alias] [nvarchar](255) NULL,
	[facebookId] [nvarchar](max) NULL,
	[dateCreated] [datetime] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_ProjectCategory] FOREIGN KEY([projectId])
REFERENCES [dbo].[ProjectCategory] ([id])
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_ProjectCategory]
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD  CONSTRAINT [FK_Comment_Task] FOREIGN KEY([taskId])
REFERENCES [dbo].[Task] ([taskId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Comment] CHECK CONSTRAINT [FK_Comment_Task]
GO
ALTER TABLE [dbo].[Project]  WITH CHECK ADD  CONSTRAINT [FK_Project_ProjectCategory] FOREIGN KEY([categoryId])
REFERENCES [dbo].[ProjectCategory] ([id])
GO
ALTER TABLE [dbo].[Project] CHECK CONSTRAINT [FK_Project_ProjectCategory]
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD  CONSTRAINT [FK_Task_Project] FOREIGN KEY([projectId])
REFERENCES [dbo].[Project] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Task] CHECK CONSTRAINT [FK_Task_Project]
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD  CONSTRAINT [FK_Task_Status] FOREIGN KEY([statusId])
REFERENCES [dbo].[Status] ([statusId])
GO
ALTER TABLE [dbo].[Task] CHECK CONSTRAINT [FK_Task_Status]
GO
ALTER TABLE [dbo].[Task]  WITH CHECK ADD  CONSTRAINT [FK_Task_TaskType] FOREIGN KEY([typeId])
REFERENCES [dbo].[TaskType] ([id])
GO
ALTER TABLE [dbo].[Task] CHECK CONSTRAINT [FK_Task_TaskType]
GO
/****** Object:  StoredProcedure [dbo].[CHECK_VALID]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: 
-- Create date: 15/11/2019
-- Description:	Kiểm tra tồn tại theo tên cột
-- =============================================
create PROCEDURE [dbo].[THONG_KE_THU_CHI]

	@listColumn nvarchar(MAX)-- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{"Key": "MaSP","Value": "SP01"}, {"Key": "TenSP","Value": "Nokia"}]'
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng

	DECLARE 
	@numColumn int = 0,
	@item nvarchar(MAX),
	@step int = 0,
	@column nvarchar(MAX),
	@value nvarchar(MAX),
	@listCondition nvarchar(MAX) = '',
	@query nvarchar(MAX)

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');
	
	IF @numColumn > 0
		BEGIN
			-- Chạy vòng lặp mảng
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, CONCAT('$[', CAST(@step as varchar(10)) , ']'));
					-- Lấy ra column và value của phần tử thứ i
					SET @column = JSON_VALUE (@item, '$.Key');
					SET @value = JSON_VALUE (@item, '$.Value');

					IF (@step + 1 = @numColumn)
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, '''');
					ELSE
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01' AND TenSP = N'Nokia'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, ''' AND ');

					-- Tăng biến đếm thêm 1
					SET @step = @step + 1;
				END

			-- Nối các biến thành câu lệnh select
			SET @query = CONCAT('WITH months AS ( SELECT 1 AS month UNION ALL SELECT month + 1 FROM months WHERE month < 12 ) SELECT m.month, COALESCE(sum(s.total), 0) AS total FROM months m LEFT JOIN (SELECT MONTH(dateCreated) AS month, total FROM Bills WHERE ',@listCondition,') s ON m.month = s.month GROUP BY m.month ORDER BY m.month
');
			-- Thực thi câu lệnh delete
			EXEC(@query)
		END
END
GO

create PROCEDURE [dbo].[THONG_KE_THU_NHAP]

	@listColumn nvarchar(MAX)-- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{"Key": "MaSP","Value": "SP01"}, {"Key": "TenSP","Value": "Nokia"}]'
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng

	DECLARE 
	@numColumn int = 0,
	@item nvarchar(MAX),
	@step int = 0,
	@column nvarchar(MAX),
	@value nvarchar(MAX),
	@listCondition nvarchar(MAX) = '',
	@query nvarchar(MAX)

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');
	
	IF @numColumn > 0
		BEGIN
			-- Chạy vòng lặp mảng
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, CONCAT('$[', CAST(@step as varchar(10)) , ']'));
					-- Lấy ra column và value của phần tử thứ i
					SET @column = JSON_VALUE (@item, '$.Key');
					SET @value = JSON_VALUE (@item, '$.Value');

					IF (@step + 1 = @numColumn)
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, '''');
					ELSE
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01' AND TenSP = N'Nokia'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, ''' AND ');

					-- Tăng biến đếm thêm 1
					SET @step = @step + 1;
				END

			-- Nối các biến thành câu lệnh select
			SET @query = CONCAT('WITH months AS ( SELECT 1 AS month UNION ALL SELECT month + 1 FROM months WHERE month < 12 ) SELECT m.month, COALESCE(sum(s.total), 0) AS total FROM months m LEFT JOIN (SELECT MONTH(dateCreated) AS month, total FROM Orders WHERE ',@listCondition,') s ON m.month = s.month GROUP BY m.month ORDER BY m.month
');
			-- Thực thi câu lệnh delete
			EXEC(@query)
		END
END
GO

create PROCEDURE [dbo].[THONG_KE_CHI_TIEU_THEO_LOAI]

	@listColumn nvarchar(MAX)-- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{"Key": "MaSP","Value": "SP01"}, {"Key": "TenSP","Value": "Nokia"}]'
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng

	DECLARE 
	@numColumn int = 0,
	@item nvarchar(MAX),
	@step int = 0,
	@column nvarchar(MAX),
	@value nvarchar(MAX),
	@listCondition nvarchar(MAX) = '',
	@query nvarchar(MAX)

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');
	
	IF @numColumn > 0
		BEGIN
			-- Chạy vòng lặp mảng
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, CONCAT('$[', CAST(@step as varchar(10)) , ']'));
					-- Lấy ra column và value của phần tử thứ i
					SET @column = JSON_VALUE (@item, '$.Key');
					SET @value = JSON_VALUE (@item, '$.Value');

					IF (@step + 1 = @numColumn)
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, '''');
					ELSE
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01' AND TenSP = N'Nokia'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, ''' AND ');

					-- Tăng biến đếm thêm 1
					SET @step = @step + 1;
				END

			-- Nối các biến thành câu lệnh select
				SET @query = CONCAT('SELECT t.tenLoai AS category, COALESCE(SUM(s.price*s.quantity), 0) AS total from
Categories t inner join 
Product p on t.id=p.maLoai
LEFT JOIN (SELECT productId AS masp, price,quantity FROM BillDetails where ',@listCondition,' ) s ON p.id = s.masp
GROUP BY  t.tenLoai;');
			-- Thực thi câu lệnh delete
			EXEC(@query)
		END
END
GO
create PROCEDURE [dbo].[THONG_KE_THU_NHAP_THEO_LOAI]

	@listColumn nvarchar(MAX)-- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{"Key": "MaSP","Value": "SP01"}, {"Key": "TenSP","Value": "Nokia"}]'
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng

	DECLARE 
	@numColumn int = 0,
	@item nvarchar(MAX),
	@step int = 0,
	@column nvarchar(MAX),
	@value nvarchar(MAX),
	@listCondition nvarchar(MAX) = '',
	@query nvarchar(MAX)

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');
	
	IF @numColumn > 0
		BEGIN
			-- Chạy vòng lặp mảng
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, CONCAT('$[', CAST(@step as varchar(10)) , ']'));
					-- Lấy ra column và value của phần tử thứ i
					SET @column = JSON_VALUE (@item, '$.Key');
					SET @value = JSON_VALUE (@item, '$.Value');

					IF (@step + 1 = @numColumn)
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, '''');
					ELSE
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01' AND TenSP = N'Nokia'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, ''' AND ');

					-- Tăng biến đếm thêm 1
					SET @step = @step + 1;
				END

			-- Nối các biến thành câu lệnh select

			SET @query = CONCAT('SELECT t.tenLoai AS category, COALESCE(SUM(s.price*s.quantity), 0) AS total from
Categories t inner join 
Product p on t.id=p.maLoai
LEFT JOIN (SELECT productId AS masp, price,quantity FROM DetailOrders where orderId in (select id from Orders o where ',@listCondition,' ) ) s ON p.id = s.masp
GROUP BY  t.tenLoai;');
			-- Thực thi câu lệnh delete
			EXEC(@query)
		END
END
GO
create PROCEDURE [dbo].[TOP_5_CUSTOMER]

	@listColumn nvarchar(MAX)-- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{"Key": "MaSP","Value": "SP01"}, {"Key": "TenSP","Value": "Nokia"}]'
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng

	DECLARE 
	@numColumn int = 0,
	@item nvarchar(MAX),
	@step int = 0,
	@column nvarchar(MAX),
	@value nvarchar(MAX),
	@listCondition nvarchar(MAX) = '',
	@query nvarchar(MAX)

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');
	
	IF @numColumn > 0
		BEGIN
			-- Chạy vòng lặp mảng
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, CONCAT('$[', CAST(@step as varchar(10)) , ']'));
					-- Lấy ra column và value của phần tử thứ i
					SET @column = JSON_VALUE (@item, '$.Key');
					SET @value = JSON_VALUE (@item, '$.Value');

					IF (@step + 1 = @numColumn)
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, '''');
					ELSE
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01' AND TenSP = N'Nokia'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, ''' AND ');

					-- Tăng biến đếm thêm 1
					SET @step = @step + 1;
				END

			-- Nối các biến thành câu lệnh select

		SET @query = CONCAT('SELECT top(5) t.name AS nameCustomer, COALESCE(SUM(s.total), 0) AS total from

Customer t
LEFT JOIN (SELECT customerId AS maKH,total FROM Orders where ',@listCondition,' )s ON t.id = s.maKH
GROUP BY  t.name
ORDER BY total DESC');
			-- Thực thi câu lệnh delete
			EXEC(@query)
		END
END
GO
create PROCEDURE [dbo].[TOP_5_PRODUCT_BC]

	@listColumn nvarchar(MAX)-- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{"Key": "MaSP","Value": "SP01"}, {"Key": "TenSP","Value": "Nokia"}]'
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng

	DECLARE 
	@numColumn int = 0,
	@item nvarchar(MAX),
	@step int = 0,
	@column nvarchar(MAX),
	@value nvarchar(MAX),
	@listCondition nvarchar(MAX) = '',
	@query nvarchar(MAX)

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');
	
	IF @numColumn > 0
		BEGIN
			-- Chạy vòng lặp mảng
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, CONCAT('$[', CAST(@step as varchar(10)) , ']'));
					-- Lấy ra column và value của phần tử thứ i
					SET @column = JSON_VALUE (@item, '$.Key');
					SET @value = JSON_VALUE (@item, '$.Value');

					IF (@step + 1 = @numColumn)
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, '''');
					ELSE
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01' AND TenSP = N'Nokia'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, ''' AND ');

					-- Tăng biến đếm thêm 1
					SET @step = @step + 1;
				END

			-- Nối các biến thành câu lệnh select

		SET @query = CONCAT('SELECT top(5) p.tenSP AS productName, COALESCE(SUM(s.quantity), 0) AS total from
Product p
LEFT JOIN (SELECT productId AS maSP,quantity FROM DetailOrders where orderId in (select id from Orders o where ',@listCondition,') ) s on p.id=s.maSP
GROUP BY  p.tenSP
ORDER BY total DESC');
			-- Thực thi câu lệnh delete
			EXEC(@query)
		END
END
GO
select * from Orders
create PROCEDURE [dbo].[CHECK_VALID]
	@tableName nvarchar(255), -- Tên bảng gửi từ ứng dụng lên
	@listColumn nvarchar(MAX)-- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{"Key": "MaSP","Value": "SP01"}, {"Key": "TenSP","Value": "Nokia"}]'
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng

	DECLARE 
	@numColumn int = 0,
	@item nvarchar(255),
	@step int = 0,
	@column nvarchar(50),
	@value nvarchar(255),
	@listCondition nvarchar(MAX) = '',
	@query nvarchar(MAX)

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');
	-- Chạy vòng lặp mảng
	IF @numColumn > 0
		BEGIN
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, CONCAT('$[', CAST(@step as varchar(10)) , ']'));
					-- Lấy ra column và value của phần tử thứ i
					SET @column = JSON_VALUE (@item, '$.Key');
					SET @value = JSON_VALUE (@item, '$.Value');

					IF (@step + 1 = @numColumn)
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, '''');
					ELSE
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01' AND TenSP = N'Nokia'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, ''' AND ');

					-- Tăng biến đếm thêm 1
					SET @step = @step + 1;
				END

			-- Nối các biến thành câu lệnh select
			SET @query = CONCAT('SELECT COUNT(*) FROM ', @tableName, ' WHERE ', @listCondition, ' AND deleted = 0;');
			-- Thực thi câu lệnh
			EXEC(@query)
		END
END
GO
/****** Object:  StoredProcedure [dbo].[DELETE_DATA_BY_ID]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[DELETE_DATA_BY_ID]
	@tableName nvarchar(MAX), -- Tên bảng gửi từ ứng dụng lên
	@listId nvarchar(MAX) -- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
		-- @listColumn <=> mảng json có dạng '["1", "2"]'
AS
BEGIN
	DECLARE
		--@tableName nvarchar(255), -- Tên bảng gửi từ ứng dụng lên
		--@listId nvarchar(MAX) = '["911b624d-84b1-46c9-bf18-69677359d9f4", "911b624d-84b1-46c9-bf18-69677359d9f4"]',
		@query nvarchar(MAX), -- Biến lưu trữ câu lệnh SQL
		@numColumn int = 0,
		@item nvarchar(255),
		@arrayId nvarchar(255) = '',
		@step int = 0

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listId, N'$');
	-- Chạy vòng lặp mảng
	IF @numColumn > 0
		BEGIN 
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_VALUE (@listId, CONCAT('$[', CAST(@step as varchar(10)) , ']')); 

						-- Nếu là phần tử cuối cùng của mảng
						IF (@step + 1 = @numColumn)
							-- Nối danh sách column value thành một chuỗi có dạng '1', '2', '3'
							SET @arrayId += CONCAT('''', @item, '''');
						ELSE
							-- Nối danh sách column value thành một chuỗi có dạng '1', '2', '3'
							SET @arrayId += CONCAT('''', @item, ''', ');

							-- Tăng biến đếm thêm 1
							SET @step = @step + 1;
				END
		SET @query = CONCAT('Delete From ', @tableName, ' WHERE id IN (', @arrayId, ');');
		EXEC(@query);
	END
END
GO
/****** Object:  StoredProcedure [dbo].[DELETE_DATA_BY_TASK_ID]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




create PROCEDURE [dbo].[DELETE_DATA_BY_TASK_ID]
	@tableName nvarchar(MAX), -- Tên bảng gửi từ ứng dụng lên
	@listId nvarchar(MAX) -- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
		-- @listColumn <=> mảng json có dạng '["1", "2"]'
AS
BEGIN
	DECLARE
		--@tableName nvarchar(255), -- Tên bảng gửi từ ứng dụng lên
		--@listId nvarchar(MAX) = '["911b624d-84b1-46c9-bf18-69677359d9f4", "911b624d-84b1-46c9-bf18-69677359d9f4"]',
		@query nvarchar(MAX), -- Biến lưu trữ câu lệnh SQL
		@numColumn int = 0,
		@item nvarchar(255),
		@arrayId nvarchar(255) = '',
		@step int = 0

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listId, N'$');
	-- Chạy vòng lặp mảng
	IF @numColumn > 0
		BEGIN 
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_VALUE (@listId, CONCAT('$[', CAST(@step as varchar(10)) , ']')); 

						-- Nếu là phần tử cuối cùng của mảng
						IF (@step + 1 = @numColumn)
							-- Nối danh sách column value thành một chuỗi có dạng '1', '2', '3'
							SET @arrayId += CONCAT('''', @item, '''');
						ELSE
							-- Nối danh sách column value thành một chuỗi có dạng '1', '2', '3'
							SET @arrayId += CONCAT('''', @item, ''', ');

							-- Tăng biến đếm thêm 1
							SET @step = @step + 1;
				END
		SET @query = CONCAT('Delete From ', @tableName, ' WHERE taskId IN (', @arrayId, ');');
		EXEC(@query);
	END
END
GO
/****** Object:  StoredProcedure [dbo].[GET_ALL_DATA]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Nguyễn Tiến Hoàng
-- Create date: 15/11/2019
-- Description: Lất tất cả các bản ghi (lấy động theo bảng)
-- =============================================
create PROCEDURE [dbo].[GET_ALL_DATA]
	@tableName nvarchar(255) -- Tên bảng gửi từ ứng dụng lên
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng
	DECLARE 
	@query nvarchar(MAX) = '' -- Biến lưu trữ câu lệnh SQL
		
	SET @query = CONCAT('SELECT * FROM ', @tableName, ' WHERE deleted = 0;');
	-- Thực thi câu lệnh select
	EXEC(@query)
		
END
GO
/****** Object:  StoredProcedure [dbo].[GET_DATA_BY_ID]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[THONG_KE]
@year nvarchar(255) -- Tên bảng gửi từ ứng dụng lên


AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng
	DECLARE 
	@query nvarchar(MAX) = '' -- Biến lưu trữ câu lệnh SQL
		
	SET @query = CONCAT('SELECT MONTH(dateCreated) as month, sum(total) as tongtien FROM Bills WHERE YEAR(dateCreated)=',@year,' GROUP BY  MONTH(dateCreated)');
	-- Thực thi câu lệnh select
	EXEC(@query)
		
END
GO

create PROCEDURE [dbo].[GET_DATA_BY_ID]
	@tableName nvarchar(255), -- Tên bảng gửi từ ứng dụng lên
	@listId nvarchar(MAX) -- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
		-- @listColumn <=> mảng json có dạng '["1", "2"]'
AS
BEGIN
	DECLARE 
		@query nvarchar(MAX), -- Biến lưu trữ câu lệnh SQL
		@numColumn int = 0,
		@item nvarchar(MAX),
		@arrayId nvarchar(MAX) = '',
		@step int = 0

		-- Đếm số phần tử có trong mảng
		SELECT @numColumn = count(*) FROM OPENJSON (@listId, N'$');
		-- Chạy vòng lặp mảng
		IF @numColumn > 0
			BEGIN
				WHILE (@step < @numColumn) 
					BEGIN
						-- Lấy ra phần tử ở vị trí thứ i
						SET @item = JSON_VALUE (@listId, CONCAT('$[', CAST(@step as varchar(10)) , ']')); 

							-- Nếu là phần tử cuối cùng của mảng
							IF (@step + 1 = @numColumn)
								-- Nối danh sách column value thành một chuỗi có dạng 1, 2, 3
								SET @arrayId += CONCAT('''', @item, '''');
							ELSE
								-- Nối danh sách column value thành một chuỗi có dạng 1, 2, 3
								SET @arrayId += CONCAT('''', @item, ''', ');

							-- Tăng biến đếm thêm 1
							SET @step = @step + 1;
					END		
				SET @query = CONCAT('SELECT * FROM ', @tableName, ' WHERE deleted = 0 AND id IN (', @arrayId, ');');
				EXEC(@query);
			END
END
GO
/****** Object:  StoredProcedure [dbo].[GET_MULTI_DATA]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[GET_MULTI_DATA]
	@tableName nvarchar(255), -- Tên bảng gửi từ ứng dụng lên
	@listColumn nvarchar(MAX)-- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{"Key": "MaSP","Value": "SP01"}, {"Key": "TenSP","Value": "Nokia"}]'
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng

	DECLARE 
	@numColumn int = 0,
	@item nvarchar(MAX),
	@step int = 0,
	@column nvarchar(MAX),
	@value nvarchar(MAX),
	@listCondition nvarchar(MAX) = '',
	@query nvarchar(MAX)

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');
	-- Chạy vòng lặp mảng
	IF @numColumn > 0
		BEGIN
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, CONCAT('$[', CAST(@step as varchar(10)) , ']'));
					-- Lấy ra column và value của phần tử thứ i
					SET @column = JSON_VALUE (@item, '$.Key');
					SET @value = JSON_VALUE (@item, '$.Value');

					IF (@step + 1 = @numColumn)
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, '''');
					ELSE
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01' AND TenSP = N'Nokia'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, ''' OR ');

					-- Tăng biến đếm thêm 1
					SET @step = @step + 1;
				END

			-- Nối các biến thành câu lệnh select
			SET @query = CONCAT('SELECT * FROM ', @tableName, ' WHERE ', @listCondition, ' AND deleted = 0;');
			-- Thực thi câu lệnh delete
			EXEC(@query)
		END
END
GO
/****** Object:  StoredProcedure [dbo].[GET_MULTI_DATA_AND]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Bui Van Tuan
-- Create date: 16/4/2023
-- Description:	Lấy nhiều bản ghi theo tên cột
-- =============================================
create PROCEDURE [dbo].[DELETE_OP]
	@tableName nvarchar(255), -- Tên bảng gửi từ ứng dụng lên
	@listColumn nvarchar(MAX)-- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{"Key": "MaSP","Value": "SP01"}, {"Key": "TenSP","Value": "Nokia"}]'
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng

	DECLARE 
	@numColumn int = 0,
	@item nvarchar(MAX),
	@step int = 0,
	@column nvarchar(MAX),
	@value nvarchar(MAX),
	@listCondition nvarchar(MAX) = '',
	@query nvarchar(MAX)

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');
	-- Chạy vòng lặp mảng
	IF @numColumn > 0
		BEGIN
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, CONCAT('$[', CAST(@step as varchar(10)) , ']'));
					-- Lấy ra column và value của phần tử thứ i
					SET @column = JSON_VALUE (@item, '$.Key');
					SET @value = JSON_VALUE (@item, '$.Value');

					IF (@step + 1 = @numColumn)
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, '''');
					ELSE
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01' AND TenSP = N'Nokia'
						SET @listCondition += CONCAT(@column, ' != ', 'N''', @value, ''' AND ');

					-- Tăng biến đếm thêm 1
					SET @step = @step + 1;
				END

			-- Nối các biến thành câu lệnh select
			SET @query = CONCAT('Delete From ', @tableName, ' WHERE ', @listCondition, ' AND deleted = 0;');
			
			-- Thực thi câu lệnh delete
			EXEC(@query)
		END
END
GO
-- =============================================
-- Author: Nguyễn Tiến Hoàng
-- Create date: 15/11/2019
-- Description:	Lấy nhiều bản ghi theo tên cột
-- =============================================
create PROCEDURE [dbo].[GET_MULTI_DATA_AND]
	@tableName nvarchar(255), -- Tên bảng gửi từ ứng dụng lên
	@listColumn nvarchar(MAX)-- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{"Key": "MaSP","Value": "SP01"}, {"Key": "TenSP","Value": "Nokia"}]'
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng

	DECLARE 
	@numColumn int = 0,
	@item nvarchar(MAX),
	@step int = 0,
	@column nvarchar(MAX),
	@value nvarchar(MAX),
	@listCondition nvarchar(MAX) = '',
	@query nvarchar(MAX)

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');
	-- Chạy vòng lặp mảng
	IF @numColumn > 0
		BEGIN
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, CONCAT('$[', CAST(@step as varchar(10)) , ']'));
					-- Lấy ra column và value của phần tử thứ i
					SET @column = JSON_VALUE (@item, '$.Key');
					SET @value = JSON_VALUE (@item, '$.Value');

					IF (@step + 1 = @numColumn)
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, '''');
					ELSE
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01' AND TenSP = N'Nokia'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, ''' AND ');

					-- Tăng biến đếm thêm 1
					SET @step = @step + 1;
				END

			-- Nối các biến thành câu lệnh select
			SET @query = CONCAT('SELECT * FROM ', @tableName, ' WHERE ', @listCondition, ' AND deleted = 0;');
			-- Thực thi câu lệnh delete
			EXEC(@query)
		END
END
GO
/****** Object:  StoredProcedure [dbo].[GET_MULTI_DATA_LIKE]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[GET_MULTI_DATA_LIKE]
	@tableName nvarchar(255), -- Tên bảng gửi từ ứng dụng lên
	@listColumn nvarchar(MAX)-- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{"Key": "MaSP","Value": "SP01"}, {"Key": "TenSP","Value": "Nokia"}]'
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng

	DECLARE 
	@numColumn int = 0,
	@item nvarchar(MAX),
	@step int = 0,
	@column nvarchar(MAX),
	@value nvarchar(MAX),
	@listCondition nvarchar(MAX) = '',
	@query nvarchar(MAX)

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');
	-- Chạy vòng lặp mảng
	IF @numColumn > 0
		BEGIN
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, CONCAT('$[', CAST(@step as varchar(10)) , ']'));
					-- Lấy ra column và value của phần tử thứ i
					SET @column = JSON_VALUE (@item, '$.Key');
					SET @value = JSON_VALUE (@item, '$.Value');

					IF (@step + 1 = @numColumn)
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01'
						SET @listCondition += CONCAT(@column, ' like ', 'N''%', @value, '%''');
					ELSE
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01' AND TenSP = N'Nokia'
						SET @listCondition += CONCAT(@column, ' like ', 'N''%', @value, '%'' AND ');

					-- Tăng biến đếm thêm 1
					SET @step = @step + 1;
				END

			-- Nối các biến thành câu lệnh select
			SET @query = CONCAT('SELECT * FROM ', @tableName, ' WHERE ', @listCondition, ' AND deleted = 0;');
			-- Thực thi câu lệnh delete
			EXEC(@query)
		END
END
GO
select * from StatusOrder
select * from Bills

insert Into StatusOrder(statusName,deleted)
values(N'Don Hang Bi Huy',0)
/****** Object:  StoredProcedure [dbo].[GET_PAGING_DATA]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[GET_PAGING_DATA]
	@tableName nvarchar(MAX), -- Tên bảng gửi từ ứng dụng lên
	@pageIndex int,
	@pageSize int,
	@keywords nvarchar(MAX),
	@filter nvarchar(MAX),
	@totalRow int output
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng
	DECLARE
		@queryCount nvarchar(MAX) = '', -- Biến lưu trữ câu lệnh SQL
		@querySelect nvarchar(MAX) = '' -- Biến lưu trữ câu lệnh SQL
	DECLARE @v_table TABLE (soLuong int) -- Biến lưu trữ kiểu dữ liệu bảng

	IF (@keywords is null or @keywords = '')
		BEGIN
			SET @queryCount = CONCAT('SELECT COUNT(*) FROM ', @tableName, ' WHERE deleted = 0');
			SET @querySelect = CONCAT('SELECT * FROM ', @tableName, ' WHERE deleted = 0');
		END
	ELSE
		BEGIN
			SET @queryCount = CONCAT('SELECT COUNT(*) FROM ', @tableName, ' WHERE alias LIKE ''%', @keywords ,'%'' AND deleted = 0');
			SET @querySelect = CONCAT('SELECT * FROM ', @tableName, ' WHERE alias LIKE ''%', @keywords ,'%'' AND deleted = 0');
		END

	IF(@filter is not null and @filter != '')
		BEGIN
			SET @queryCount = CONCAT(@queryCount, @filter);
			SET @querySelect = CONCAT(@querySelect, @filter);
		END

	SET @querySelect += CONCAT(' ORDER BY id DESC OFFSET ', (@pageIndex - 1) * @pageSize, ' rows ');
	SET @querySelect += CONCAT(' FETCH NEXT ', @pageSize, ' row only;');

	-- Thực thi câu lệnh lấy tổng số bản ghi
	INSERT INTO @v_table  EXEC(@queryCount);
	SELECT @totalRow = soLuong FROM @v_table;

	-- Thực thi câu lệnh select
	EXEC(@querySelect);
		
END
GO
/****** Object:  StoredProcedure [dbo].[GET_SINGLE_DATA]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[GET_SINGLE_DATA]
	@tableName nvarchar(255), -- Tên bảng gửi từ ứng dụng lên
	@listColumn nvarchar(MAX)-- Chuỗi JSON chứa danh sách column, value gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{"Key": "MaSP","Value": "SP01"}, {"Key": "TenSP","Value": "Nokia"}]'
AS
BEGIN
	SET NOCOUNT ON; -- Không trả về số bản ghi bị ảnh hưởng

	DECLARE 
	@numColumn int = 0,
	@item nvarchar(MAX),
	@step int = 0,
	@column nvarchar(MAX),
	@value nvarchar(MAX),
	@listCondition nvarchar(MAX) = '',
	@query nvarchar(MAX)

	-- Đếm số phần tử có trong mảng
	SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');
	
	IF @numColumn > 0
		BEGIN
			-- Chạy vòng lặp mảng
			WHILE (@step < @numColumn) 
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, CONCAT('$[', CAST(@step as varchar(10)) , ']'));
					-- Lấy ra column và value của phần tử thứ i
					SET @column = JSON_VALUE (@item, '$.Key');
					SET @value = JSON_VALUE (@item, '$.Value');

					IF (@step + 1 = @numColumn)
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, '''');
					ELSE
						-- Nối danh sách column value thành một chuỗi có dạng MaSP = N'SP01' AND TenSP = N'Nokia'
						SET @listCondition += CONCAT(@column, ' = ', 'N''', @value, ''' AND ');

					-- Tăng biến đếm thêm 1
					SET @step = @step + 1;
				END

			-- Nối các biến thành câu lệnh select
			SET @query = CONCAT('SELECT TOP 1 * FROM ', @tableName, ' WHERE ', @listCondition, ' AND deleted = 0;');
			-- Thực thi câu lệnh delete
			EXEC(@query)
		END
END
GO
/****** Object:  StoredProcedure [dbo].[INSERT_DATA]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[INSERT_DATA]
	@tableName nvarchar(255), -- Tên bảng gửi từ ứng dụng lên
	@listColumn nvarchar(MAX) -- Chuỗi JSON gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{ "Key" : "MaSanPham", "Value" : "SP01" }, { "Key" : "TenSanPham", "Value" : "Nokia" }]'
AS
	BEGIN
	DECLARE 
		@numColumn int,  -- Tổng số phần tử trong mảng @listColumn
		@step int = 0,  -- Vị trí thứ i trong vòng lặp
		@item nvarchar(MAX), -- Phần tử ở vị trí thứ i trong vòng lặp

		@column nvarchar(MAX), -- Biến lưu trữ tên cột lấy ra từ phần tử ở vị trí thứ i
		@value nvarchar(MAX), -- Biến lưu trữ giá trị lấy ra từ phần tử ở vị trí thứ i
		@arrColumn nvarchar(MAX) = '', -- Biến lưu trữ danh sách tên cột lấy ra từ mảng @listColumn
		@arrValue nvarchar(MAX) = '', -- Biến lưu trữ danh sách giá trị lấy ra từ mảng @listColumn
		@query nvarchar(MAX)

		-- Lấy ra tổng số phần tử trong mảng @listColumn
		-- OPENJSON dùng để parse chuỗi JSON thành mảng object
		SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');

		IF @numColumn > 0
			BEGIN
				WHILE (@step < @numColumn)  -- Lặp mảng.
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, '$[' + CAST(@step as varchar(10)) + ']'); 
					SET @column = JSON_VALUE (@item, '$.Key'); -- Lấy ra tên column của phần tử ở vị trí thứ i
					SET @value = JSON_VALUE (@item, '$.Value'); -- Lấy ra value của phần tử ở vị trí thứ i

					-- Nếu không phải là phần tử cuối cùng của mảng => thêm dấu , vào sau chuỗi
					IF ((@step + 1) < @numColumn) 
						BEGIN
							-- Nối các cột thành một chuỗi có dạng: MaSanPham, TenSanPham
							SET @arrColumn = CONCAT (@arrColumn, @column, ', ');
							 -- Nối các vulue thành một chuỗi có dạng: 'SP01', 'Nokia'
							SET @arrValue = CONCAT ( @arrValue, 'N''', @value, '''', ',');
						END
					ELSE -- Nếu là phần tử cuối cùng của mảng
						BEGIN
							SET @arrColumn = CONCAT (@arrColumn, @column);
							SET @arrValue = CONCAT ( @arrValue, 'N''', @value, '''');
						END

					SET @step = @step + 1; -- Tăng biến index lên 1
				END
		
				-- Thực thi câu lệnh INSERT
				SET @query = CONCAT('INSERT INTO ', @tableName, '(', @arrColumn , ') VALUES (', @arrValue, ');');
				EXEC(@query);
				EXEC('SELECT TOP 1 * FROM ' + @tableName  +' ORDER BY dateCreated DESC');
				
			END
	END
GO
/****** Object:  StoredProcedure [dbo].[UPDATE_DATA]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPDATE_DATA]
	@id nvarchar(255), -- Giá trị của id gửi từ ứng dụng lên
	@tableName nvarchar(255), -- Tên bảng gửi từ ứng dụng lên
	@listColumn nvarchar(MAX) -- Chuỗi JSON gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{ "Key" : "MaSanPham", "Value" : "SP01" }, { "Key" : "TenSanPham", "Value" : "Nokia" }]'
AS
BEGIN
	DECLARE 
	--@tableName nvarchar(255) = 'tblSanPham', -- Tên bảng gửi từ ứng dụng lên
	--@listColumn nvarchar(MAX) = '[{ "Key" : "MaSanPham", "Value" : "SP01" }, { "Key" : "TenSanPham", "Value" : "Nokia" }]',
	@numColumn int,  -- Tổng số phần tử trong mảng @listColumn
	@step int = 0,  -- Vị trí thứ i trong vòng lặp
	@item nvarchar(MAX), -- Phần tử ở vị trí thứ i trong vòng lặp

	@column nvarchar(MAX), -- Biến lưu trữ tên cột lấy ra từ phần tử ở vị trí thứ i
	@value nvarchar(MAX), -- Biến lưu trữ giá trị lấy ra từ phần tử ở vị trí thứ i
	@arrAttribute nvarchar(MAX) = '', -- Biến lưu trữ chuỗi thông tin cần cập nhật có dạng: TenSanPham = 'Samsung', Gia = '5000000'
	@query nvarchar(MAX) = '' -- Biến lưu trữ câu lệnh SQL

		-- Lấy ra tổng số phần tử trong mảng @listColumn
		-- OPENJSON dùng để parse chuỗi JSON thành mảng object
		SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');

		IF @numColumn > 0
			BEGIN
				-- Lặp mảng.
				WHILE (@step < @numColumn)   -- @step bắt đầu chạy từ 1 (vị trí 0 của id)
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, '$[' + CAST(@step as varchar(10)) + ']'); 
					SET @column = JSON_VALUE (@item, '$.Key'); -- Lấy ra tên column của phần tử ở vị trí thứ i
					SET @value = JSON_VALUE (@item, '$.Value'); -- Lấy ra value của phần tử ở vị trí thứ i

					-- Nếu là phần tử ở vị trí đầu tiên trong mảng
					IF (@step = 0) 
						-- Nối column và value thành chuỗi có dạng: TenSanPham = N'Samsung', Gia = N'5000000'
						SET @arrAttribute = CONCAT (@arrAttribute, @column, ' = N''', @value, ''''); 
					ELSE -- Nếu là phần tử ở vị trí thứ 2 trở đi trong mảng
						SET @arrAttribute = CONCAT (@arrAttribute, ', ', @column, ' = N''', @value, ''''); 

					SET @step = @step + 1; -- Tăng biến index lên 1
				END
		
				-- Thực thi câu lệnh UPDATE
				SET @query = CONCAT('UPDATE ', @tableName, ' SET ', @arrAttribute, ' WHERE id = N''', @id, '''');
				EXEC(@query);
			END
	END
GO
/****** Object:  StoredProcedure [dbo].[UPDATE_DATA_BY_KEY]    Script Date: 4/9/2023 4:18:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPDATE_DATA_BY_KEY]
	--@id nvarchar(255), -- Giá trị của id gửi từ ứng dụng lên
	@keyUpdate nvarchar(MAX),
	@valueUpdate nvarchar(MAX),
	@tableName nvarchar(MAX), -- Tên bảng gửi từ ứng dụng lên
	@listColumn nvarchar(MAX) -- Chuỗi JSON gửi từ ứng dụng lên
	-- @listColumn <=> mảng json có dạng '[{ "Key" : "MaSanPham", "Value" : "SP01" }, { "Key" : "TenSanPham", "Value" : "Nokia" }]'
AS
BEGIN
	DECLARE 
	--@tableName nvarchar(255) = 'tblSanPham', -- Tên bảng gửi từ ứng dụng lên
	--@listColumn nvarchar(MAX) = '[{ "Key" : "MaSanPham", "Value" : "SP01" }, { "Key" : "TenSanPham", "Value" : "Nokia" }]',
	@numColumn int,  -- Tổng số phần tử trong mảng @listColumn
	@step int = 0,  -- Vị trí thứ i trong vòng lặp
	@item nvarchar(MAX), -- Phần tử ở vị trí thứ i trong vòng lặp

	@column nvarchar(MAX), -- Biến lưu trữ tên cột lấy ra từ phần tử ở vị trí thứ i
	@value nvarchar(MAX), -- Biến lưu trữ giá trị lấy ra từ phần tử ở vị trí thứ i
	@arrAttribute nvarchar(MAX) = '', -- Biến lưu trữ chuỗi thông tin cần cập nhật có dạng: TenSanPham = 'Samsung', Gia = '5000000'
	@query nvarchar(MAX) = '' -- Biến lưu trữ câu lệnh SQL

		-- Lấy ra tổng số phần tử trong mảng @listColumn
		-- OPENJSON dùng để parse chuỗi JSON thành mảng object
		SELECT @numColumn = count(*) FROM OPENJSON (@listColumn, N'$');

		IF @numColumn > 0
			BEGIN
				-- Lặp mảng.
				WHILE (@step < @numColumn)   -- @step bắt đầu chạy từ 1 (vị trí 0 của id)
				BEGIN
					-- Lấy ra phần tử ở vị trí thứ i
					SET @item = JSON_QUERY (@listColumn, '$[' + CAST(@step as varchar(10)) + ']'); 
					SET @column = JSON_VALUE (@item, '$.Key'); -- Lấy ra tên column của phần tử ở vị trí thứ i
					SET @value = JSON_VALUE (@item, '$.Value'); -- Lấy ra value của phần tử ở vị trí thứ i

					-- Nếu là phần tử ở vị trí đầu tiên trong mảng
					IF (@step = 0) 
						-- Nối column và value thành chuỗi có dạng: TenSanPham = N'Samsung', Gia = N'5000000'
						SET @arrAttribute = CONCAT (@arrAttribute, @column, ' = N''', @value, ''''); 
					ELSE -- Nếu là phần tử ở vị trí thứ 2 trở đi trong mảng
						SET @arrAttribute = CONCAT (@arrAttribute, ', ', @column, ' = N''', @value, ''''); 

					SET @step = @step + 1; -- Tăng biến index lên 1
				END
		
				-- Thực thi câu lệnh UPDATE
				SET @query = CONCAT('UPDATE ', @tableName, ' SET ', @arrAttribute, ' WHERE ',@keyUpdate,  ' = N''', @valueUpdate, '''');
				EXEC(@query);
			END
	END
GO
USE [master]
GO
ALTER DATABASE [JiraClone] SET  READ_WRITE 
GO
