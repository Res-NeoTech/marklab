import { SignJWT, jwtVerify } from 'jose'

export async function signToken(userId: string) {
    const config = useRuntimeConfig()

    const secret = new TextEncoder().encode(config.jwtSecret)

    return await new SignJWT({
        sub: userId,
    })
        .setProtectedHeader({
            alg: 'HS256',
        })
        .setIssuedAt()
        .setExpirationTime('31d')
        .sign(secret)
}

export async function verifyToken(token: string) {
    const config = useRuntimeConfig()

    const secret = new TextEncoder().encode(config.jwtSecret)

    const { payload } = await jwtVerify(token, secret)

    return payload
}