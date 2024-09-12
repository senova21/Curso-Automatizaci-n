import { test, expect } from '@playwright/test'
import { LoginPage } from './PageObjects/Loginpage';


test('purchase an item 2', async ({ page }, testInfo) => {

    await page.on("request", req => {
        console.log (req.url())
    })

    await page.route("**/*.{png,jpg,jpeg.svg}", 
    route => route.abort()
    );
    
    await page.goto ('https://www.saucedemo.com/')
    const login = new LoginPage(page)
    await login.loginWithCredentials('standard_user','secret_sauce')
    await login.checkSuccessfullogin()

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

    await page.screenshot({path:'login.png', fullPage:true})


});

test('interceptor test', async ({ page }, testInfo) => {

    await page.route("https://demoqa.com/BookStore/v1/Books", 
    (route) => {
        route.fulfill({
            status: 304,
            headers:{
                'Content-Type': 'application/json'
            },
            body:`

            {
    "books": [
        {
            "isbn": "9781449325862",
            "title": "Interestelar",
            "subTitle": "A Working Introduction",
            "author": "Christopher Nolan",
            "publish_date": "2020-06-04T08:48:39.000Z",
            "publisher": "O'Reilly Media",
            "pages": 21,
            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
        }
        
    ]
        }`
        })   
    })

    await page.goto ('https://demoqa.com/books')

    await page.pause()
    await page.screenshot({path:'login.png', fullPage:true})

});