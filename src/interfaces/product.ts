//TODO: finish product interface

interface Product {
    name: String,
    price: Number,
    category: String,
    inStock: Number,
    image?: String, // base64 string image
}

export default Product;