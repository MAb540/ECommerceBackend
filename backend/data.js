import crypto from 'crypto';




const data  = {
    'users':[
        {
            name:'Ab',
            email:'admin@example.com',
            password:crypto.createHmac('sha256','z45@#hgila').update('Ab').digest('hex'),
            isAdmin:true,
        },
        {
            name:'user',
            email:'user@example.com',
            password:crypto.createHmac('sha256','z45@#hgila').update('user').digest('hex'),
            isAdmin:false,
        }
        
    ],
    'products':[
        {
           
            name: 'Nike Slim Shirt',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 3.5,
            numReviews: 10,
            description: 'high quality product'
        },
        {
           
            name: 'Kurta Shirt',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 160,
            countInStock: 20,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality product'
        },
        {
            
            name: 'Khadii',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 120,
            countInStock: 0,
            brand: 'Nike',
            rating: 2.5,
            numReviews: 10,
            description: 'high quality product'
        },        {
           
            name: 'G. Shirt',
            category: 'Shirts',
            image: '/images/p4.jpg',
            price: 120,
            countInStock: 30,
            brand: 'Nike',
            rating: 4,
            numReviews: 10,
            description: 'high quality product'
        },
        {
           
            name: 'revolt Slim ',
            category: 'Shirts',
            image: '/images/p5.jpg',
            price: 120,
            countInStock: 5,
            brand: 'Nike',
            rating: 3,
            numReviews: 10,
            description: 'high quality product'
        },
        {
           
            name: 'Slim Shirt',
            category: 'Shirts',
            image: '/images/p6.jpg',
            price: 120,
            countInStock: 40,
            brand: 'Nike',
            rating: 3.5,
            numReviews: 10,
            description: 'high quality product'
        }

    ]
}

export default data;