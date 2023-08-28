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

describe("user signin", () => {
    describe("given email, fullname and password are provided and email is unique", () => {

        it('returns a 201 on successful signup', async () => {

            const { statusCode, body } = await supertest(app).post("/api/users/signup").send(UserInput)

            expect(statusCode).toBe(201);

            expect(body).toEqual(userPayload)

        });
    })
})

it('returns a 400 for missing fullName or password', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({ email: 'test@test.com' })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'password',
        })
        .expect(400);
});