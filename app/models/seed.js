const mongoose = require('mongoose')
const user = require('./user')

const db = mongoose.connection

db.on('open', () => {
    const startCompanies = [
        {
            name: 'Walmart',
            logo: 'https://logo.clearbit.com/walmart.com',
            domain: 'walmart.com', 
            description: 'Walmart Inc. is an American multinational retail corporation that operates a chain of hypermarkets, discount department stores, and grocery stores from the United States, headquartered in Bentonville, Arkansas.'
        },
        {
            name: 'Amazon',
            logo: 'https://logo.clearbit.com/amazon.com',
            domain: 'amazon.com', 
            description: 'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.'
        },
        {
            name: 'Apple',
            logo: 'https://logo.clearbit.com/apple.com',
            domain: 'apple.com', 
            description: '0090 Apple Inc. is an American multinational technology company specializing in consumer electronics, software and online services headquartered in Cupertino, California, United States.'
        },
        {
            name: 'CVS Pharmacy',
            logo: 'https://logo.clearbit.com/cvs.com',
            domain: 'cvs.com', 
            description: 'CVS Pharmacy, Inc. is an American retail corporation.'
        },
        {
            name: 'UnitedHealthcare',
            logo: 'https://logo.clearbit.com/uhc.com',
            domain: 'uhc.com', 
            description: 'UnitedHealth Group Incorporated is an American multinational managed healthcare and insurance company based in Minnetonka, Minnesota.'
        },
        {
            name: 'ExxonMobil',
            logo: 'https://logo.clearbit.com/exxon.com',
            domain: 'exxon.com', 
            description: 'ExxonMobil Corporation is an American multinational oil and gas corporation headquartered in Irving, Texas.'
        },
        {
            name: 'Berkshire Hathaway',
            logo: 'https://logo.clearbit.com/berkshirehathaway.com',
            domain: 'berkshirehathaway.com', 
            description: 'Berkshire Hathaway Inc. is an American multinational conglomerate holding company headquartered in Omaha, Nebraska, United States.'
        },
        {
            name: 'Google',
            logo: 'https://logo.clearbit.com/google.com',
            domain: 'google.com', 
            description: 'Google LLC is an American multinational technology company that focuses on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics.'
        },
        {
            name: 'McKesson Corporation',
            logo: 'https://logo.clearbit.com/mckesson.com',
            domain: 'mckesson.com', 
            description: 'McKesson Corporation is an American company distributing pharmaceuticals and providing health information technology, medical supplies, and care management tools.'
        },        
        {
            name: 'AmerisourceBergen Corporation',
            logo: 'https://logo.clearbit.com/amerisourcebergen.com',
            domain: 'amerisourcebergen.com', 
            description: 'AmerisourceBergen Corporation is an American drug wholesale company that was formed by the merger of Bergen Brunswig and AmeriSource in 2001.'
        },
        {
            name: 'Microsoft',
            logo: 'https://logo.clearbit.com/microsoft.com',
            domain: 'microsoft.com', 
            description: 'Microsoft Corporation is an American multinational technology corporation which produces computer software, consumer electronics, personal computers, and related services headquartered at the Microsoft Redmond campus located in Redmond, Washington.'
        },
        {
            name: 'Costco Wholesale',
            logo: 'https://logo.clearbit.com/costco.com',
            domain: 'costco.com', 
            description: 'Costco Wholesale Corporation is an American multinational corporation which operates a chain of membership-only big-box retail stores.'
        },
        {
            name: 'Cigna',
            logo: 'https://logo.clearbit.com/homedepot.com',
            domain: 'cigna.com', 
            description: 'Walgreen Company, d/b/a Walgreens, is an American company that operates the second-largest pharmacy store chain in the United States behind CVS Health.'
        },
    ]
})