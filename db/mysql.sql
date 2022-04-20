CREATE DATABASE IF NOT EXISTS product-overview;

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY NOT NULL,
  _name VARCHAR(30) NOT NULL,
  slogan VARCHAR(50) NOT NULL,
  _description VARCHAR(100) NOT NULL,
  category VARCHAR(15) NOT NULL,
  default_price INT NOT NULL,
);

CREATE TABLE IF NOT EXISTS features {
  id INT PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  feature VARCHAR(15) NOT NULL,
  _value VARCHAR(15) NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
}

CREATE TABLE IF NOT EXISTS styles {
  id INT PRIMARY KEY NOT NULL,
  product_id INT NOT NULL,
  _name VARCHAR(20) NOT NULL,
  sale_price INT NOT NULL,
  _default BOOLEAN NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
};

CREATE TABLE IF NOT EXISTS photos {
  id INT PRIMARY KEY NOT NULL,
  style_id INT NOT NULL,
  thumbnail_url VARCHAR(30) NULL,
  _url VARCHAR(30) NULL,
  FOREIGN KEY (style_id) REFERENCES styles(id)
};

CREATE TABLE IF NOT EXISTS skus {
  id INT PRIMARY KEY NOT NULL,
  style_id INT NOT NULL,
  quantity INT NOT NULL,
  size VARCHAR(3) NOT NULL,
  FOREIGN KEY (style_id) REFERENCES styles(id)
};

CREATE TABLE IF NOT EXISTS relations {
  id INT PRIMARY KEY NOT NULL,
  product_1 INT NOT NULL,
  product_2 INT NOT NULL,
  FOREIGN KEY (product_1, product_2) REFERENCES products(id, id)
}