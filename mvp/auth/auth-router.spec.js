const request = require('supertest')

const server = require('../api/server.js')
const db = require('../database/dbConfig.js');


describe('auth', function() {
    beforeEach(async () => {
        await db('users').truncate()
    });

    describe('POST /register', function(){
        it("return 201 on success", function(){
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'butts', password: 'bigbutts'})
                .then( res => {
                expect(res.status).toBe(201)
                });
        });
        it("should return a message saying \"Successfully Registered\"", function() {
            return request(server)
            .post('/api/auth/register')
            .send({ username: 'butts', password: 'bigbutts'})
            .then(res => {
                expect(res.body.message).toBe("Successfully registered")
            })
        });
    });

    describe('POST /login', function(){
        it("return 201 on success", async function(){

            await request(server)
                .post('/api/auth/register')
                .send({ username: 'butts', password: 'bigbutts'})

            await request(server)
                .post('/api/auth/login')
                .send({ username: 'butts', password: 'bigbutts'})
                .then( res => {
                expect(res.status).toBe(201)
                });
        });
        it("should return a message saying \"Woah dude nice\"", async function() {

            await request(server)
            .post('/api/auth/register')
            .send({ username: 'butts', password: 'bigbutts'})

            await request(server)
            .post('/api/auth/login')
            .send({ username: 'butts', password: 'bigbutts'})
            .then(res => {
                expect(res.body.message).toBe("Woah dude nice")
            })
        });
        it("Should return a token", async function() {

            await request(server)
            .post('/api/auth/register')
            .send({ username: 'butts', password: 'bigbutts'})

            await request(server)
            .post('/api/auth/login')
            .send({ username: 'butts', password: 'bigbutts'})
            .then(res => {
                expect(res.body.token).toBeTruthy()
            })
        });
    });
    describe('GET /jokes', function(){
        it("should has a res(200)", async function () {
            let token = ''
            await request(server)
            .post('/api/auth/register')
            .send({ username: 'butts', password: 'bigbutts'})

            await request(server)
            .post('/api/auth/login')
            .send({ username: 'butts', password: 'bigbutts'})
            .then(res => {
                token = res.body.token;
                return token
            })

            await request(server)
            .get('/api/jokes')
            .set({ Authorization : token})
            .then( res => {
                expect(res.status).toBe(200)
            })

        })
        it("Should fetch a list of jokes ", async function () {
            let token = ''
            await request(server)
            .post('/api/auth/register')
            .send({ username: 'butts', password: 'bigbutts'})

            await request(server)
            .post('/api/auth/login')
            .send({ username: 'butts', password: 'bigbutts'})
            .then(res => {
               
                token = res.body.token;
                return token
            })

            await request(server)
            .get('/api/jokes')
            .set({ Authorization : token})
            .then( res => {
                expect(res.body).toBeTruthy()
            })

            
        })
    });
});
