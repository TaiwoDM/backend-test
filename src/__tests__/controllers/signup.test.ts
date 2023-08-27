import request from 'supertest';


import app from 'src/index';
import supertest from 'supertest';

const userPayload = {
    email: "test5@test.com",
    fullName: "Test Test",
};

const UserInput = {
    email: "test5@test.com",
    fullName: "Test Test",
    password: "password ",
};

describe("user signup", () => {
    describe("given email, fullname and password are provided and email is unique", () => {

        it('returns a 201 on successful signup', async () => {

            const { statusCode, body } = await supertest(app).post("/api/users/signup").send(UserInput)

            expect(statusCode).toBe(201);

            expect(body).toEqual(userPayload)

        });
    })
})

it('returns a 400 with missing fullName, email or password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            fullName: "Test Test",
            password: 'password',
        })
        .expect(400);
    await request(app)
        .post('/api/users/signup')
        .send({
            fullName: "Test Test",
            email: 'test@test.com',
        })
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'shouldbeunique@test.com',
            fullName: "Test Test",
            password: 'password',
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'shouldbeunique@test.com',
            fullName: "Test2 Test2",
            password: 'password1',
        })
        .expect(400);
});