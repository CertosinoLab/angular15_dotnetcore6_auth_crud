USE [master]
GO
/****** Object:  Database [ecommerce]    Script Date: 28/06/2023 22:14:00 ******/
CREATE DATABASE [ecommerce]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ecommerce', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\ecommerce.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ecommerce_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\ecommerce_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [ecommerce] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ecommerce].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ecommerce] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ecommerce] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ecommerce] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ecommerce] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ecommerce] SET ARITHABORT OFF 
GO
ALTER DATABASE [ecommerce] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ecommerce] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ecommerce] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ecommerce] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ecommerce] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ecommerce] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ecommerce] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ecommerce] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ecommerce] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ecommerce] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ecommerce] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ecommerce] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ecommerce] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ecommerce] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ecommerce] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ecommerce] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ecommerce] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ecommerce] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ecommerce] SET  MULTI_USER 
GO
ALTER DATABASE [ecommerce] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ecommerce] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ecommerce] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ecommerce] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ecommerce] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ecommerce] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [ecommerce] SET QUERY_STORE = ON
GO
ALTER DATABASE [ecommerce] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [ecommerce]
GO
/****** Object:  Table [dbo].[categories]    Script Date: 28/06/2023 22:14:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categories](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NULL,
	[description] [varchar](max) NULL,
	[thumbnail] [varchar](max) NULL,
 CONSTRAINT [PK__categori__3213E83F876341E8] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[customers]    Script Date: 28/06/2023 22:14:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customers](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](100) NULL,
	[password] [varchar](100) NULL,
	[full_name] [varchar](100) NULL,
	[billing_address] [varchar](max) NULL,
	[default_shipping_address] [varchar](max) NULL,
	[country] [varchar](50) NULL,
	[phone] [varchar](20) NULL,
 CONSTRAINT [PK__customer__3213E83F94D9F49D] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[employees]    Script Date: 28/06/2023 22:14:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employees](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[full_name] [varchar](100) NOT NULL,
	[address] [varchar](200) NULL,
	[phone] [varchar](20) NULL,
	[job] [varchar](100) NULL,
	[role] [varchar](50) NULL,
	[salary] [decimal](10, 2) NULL,
	[email] [varchar](100) NULL,
	[password] [varchar](100) NULL,
 CONSTRAINT [PK__employee__3213E83FCE3A67D2] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_details]    Script Date: 28/06/2023 22:14:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_details](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NULL,
	[product_id] [int] NULL,
 CONSTRAINT [PK__order_de__3213E83FE68875A1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orders]    Script Date: 28/06/2023 22:14:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[customer_id] [int] NULL,
	[amount] [decimal](10, 2) NULL,
	[shipping_address] [varchar](max) NULL,
	[order_address] [varchar](max) NULL,
	[order_email] [varchar](100) NULL,
	[order_date] [datetime] NULL,
	[order_status] [varchar](50) NULL,
 CONSTRAINT [PK__orders__3213E83F9715DAAD] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_categories]    Script Date: 28/06/2023 22:14:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_categories](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[product_id] [int] NULL,
	[category_id] [int] NULL,
 CONSTRAINT [PK__product___3213E83FA3C04C09] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[products]    Script Date: 28/06/2023 22:14:00 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[products](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sku] [varchar](50) NULL,
	[name] [varchar](100) NULL,
	[price] [decimal](10, 2) NULL,
	[weight] [decimal](8, 2) NULL,
	[description] [varchar](max) NULL,
	[thumbnail] [varchar](max) NULL,
	[image] [varchar](max) NULL,
	[create_date] [datetime] NULL,
	[stock] [int] NULL,
 CONSTRAINT [PK__products__3213E83F29AA150B] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[order_details]  WITH CHECK ADD  CONSTRAINT [FK__order_det__order__7C4F7684] FOREIGN KEY([order_id])
REFERENCES [dbo].[orders] ([id])
GO
ALTER TABLE [dbo].[order_details] CHECK CONSTRAINT [FK__order_det__order__7C4F7684]
GO
ALTER TABLE [dbo].[order_details]  WITH CHECK ADD  CONSTRAINT [FK__order_det__order__7E37BEF6] FOREIGN KEY([order_id])
REFERENCES [dbo].[orders] ([id])
GO
ALTER TABLE [dbo].[order_details] CHECK CONSTRAINT [FK__order_det__order__7E37BEF6]
GO
ALTER TABLE [dbo].[order_details]  WITH CHECK ADD  CONSTRAINT [FK__order_det__produ__7D439ABD] FOREIGN KEY([product_id])
REFERENCES [dbo].[products] ([id])
GO
ALTER TABLE [dbo].[order_details] CHECK CONSTRAINT [FK__order_det__produ__7D439ABD]
GO
ALTER TABLE [dbo].[order_details]  WITH CHECK ADD  CONSTRAINT [FK__order_det__produ__7F2BE32F] FOREIGN KEY([product_id])
REFERENCES [dbo].[products] ([id])
GO
ALTER TABLE [dbo].[order_details] CHECK CONSTRAINT [FK__order_det__produ__7F2BE32F]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FK__orders__customer__00200768] FOREIGN KEY([customer_id])
REFERENCES [dbo].[customers] ([id])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FK__orders__customer__00200768]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FK__orders__customer__797309D9] FOREIGN KEY([customer_id])
REFERENCES [dbo].[customers] ([id])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FK__orders__customer__797309D9]
GO
ALTER TABLE [dbo].[product_categories]  WITH CHECK ADD  CONSTRAINT [FK__product_c__categ__6EF57B66] FOREIGN KEY([category_id])
REFERENCES [dbo].[categories] ([id])
GO
ALTER TABLE [dbo].[product_categories] CHECK CONSTRAINT [FK__product_c__categ__6EF57B66]
GO
ALTER TABLE [dbo].[product_categories]  WITH CHECK ADD  CONSTRAINT [FK__product_c__produ__6E01572D] FOREIGN KEY([product_id])
REFERENCES [dbo].[products] ([id])
GO
ALTER TABLE [dbo].[product_categories] CHECK CONSTRAINT [FK__product_c__produ__6E01572D]
GO
USE [master]
GO
ALTER DATABASE [ecommerce] SET  READ_WRITE 
GO
